# AI Literacy for Leaders — Project TODO

## Phase 1: Database & Setup
- [x] Design and migrate database schema (enrollments, lessons, progress)
- [x] Create Stripe product and price for one-time course purchase ($497)
- [x] Set up Stripe secret key in environment

## Phase 2: Public Landing Page
- [x] Elegant hero section with course title, tagline, and enroll CTA
- [x] Course overview section (what you'll learn)
- [x] 5-module curriculum section with module names and descriptions
- [x] Instructor/credibility section
- [x] Pricing section with Stripe checkout CTA
- [x] Footer with links

## Phase 3: Course Dashboard & Modules
- [x] Protected course dashboard (redirect unauthenticated/non-enrolled users)
- [x] Dashboard showing all 5 modules with progress indicators
- [x] Module 1: Demystifying AI — lesson pages (4 lessons)
- [x] Module 2: Strategic AI Integration — lesson pages (3 lessons)
- [x] Module 3: Data Strategy & Governance — lesson pages (3 lessons)
- [x] Module 4: Ethical AI — lesson pages (4 lessons)
- [x] Module 5: Leading the AI-Powered Organization — lesson pages (4 lessons)
- [x] Progress tracking: mark lessons complete, module progress bar, overall progress

## Phase 4: Stripe & Gmail Integration
- [x] Stripe one-time payment link / checkout session creation
- [x] Stripe webhook to confirm payment and create enrollment record
- [x] Gmail enrollment confirmation email sent on successful payment (via MCP)
- [x] Post-payment redirect to course dashboard

## Phase 5: Admin View
- [x] Admin-only route protected by role check
- [x] Table of enrolled students (name, email, enrolled date, progress)
- [x] Enrollment statistics (total enrolled, avg progress, total revenue)

## Phase 6: Polish & Delivery
- [x] Consistent design tokens, typography (Playfair Display + Inter), navy/gold palette
- [x] Loading states (skeletons), empty states, and error boundaries
- [x] Vitest unit tests for core procedures (14 tests passing)
- [x] Final checkpoint and delivery

## New Features (Round 2)

### Certificate of Completion
- [x] Add `certificates` table to schema (userId, issuedAt, pdfKey)
- [x] Server-side PDF generation using manus-md-to-pdf via shell
- [x] Certificate tRPC procedure: check 100% completion, generate PDF, upload to S3, send Gmail
- [x] Auto-trigger certificate on final lesson completion (toggleLesson mutation)
- [x] Certificate download button on dashboard when earned
- [x] Admin view: show certificate issued status per student

### Q&A Discussion per Module
- [x] Add `module_comments` table (id, moduleSlug, userId, parentId, content, createdAt)
- [x] tRPC procedures: getComments, postComment, deleteComment (own only)
- [x] Discussion thread UI on ModulePage (post question, reply, display thread)
- [x] Show comment count badge on module cards in Dashboard

## New Features (Round 3)

### Knowledge Checks per Lesson
- [x] Add `quiz_questions` and `quiz_attempts` tables to schema
- [x] Seed 2-3 quiz questions per lesson (all 18 lessons) via quizData.ts
- [x] tRPC quiz procedures: getQuestions (no correctIndex), getAttempt, submit
- [x] KnowledgeCheck component with question view, scoring, pass/fail feedback, retry
- [x] Integrate KnowledgeCheck into LessonPage below lesson content

### Visual Progress Tracker
- [x] ProgressTracker component: circular SVG overall % + per-module progress bars
- [x] Replace basic progress card in Dashboard with ProgressTracker
- [x] Compact variant available for ModulePage

### Certificate at 100% Completion
- [x] Certificate auto-issued when all 18 lessons are marked complete
- [x] CertificatePage at /certificate — styled printable certificate with PDF download
- [x] Certificate link in dashboard header nav
- [x] 24 Vitest tests passing (4 new quiz tests added)

## SME Feedback Incorporation (Round 4)

### Module 1 Restructure — Operational & Hands-On
- [ ] Rename/restructure Module 1 lessons to be action-oriented (doing, not just learning)
- [ ] Add "Data Readiness" as a foundational lesson (identifying and organizing business data/processes)
- [ ] Replace abstract workflow design content with practical build-and-apply activities
- [ ] Add "Tool Selection & Governance" lesson (enterprise vs personal, privacy, security, cost trade-offs)
- [ ] Reduce prompting content; reframe around knowing what tools exist and when to use them
- [ ] Add "Business Case for AI" lesson framed around revenue and strategic impact, not just cost-cutting
- [ ] Add "Human Oversight & Ownership" lesson — who owns AI outputs, security/IP concerns
- [ ] Add capstone/in-person collaboration note to Module 5 or course overview
- [ ] Update quiz questions for all revised Module 1 lessons
- [ ] Update landing page curriculum section to reflect SME-informed framing

## Quiz → Reflection Replacement (Round 5)

- [ ] Add reflection prompts and action assignments to all 18 lessons in courseData.ts
- [ ] Build LessonReflection component (reflection prompt + action assignment display)
- [ ] Replace KnowledgeCheck component with LessonReflection in LessonPage
- [ ] Remove quiz router from routers.ts
- [ ] Update tests to remove quiz test cases
- [ ] Update todo.md and save checkpoint

## Full Course Restructure (Round 5 — Updated)

- [ ] Add reflection prompts and action assignments to all 18 existing lessons in courseData.ts
- [ ] Add Module 6: "AI in Action: Real-World Applications for Your Business" (data analysis, productivity, marketing, customer engagement) with 3-4 lessons
- [ ] Build LessonReflection component (reflection prompt + action assignment display)
- [ ] Replace KnowledgeCheck with LessonReflection in LessonPage
- [ ] Remove quiz router from routers.ts
- [ ] Update landing page: 6 modules, ~15 hours, small-business audience framing
- [ ] Update TOTAL_LESSONS count in courseData.ts
- [ ] Update tests and save checkpoint
