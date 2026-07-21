import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Course enrollments — created after successful Stripe payment
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  amountPaid: int("amountPaid").default(0), // in cents
  currency: varchar("currency", { length: 8 }).default("usd"),
  emailSent: boolean("emailSent").default(false).notNull(),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Lessons within each module
export const lessons = mysqlTable(
  "lessons",
  {
    id: int("id").autoincrement().primaryKey(),
    moduleSlug: varchar("moduleSlug", { length: 64 }).notNull(),
    moduleOrder: int("moduleOrder").notNull(),
    lessonSlug: varchar("lessonSlug", { length: 64 }).notNull(),
    lessonOrder: int("lessonOrder").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content"),
  },
  (table) => [uniqueIndex("lessons_module_lesson_unique").on(table.moduleSlug, table.lessonSlug)]
);

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

// Per-user lesson completion tracking
export const lessonProgress = mysqlTable("lesson_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type LessonProgress = typeof lessonProgress.$inferSelect;
export type InsertLessonProgress = typeof lessonProgress.$inferInsert;

// Completion certificates — issued when a learner finishes all lessons
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // one certificate per user
  pdfKey: varchar("pdfKey", { length: 512 }), // S3 storage key
  emailSent: boolean("emailSent").default(false).notNull(),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

// Per-module Q&A discussion comments
export const moduleComments = mysqlTable("module_comments", {
  id: int("id").autoincrement().primaryKey(),
  moduleSlug: varchar("moduleSlug", { length: 64 }).notNull(),
  userId: int("userId").notNull(),
  parentId: int("parentId"), // null = top-level question, set = reply
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ModuleComment = typeof moduleComments.$inferSelect;
export type InsertModuleComment = typeof moduleComments.$inferInsert;

// Knowledge check questions — 2-3 per lesson
export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  lessonSlug: varchar("lessonSlug", { length: 64 }).notNull(),
  moduleSlug: varchar("moduleSlug", { length: 64 }).notNull(),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON array of strings
  correctIndex: int("correctIndex").notNull(),
  explanation: text("explanation").notNull(),
  questionOrder: int("questionOrder").notNull().default(0),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

// Per-user quiz attempt tracking
export const quizAttempts = mysqlTable("quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonSlug: varchar("lessonSlug", { length: 64 }).notNull(),
  passed: boolean("passed").default(false).notNull(),
  score: int("score").notNull().default(0), // number correct
  total: int("total").notNull().default(0), // total questions
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = typeof quizAttempts.$inferInsert;
