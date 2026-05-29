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
  getAllEnrollmentsWithUsers: vi.fn().mockResolvedValue([]),
  getEnrollmentStats: vi.fn().mockResolvedValue({ totalEnrolled: 0, totalRevenueCents: 0 }),
  getUserProgressForAdmin: vi.fn().mockResolvedValue(0),
  upsertLesson: vi.fn(),
  markEmailSent: vi.fn(),
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
  it("returns all 5 modules publicly", async () => {
    const caller = appRouter.createCaller(createAnonCtx());
    const modules = await caller.course.getModules();
    expect(modules).toHaveLength(5);
    expect(modules.map((m) => m.title)).toEqual([
      "Demystifying AI",
      "Strategic AI Integration",
      "Data Strategy & Governance",
      "Ethical AI",
      "Leading the AI-Powered Organization",
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
    expect(progress.totalLessons).toBe(18);
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
