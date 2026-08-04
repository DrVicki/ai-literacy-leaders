import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getEnrollmentByUserId: vi.fn(),
  createEnrollment: vi.fn(),
  getAllLessons: vi.fn().mockResolvedValue([]),
  getLessonBySlug: vi.fn(),
  getUserProgress: vi.fn().mockResolvedValue([]),
  markLessonComplete: vi.fn(),
  unmarkLessonComplete: vi.fn(),
  deleteAllUserProgress: vi.fn(),
  deleteCertificateByUserId: vi.fn(),
  getAllEnrollmentsWithUsers: vi.fn().mockResolvedValue([]),
  getEnrollmentStats: vi.fn().mockResolvedValue({ totalEnrolled: 0, totalRevenueCents: 0 }),
  getUserProgressForAdmin: vi.fn().mockResolvedValue(0),
  upsertLesson: vi.fn(),
  markEmailSent: vi.fn(),
  // Certificate helpers
  getCertificateByUserId: vi.fn().mockResolvedValue(null),
  createCertificate: vi.fn(),
  markCertificateEmailSent: vi.fn(),
  getAllCertificates: vi.fn().mockResolvedValue([]),
  // Discussion helpers
  getModuleComments: vi.fn().mockResolvedValue([]),
  getCommentCountByModule: vi.fn().mockResolvedValue(0),
  createModuleComment: vi.fn(),
  deleteModuleComment: vi.fn(),
  // Quiz helpers
  getQuizByLesson: vi.fn().mockResolvedValue([
    { id: 1, lessonSlug: "what-is-ai", moduleSlug: "demystifying-ai", question: "What does AI stand for?", options: JSON.stringify(["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Automated Interface"]), correctIndex: 1, explanation: "AI stands for Artificial Intelligence.", questionOrder: 1 },
    { id: 2, lessonSlug: "what-is-ai", moduleSlug: "demystifying-ai", question: "Which is narrow AI?", options: JSON.stringify(["Human brain", "Chess engine", "General reasoning", "Consciousness"]), correctIndex: 1, explanation: "A chess engine is narrow AI.", questionOrder: 2 },
  ]),
  getLatestQuizAttempt: vi.fn().mockResolvedValue(null),
  getAllQuizAttempts: vi.fn().mockResolvedValue([]),
  saveQuizAttempt: vi.fn().mockResolvedValue(undefined),
  upsertQuizQuestions: vi.fn().mockResolvedValue(undefined),
}));

// Mock certificate PDF generation
vi.mock("./certificate", () => ({
  generateCertificatePdf: vi.fn().mockResolvedValue({ key: "certificates/test.pdf", url: "/manus-storage/certificates/test.pdf" }),
}));

// Mock email helpers
vi.mock("./emailHelpers", () => ({
  sendEnrollmentEmail: vi.fn(),
  sendCertificateEmail: vi.fn(),
}));

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/test", id: "cs_test_123" }),
        },
      },
    })),
  };
});

import {
  getEnrollmentByUserId,
  getLessonBySlug,
  getUserProgress,
  markLessonComplete,
  unmarkLessonComplete,
  deleteAllUserProgress,
} from "./db";

function createUserCtx(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user-openid",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: { origin: "https://example.com" } } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAnonCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("course.getModules", () => {
  it("returns all 6 modules publicly", async () => {
    const caller = appRouter.createCaller(createAnonCtx());
    const modules = await caller.course.getModules();
    expect(modules).toHaveLength(6);
    expect(modules.map((m) => m.title)).toEqual([
      "Demystifying AI",
      "Strategic AI Integration",
      "Data Strategy & Governance",
      "Ethical AI",
      "Leading the AI-Powered Organization",
      "AI in Action",
    ]);
  });

  it("includes lessonCount for each module", async () => {
    const caller = appRouter.createCaller(createAnonCtx());
    const modules = await caller.course.getModules();
    for (const mod of modules) {
      expect(mod.lessonCount).toBeGreaterThan(0);
    }
  });
});

describe("enrollment.check", () => {
  beforeEach(() => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
  });

  it("returns enrolled: false when user has no enrollment", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    const result = await caller.enrollment.check();
    expect(result.enrolled).toBe(false);
    expect(result.enrollment).toBeNull();
  });

  it("returns enrolled: true when user has an enrollment", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1,
      userId: 1,
      stripeSessionId: "cs_test_123",
      stripePaymentIntentId: "pi_test_123",
      amountPaid: 49700,
      currency: "usd",
      emailSent: true,
      enrolledAt: new Date(),
    });
    const caller = appRouter.createCaller(createUserCtx());
    const result = await caller.enrollment.check();
    expect(result.enrolled).toBe(true);
    expect(result.enrollment).not.toBeNull();
  });
});

describe("course.getModuleWithLessons", () => {
  it("throws FORBIDDEN when user is not enrolled", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    await expect(
      caller.course.getModuleWithLessons({ moduleSlug: "demystifying-ai" })
    ).rejects.toThrow("Enrollment required");
  });

  it("returns module data for enrolled user", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    const caller = appRouter.createCaller(createUserCtx());
    const mod = await caller.course.getModuleWithLessons({ moduleSlug: "demystifying-ai" });
    expect(mod.title).toBe("Demystifying AI");
    expect(mod.lessons.length).toBeGreaterThan(0);
  });

  it("allows admin to access modules without enrollment", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx("admin"));
    const mod = await caller.course.getModuleWithLessons({ moduleSlug: "ethical-ai" });
    expect(mod.title).toBe("Ethical AI");
  });
});

describe("progress.get", () => {
  it("returns zero progress for new user", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    vi.mocked(getUserProgress).mockResolvedValue([]);
    const caller = appRouter.createCaller(createUserCtx());
    const progress = await caller.progress.get();
    expect(progress.completedCount).toBe(0);
    expect(progress.percentage).toBe(0);
    expect(progress.totalLessons).toBe(22);
  });
});

describe("progress.toggleLesson", () => {
  it("marks a lesson complete", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    vi.mocked(getLessonBySlug).mockResolvedValue({
      id: 42, moduleSlug: "demystifying-ai", moduleOrder: 1,
      lessonSlug: "what-is-ai", lessonOrder: 1, title: "What Is AI?", content: "...",
    });
    const caller = appRouter.createCaller(createUserCtx());
    const result = await caller.progress.toggleLesson({
      moduleSlug: "demystifying-ai",
      lessonSlug: "what-is-ai",
      complete: true,
    });
    expect(result.success).toBe(true);
    expect(markLessonComplete).toHaveBeenCalledWith(1, 42);
  });

  it("unmarks a lesson complete", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    vi.mocked(getLessonBySlug).mockResolvedValue({
      id: 42, moduleSlug: "demystifying-ai", moduleOrder: 1,
      lessonSlug: "what-is-ai", lessonOrder: 1, title: "What Is AI?", content: "...",
    });
    const caller = appRouter.createCaller(createUserCtx());
    const result = await caller.progress.toggleLesson({
      moduleSlug: "demystifying-ai",
      lessonSlug: "what-is-ai",
      complete: false,
    });
    expect(result.success).toBe(true);
    expect(unmarkLessonComplete).toHaveBeenCalledWith(1, 42);
  });
});

describe("progress.reset", () => {
  it("deletes all progress for the current user", async () => {
    vi.mocked(deleteAllUserProgress).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    const result = await caller.progress.reset();
    expect(result.success).toBe(true);
    expect(deleteAllUserProgress).toHaveBeenCalledWith(1);
  });
});

describe("admin.getStats", () => {
  it("throws FORBIDDEN for non-admin users", async () => {
    const caller = appRouter.createCaller(createUserCtx("user"));
    await expect(caller.admin.getStats()).rejects.toThrow("Admin access required");
  });

  it("returns stats for admin users", async () => {
    const caller = appRouter.createCaller(createUserCtx("admin"));
    const stats = await caller.admin.getStats();
    expect(stats).toHaveProperty("totalEnrolled");
    expect(stats).toHaveProperty("totalRevenueDisplay");
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = createUserCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });
});

describe("certificate.get", () => {
  it("returns null when no certificate exists", async () => {
    const { getCertificateByUserId } = await import("./db");
    vi.mocked(getCertificateByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    const cert = await caller.certificate.get();
    expect(cert).toBeNull();
  });

  it("returns certificate data when certificate exists", async () => {
    const { getCertificateByUserId } = await import("./db");
    vi.mocked(getCertificateByUserId).mockResolvedValue({
      id: 1,
      userId: 1,
      pdfKey: "certificates/Test_User_123.pdf",
      emailSent: true,
      issuedAt: new Date("2026-01-01"),
    });
    const caller = appRouter.createCaller(createUserCtx());
    const cert = await caller.certificate.get();
    expect(cert).not.toBeNull();
    expect(cert?.pdfUrl).toBe("/manus-storage/certificates/Test_User_123.pdf");
    expect(cert?.emailSent).toBe(true);
  });
});

describe("discussion.getComments", () => {
  it("throws FORBIDDEN when user is not enrolled", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    await expect(
      caller.discussion.getComments({ moduleSlug: "demystifying-ai" })
    ).rejects.toThrow("Enrollment required");
  });

  it("returns comments for enrolled user", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    const { getModuleComments } = await import("./db");
    vi.mocked(getModuleComments).mockResolvedValue([]);
    const caller = appRouter.createCaller(createUserCtx());
    const comments = await caller.discussion.getComments({ moduleSlug: "demystifying-ai" });
    expect(Array.isArray(comments)).toBe(true);
  });
});

describe("discussion.postComment", () => {
  it("throws FORBIDDEN when user is not enrolled", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    await expect(
      caller.discussion.postComment({ moduleSlug: "demystifying-ai", content: "Hello!" })
    ).rejects.toThrow("Enrollment required");
  });

  it("creates a comment for enrolled user", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue({
      id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
      amountPaid: 49700, currency: "usd", emailSent: true, enrolledAt: new Date(),
    });
    const { createModuleComment } = await import("./db");
    vi.mocked(createModuleComment).mockResolvedValue({
      id: 10,
      moduleSlug: "demystifying-ai",
      userId: 1,
      parentId: null,
      content: "Hello!",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const caller = appRouter.createCaller(createUserCtx());
    const comment = await caller.discussion.postComment({
      moduleSlug: "demystifying-ai",
      content: "Hello!",
    });
    expect(comment.content).toBe("Hello!");
    expect(createModuleComment).toHaveBeenCalledWith(
      expect.objectContaining({ content: "Hello!", moduleSlug: "demystifying-ai" })
    );
  });
});

// Helper for enrolled context
function createEnrolledContext(): TrpcContext {
  vi.mocked(getEnrollmentByUserId).mockResolvedValue({
    id: 1, userId: 1, stripeSessionId: null, stripePaymentIntentId: null,
    amountPaid: 0, currency: "usd", emailSent: true, enrolledAt: new Date(),
  });
  return createUserCtx();
}

describe("quiz.getQuestions", () => {
  it("returns questions without correctIndex for enrolled users", async () => {
    const caller = appRouter.createCaller(createEnrolledContext());
    const questions = await caller.quiz.getQuestions({ lessonSlug: "what-is-ai" });
    expect(questions).toHaveLength(2);
    expect(questions[0]).not.toHaveProperty("correctIndex");
    expect(questions[0]).toHaveProperty("question");
    expect(questions[0]).toHaveProperty("options");
  });
});

describe("quiz.submit", () => {
  it("returns passed=true when all answers are correct", async () => {
    const caller = appRouter.createCaller(createEnrolledContext());
    const result = await caller.quiz.submit({
      lessonSlug: "what-is-ai",
      answers: [
        { questionId: 1, selectedIndex: 1 },
        { questionId: 2, selectedIndex: 1 },
      ],
    });
    expect(result.passed).toBe(true);
    expect(result.score).toBe(2);
    expect(result.total).toBe(2);
  });

  it("returns passed=false when below threshold", async () => {
    const caller = appRouter.createCaller(createEnrolledContext());
    const result = await caller.quiz.submit({
      lessonSlug: "what-is-ai",
      answers: [
        { questionId: 1, selectedIndex: 0 },
        { questionId: 2, selectedIndex: 0 },
      ],
    });
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  it("throws FORBIDDEN for non-enrolled users", async () => {
    vi.mocked(getEnrollmentByUserId).mockResolvedValue(undefined);
    const caller = appRouter.createCaller(createUserCtx());
    await expect(
      caller.quiz.submit({
        lessonSlug: "what-is-ai",
        answers: [{ questionId: 1, selectedIndex: 1 }],
      })
    ).rejects.toThrow();
  });
});
