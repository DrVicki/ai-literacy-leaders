import Stripe from "stripe";
import { z } from "zod";
import { COURSE_MODULES, STRIPE_PRICE_ID, TOTAL_LESSONS } from "../shared/courseData";
import { COOKIE_NAME } from "../shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createEnrollment,
  getAllEnrollmentsWithUsers,
  getAllCertificates,
  getEnrollmentByUserId,
  getEnrollmentStats,
  getLessonBySlug,
  getAllLessons,
  getUserProgress,
  getUserProgressForAdmin,
  markEmailSent,
  markLessonComplete,
  unmarkLessonComplete,
  deleteAllUserProgress,
  upsertLesson,
  getCertificateByUserId,
  createCertificate,
  markCertificateEmailSent,
  getModuleComments,
  getCommentCountByModule,
  createModuleComment,
  deleteModuleComment,
  getQuizByLesson,
  getLatestQuizAttempt,
  getAllQuizAttempts,
  saveQuizAttempt,
  upsertQuizQuestions,
} from "./db";
import { QUIZ_QUESTIONS, PASS_THRESHOLD } from "../shared/quizData";
import { generateCertificatePdf } from "./certificate";
import { sendCertificateEmail } from "./emailHelpers";
import { TRPCError } from "@trpc/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-05-27.dahlia",
});

// Seed lessons into DB on first use
let lessonsSeedDone = false;
let quizSeedDone = false;
async function seedQuizIfNeeded() {
  if (quizSeedDone) return;
  const existing = await getQuizByLesson("what-is-ai");
  if (existing.length > 0) {
    quizSeedDone = true;
    return;
  }
  await upsertQuizQuestions(QUIZ_QUESTIONS);
  quizSeedDone = true;
}
async function seedLessonsIfNeeded() {
  if (lessonsSeedDone) return;
  const existing = await getAllLessons();
  // Re-seed whenever the DB has fewer lessons than courseData (e.g. new lessons added)
  if (existing.length >= TOTAL_LESSONS) {
    lessonsSeedDone = true;
    return;
  }
  for (const mod of COURSE_MODULES) {
    for (const lesson of mod.lessons) {
      await upsertLesson({
        moduleSlug: mod.slug,
        moduleOrder: mod.order,
        lessonSlug: lesson.slug,
        lessonOrder: lesson.order,
        title: lesson.title,
        content: lesson.content,
        reflection: lesson.reflection,
        assignment: lesson.assignment,
        diagram: lesson.diagram,
        diagramCaption: lesson.diagramCaption,
      });
    }
  }
  lessonsSeedDone = true;
}

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  course: router({
    getModules: publicProcedure.query(() => {
      return COURSE_MODULES.map((m) => ({
        slug: m.slug,
        order: m.order,
        title: m.title,
        subtitle: m.subtitle,
        description: m.description,
        icon: m.icon,
        color: m.color,
        lessonCount: m.lessons.length,
      }));
    }),

    getModuleWithLessons: protectedProcedure
      .input(z.object({ moduleSlug: z.string() }))
      .query(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        await seedLessonsIfNeeded();
        const mod = COURSE_MODULES.find((m) => m.slug === input.moduleSlug);
        if (!mod) throw new TRPCError({ code: "NOT_FOUND" });
        return mod;
      }),

    getLesson: protectedProcedure
      .input(z.object({ moduleSlug: z.string(), lessonSlug: z.string() }))
      .query(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        await seedLessonsIfNeeded();
        const dbLesson = await getLessonBySlug(input.moduleSlug, input.lessonSlug);
        if (!dbLesson) throw new TRPCError({ code: "NOT_FOUND" });
        // Enrich with reflection/assignment from courseData (not stored in DB)
        const mod = COURSE_MODULES.find((m) => m.slug === input.moduleSlug);
        const lessonData = mod?.lessons.find((l) => l.slug === input.lessonSlug);
        return {
          ...dbLesson,
          reflection: lessonData?.reflection ?? null,
          assignment: lessonData?.assignment ?? null,
        };
      }),
  }),

  enrollment: router({
    check: protectedProcedure.query(async ({ ctx }) => {
      const enrollment = await getEnrollmentByUserId(ctx.user.id);
      return { enrolled: !!enrollment, enrollment: enrollment ?? null };
    }),

    createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
      const existing = await getEnrollmentByUserId(ctx.user.id);
      if (existing) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Already enrolled" });
      }
      const origin = (ctx.req.headers.origin as string) ?? "https://localhost:3000";
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email ?? "",
          customer_name: ctx.user.name ?? "",
        },
        allow_promotion_codes: true,
        success_url: `${origin}/dashboard?enrolled=true`,
        cancel_url: `${origin}/#pricing`,
      });
      return { url: session.url };
    }),

    freeEnroll: protectedProcedure.mutation(async ({ ctx }) => {
      const existing = await getEnrollmentByUserId(ctx.user.id);
      if (!existing) {
        await createEnrollment({
          userId: ctx.user.id,
          amountPaid: 0,
          currency: "usd",
          emailSent: true,
        });
      }
      return { redirectTo: "/course/demystifying-ai/what-is-ai" };
    }),

    adminEnroll: adminProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input }) => {
        await createEnrollment({
          userId: input.userId,
          amountPaid: 0,
          currency: "usd",
          emailSent: false,
        });
        return { success: true };
      }),
  }),

  progress: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      await seedLessonsIfNeeded();
      const progressRows = await getUserProgress(ctx.user.id);
      const completedIds = new Set(progressRows.map((r) => r.lessonId));
      // Build per-module progress using DB lesson IDs
      const allDbLessons = await getAllLessons();
      const moduleProgress = COURSE_MODULES.map((mod) => {
        const modLessons = allDbLessons.filter((l) => l.moduleSlug === mod.slug);
        const completedInModule = modLessons.filter((l) => completedIds.has(l.id)).length;
        return {
          slug: mod.slug,
          total: modLessons.length,
          completed: completedInModule,
          percentage: modLessons.length > 0 ? Math.round((completedInModule / modLessons.length) * 100) : 0,
        };
      });
      return {
        completedLessonIds: Array.from(completedIds),
        totalLessons: TOTAL_LESSONS,
        completedCount: completedIds.size,
        percentage: Math.round((completedIds.size / TOTAL_LESSONS) * 100),
        moduleProgress,
      };
    }),

    reset: protectedProcedure.mutation(async ({ ctx }) => {
      await deleteAllUserProgress(ctx.user.id);
      return { success: true };
    }),

    toggleLesson: protectedProcedure
      .input(z.object({ moduleSlug: z.string(), lessonSlug: z.string(), complete: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        // Verify the user is enrolled before allowing progress updates
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        await seedLessonsIfNeeded();
        const dbLesson = await getLessonBySlug(input.moduleSlug, input.lessonSlug);
        if (!dbLesson) throw new TRPCError({ code: "NOT_FOUND" });
        if (input.complete) {
          await markLessonComplete(ctx.user.id, dbLesson.id);
        } else {
          await unmarkLessonComplete(ctx.user.id, dbLesson.id);
        }

        // Auto-issue certificate when all lessons are completed
        let certificateIssued = false;
        if (input.complete) {
          const progressRows = await getUserProgress(ctx.user.id);
          if (progressRows.length >= TOTAL_LESSONS) {
            const existing = await getCertificateByUserId(ctx.user.id);
            if (!existing) {
              try {
                const { key } = await generateCertificatePdf({
                  userName: ctx.user.name ?? "Learner",
                  userEmail: ctx.user.email ?? "",
                  issuedAt: new Date(),
                });
                const cert = await createCertificate({ userId: ctx.user.id, pdfKey: key });
                // Fire-and-forget email
                sendCertificateEmail(ctx.user.email ?? "", ctx.user.name ?? "Learner", key)
                  .then(() => markCertificateEmailSent(cert.id))
                  .catch((e) => console.error("[Certificate] Email failed:", e));
                certificateIssued = true;
              } catch (e) {
                console.error("[Certificate] Generation failed:", e);
              }
            }
          }
        }

        return { success: true, certificateIssued };
      }),
  }),

  certificate: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const cert = await getCertificateByUserId(ctx.user.id);
      if (!cert) return null;
      return {
        id: cert.id,
        issuedAt: cert.issuedAt,
        pdfUrl: cert.pdfKey ? `/manus-storage/${cert.pdfKey}` : null,
        emailSent: cert.emailSent,
      };
    }),
  }),

  discussion: router({
    getComments: protectedProcedure
      .input(z.object({ moduleSlug: z.string() }))
      .query(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        return getModuleComments(input.moduleSlug);
      }),

    postComment: protectedProcedure
      .input(z.object({
        moduleSlug: z.string(),
        content: z.string().min(1).max(2000),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        return createModuleComment({
          moduleSlug: input.moduleSlug,
          userId: ctx.user.id,
          parentId: input.parentId ?? null,
          content: input.content,
        });
      }),

    deleteComment: protectedProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteModuleComment(input.commentId, ctx.user.id);
        return { success: true };
      }),

    getCommentCounts: protectedProcedure
      .input(z.object({ moduleSlugs: z.array(z.string()) }))
      .query(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Enrollment required" });
        }
        const counts = await Promise.all(
          input.moduleSlugs.map(async (slug) => ({
            slug,
            count: await getCommentCountByModule(slug),
          }))
        );
        return counts;
      }),
  }),

  admin: router({
    getEnrollments: adminProcedure.query(async () => {
      const rows = await getAllEnrollmentsWithUsers();
      const withProgress = await Promise.all(
        rows.map(async (row) => {
          const progressCount = await getUserProgressForAdmin(row.userId);
          const cert = await getCertificateByUserId(row.userId);
          return {
            ...row,
            completedLessons: progressCount,
            totalLessons: TOTAL_LESSONS,
            progressPercent: Math.round((progressCount / TOTAL_LESSONS) * 100),
            certificateIssued: !!cert,
            certificateIssuedAt: cert?.issuedAt ?? null,
          };
        })
      );
      return withProgress;
    }),

    getStats: adminProcedure.query(async () => {
      const stats = await getEnrollmentStats();
      return {
        totalEnrolled: Number(stats.totalEnrolled),
        totalRevenueCents: Number(stats.totalRevenueCents),
        totalRevenueDisplay: `$${(Number(stats.totalRevenueCents) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      };
    }),
  }),

  quiz: router({
    getQuestions: protectedProcedure
      .input(z.object({ lessonSlug: z.string() }))
      .query(async ({ input }) => {
        await seedQuizIfNeeded();
        const questions = await getQuizByLesson(input.lessonSlug);
        // Return questions without correctIndex (to prevent cheating)
        return questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: JSON.parse(q.options) as string[],
          questionOrder: q.questionOrder,
        }));
      }),

    getAttempt: protectedProcedure
      .input(z.object({ lessonSlug: z.string() }))
      .query(async ({ ctx, input }) => {
        return getLatestQuizAttempt(ctx.user.id, input.lessonSlug);
      }),

    getAllAttempts: protectedProcedure.query(async ({ ctx }) => {
      return getAllQuizAttempts(ctx.user.id);
    }),

    submit: protectedProcedure
      .input(
        z.object({
          lessonSlug: z.string(),
          answers: z.array(z.object({ questionId: z.number(), selectedIndex: z.number() })),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const enrollment = await getEnrollmentByUserId(ctx.user.id);
        if (!enrollment) throw new TRPCError({ code: "FORBIDDEN", message: "Not enrolled" });

        const questions = await getQuizByLesson(input.lessonSlug);
        if (questions.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "No quiz found" });

        let correct = 0;
        const results = questions.map((q) => {
          const answer = input.answers.find((a) => a.questionId === q.id);
          const isCorrect = answer?.selectedIndex === q.correctIndex;
          if (isCorrect) correct++;
          return {
            questionId: q.id,
            question: q.question,
            options: JSON.parse(q.options) as string[],
            selectedIndex: answer?.selectedIndex ?? -1,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            isCorrect,
          };
        });

        const total = questions.length;
        const passed = correct / total >= PASS_THRESHOLD;

        await saveQuizAttempt({
          userId: ctx.user.id,
          lessonSlug: input.lessonSlug,
          passed,
          score: correct,
          total,
        });

        return { passed, score: correct, total, results };
      }),
  }),
});

export type AppRouter = typeof appRouter;
