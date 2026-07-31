import { and, count, desc, eq, isNull, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  Certificate,
  Enrollment,
  InsertEnrollment,
  InsertUser,
  ModuleComment,
  certificates,
  enrollments,
  lessonProgress,
  lessons,
  moduleComments,
  quizAttempts,
  quizQuestions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  for (const field of textFields) {
    const value = user[field];
    if (value === undefined) continue;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  }

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createEnrollment(data: InsertEnrollment): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(enrollments).values(data);
}

export async function getEnrollmentByUserId(userId: number): Promise<Enrollment | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(enrollments).where(eq(enrollments.userId, userId)).limit(1);
  return result[0];
}

export async function getEnrollmentBySessionId(sessionId: string): Promise<Enrollment | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(enrollments).where(eq(enrollments.stripeSessionId, sessionId)).limit(1);
  return result[0];
}

export async function markEmailSent(enrollmentId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(enrollments).set({ emailSent: true }).where(eq(enrollments.id, enrollmentId));
}

export async function getAllEnrollmentsWithUsers() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({
      enrollmentId: enrollments.id,
      userId: enrollments.userId,
      enrolledAt: enrollments.enrolledAt,
      amountPaid: enrollments.amountPaid,
      currency: enrollments.currency,
      name: users.name,
      email: users.email,
    })
    .from(enrollments)
    .leftJoin(users, eq(enrollments.userId, users.id))
    .orderBy(sql`${enrollments.enrolledAt} DESC`);
}

export async function getEnrollmentStats() {
  const db = await getDb();
  if (!db) return { totalEnrolled: 0, totalRevenueCents: 0 };
  const [row] = await db
    .select({
      totalEnrolled: count(enrollments.id),
      totalRevenueCents: sql<number>`COALESCE(SUM(${enrollments.amountPaid}), 0)`,
    })
    .from(enrollments);
  return row ?? { totalEnrolled: 0, totalRevenueCents: 0 };
}

export async function getLessonBySlug(moduleSlug: string, lessonSlug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(lessons)
    .where(and(eq(lessons.moduleSlug, moduleSlug), eq(lessons.lessonSlug, lessonSlug)))
    .limit(1);
  return result[0];
}

export async function getAllLessons() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(lessons).orderBy(lessons.moduleOrder, lessons.lessonOrder);
}

export async function upsertLesson(data: {
  moduleSlug: string;
  moduleOrder: number;
  lessonSlug: string;
  lessonOrder: number;
  title: string;
  content: string;
  reflection?: string;
  assignment?: string;
  diagram?: string;
  diagramCaption?: string;
  audioUrl?: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(lessons)
    .values(data)
    .onDuplicateKeyUpdate({
      set: {
        title: data.title,
        content: data.content,
        reflection: data.reflection ?? null,
        assignment: data.assignment ?? null,
        diagram: data.diagram ?? null,
        diagramCaption: data.diagramCaption ?? null,
        audioUrl: data.audioUrl ?? null,
      },
    });
}

export async function markLessonComplete(userId: number, lessonId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(lessonProgress)
    .values({ userId, lessonId })
    .onDuplicateKeyUpdate({ set: { completedAt: new Date() } });
}

export async function unmarkLessonComplete(userId: number, lessonId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, lessonId)));
}

export async function deleteAllUserProgress(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(lessonProgress).where(eq(lessonProgress.userId, userId));
}

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ lessonId: lessonProgress.lessonId, completedAt: lessonProgress.completedAt })
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId));
}

export async function getUserProgressForAdmin(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const [row] = await db
    .select({ cnt: count(lessonProgress.id) })
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId));
  return row?.cnt ?? 0;
}

// ─── Certificates ────────────────────────────────────────────────────────────

export async function getCertificateByUserId(userId: number): Promise<Certificate | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(certificates).where(eq(certificates.userId, userId)).limit(1);
  return result[0];
}

export async function createCertificate(data: {
  userId: number;
  pdfKey: string;
  certificateId?: string;
}): Promise<Certificate> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db
    .insert(certificates)
    .values({ userId: data.userId, pdfKey: data.pdfKey, certificateId: data.certificateId, emailSent: false })
    .onDuplicateKeyUpdate({ set: { pdfKey: data.pdfKey, certificateId: data.certificateId, issuedAt: new Date() } });
  const result = await db.select().from(certificates).where(eq(certificates.userId, data.userId)).limit(1);
  return result[0]!;
}

export async function markCertificateEmailSent(certificateId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(certificates).set({ emailSent: true }).where(eq(certificates.id, certificateId));
}

export async function getCertificateByPublicId(certId: string): Promise<Certificate | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(certificates).where(eq(certificates.certificateId, certId)).limit(1);
  return result[0];
}

export async function getAllCertificates() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(certificates).orderBy(desc(certificates.issuedAt));
}

// ─── Module Comments ─────────────────────────────────────────────────────────

export async function getModuleComments(moduleSlug: string) {
  const db = await getDb();
  if (!db) return [];
  // Fetch top-level comments joined with user info
  const topLevel = await db
    .select({
      id: moduleComments.id,
      moduleSlug: moduleComments.moduleSlug,
      userId: moduleComments.userId,
      parentId: moduleComments.parentId,
      content: moduleComments.content,
      createdAt: moduleComments.createdAt,
      userName: users.name,
    })
    .from(moduleComments)
    .leftJoin(users, eq(moduleComments.userId, users.id))
    .where(and(eq(moduleComments.moduleSlug, moduleSlug), isNull(moduleComments.parentId)))
    .orderBy(desc(moduleComments.createdAt));

  // Fetch all replies for this module
  const replies = await db
    .select({
      id: moduleComments.id,
      moduleSlug: moduleComments.moduleSlug,
      userId: moduleComments.userId,
      parentId: moduleComments.parentId,
      content: moduleComments.content,
      createdAt: moduleComments.createdAt,
      userName: users.name,
    })
    .from(moduleComments)
    .leftJoin(users, eq(moduleComments.userId, users.id))
    .where(and(eq(moduleComments.moduleSlug, moduleSlug), sql`${moduleComments.parentId} IS NOT NULL`))
    .orderBy(moduleComments.createdAt);

  return topLevel.map((comment) => ({
    ...comment,
    replies: replies.filter((r) => r.parentId === comment.id),
  }));
}

export async function getCommentCountByModule(moduleSlug: string): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const [row] = await db
    .select({ cnt: count(moduleComments.id) })
    .from(moduleComments)
    .where(eq(moduleComments.moduleSlug, moduleSlug));
  return row?.cnt ?? 0;
}

export async function createModuleComment(data: {
  moduleSlug: string;
  userId: number;
  parentId?: number | null;
  content: string;
}): Promise<ModuleComment> {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(moduleComments).values({
    moduleSlug: data.moduleSlug,
    userId: data.userId,
    parentId: data.parentId ?? null,
    content: data.content,
  });
  const result = await db
    .select()
    .from(moduleComments)
    .where(eq(moduleComments.userId, data.userId))
    .orderBy(desc(moduleComments.createdAt))
    .limit(1);
  return result[0]!;
}

export async function deleteModuleComment(commentId: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  // Only delete if the comment belongs to this user; also delete any replies
  await db.delete(moduleComments).where(
    and(eq(moduleComments.parentId, commentId))
  );
  await db.delete(moduleComments).where(
    and(eq(moduleComments.id, commentId), eq(moduleComments.userId, userId))
  );
}

// ── Quiz helpers ──────────────────────────────────────────────────────────────

export async function getQuizByLesson(lessonSlug: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.lessonSlug, lessonSlug))
    .orderBy(quizQuestions.questionOrder);
}

export async function upsertQuizQuestions(
  questions: Array<{
    lessonSlug: string;
    moduleSlug: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    questionOrder: number;
  }>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  for (const q of questions) {
    await db.insert(quizQuestions).values({
      ...q,
      options: JSON.stringify(q.options),
    }).onDuplicateKeyUpdate({
      set: {
        question: q.question,
        options: JSON.stringify(q.options),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        questionOrder: q.questionOrder,
      },
    });
  }
}

export async function getLatestQuizAttempt(userId: number, lessonSlug: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(quizAttempts)
    .where(and(eq(quizAttempts.userId, userId), eq(quizAttempts.lessonSlug, lessonSlug)))
    .orderBy(desc(quizAttempts.attemptedAt))
    .limit(1);
  return rows[0] ?? null;
}

export async function getAllQuizAttempts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(quizAttempts)
    .where(eq(quizAttempts.userId, userId));
}

export async function saveQuizAttempt(data: {
  userId: number;
  lessonSlug: string;
  passed: boolean;
  score: number;
  total: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(quizAttempts).values(data);
}
