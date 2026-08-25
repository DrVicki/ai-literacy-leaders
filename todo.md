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

- [x] Add reflection prompts and action assignments to all 18 lessons in courseData.ts
- [x] Build LessonReflection component (reflection prompt + action assignment display)
- [x] Replace KnowledgeCheck component with LessonReflection in LessonPage
- [x] Remove quiz router from routers.ts
- [x] Update tests to remove quiz test cases
- [x] Update todo.md and save checkpoint

## Full Course Restructure (Round 5 — Updated)

- [x] Add reflection prompts and action assignments to all 18 existing lessons in courseData.ts
- [x] Add Module 6: "AI in Action: Real-World Applications for Your Business" (data analysis, productivity, marketing, customer engagement) with 3-4 lessons
- [x] Build LessonReflection component (reflection prompt + action assignment display)
- [x] Replace KnowledgeCheck with LessonReflection in LessonPage
- [x] Remove quiz router from routers.ts
- [x] Update landing page: 6 modules, ~15 hours, small-business audience framing
- [x] Update TOTAL_LESSONS count in courseData.ts
- [x] Update tests and save checkpoint

## Content & Copy Updates (Round 6)

- [x] Update "What You'll Learn" 6 cards to match small business audience and 6-module content
- [x] Update curriculum section heading from "Five-Module" to "Six-Module"
- [x] Rewrite bio to remove corporate/executive framing, reflect small business/nonprofit audience
- [ ] Module 1 full content pass: data readiness, tool-agnostic framing, revenue-focused business case, human oversight

## Bug Fixes

- [x] Module 6 lessons had no content visible — root cause: seed guard checked `existing.length > 0` instead of comparing to TOTAL_LESSONS, so new lessons were never inserted; fixed guard, deduplicated DB rows, added unique constraint on (moduleSlug, lessonSlug)

## Hands-On Content Rewrite (Round 7)

- [x] Rewrite Module 1 (4 lessons): shift to hands-on tool practice, add "Try This Now" exercises
- [x] Rewrite Module 2 (3 lessons): hands-on use case mapping and roadmap activities
- [x] Rewrite Module 3 (3 lessons): hands-on data audit and governance exercises
- [x] Rewrite Module 4 (4 lessons): hands-on bias testing and ethics policy activities
- [x] Rewrite Module 5 (4 lessons): hands-on change management and team activities
- [x] Rewrite Module 6 (4 lessons): deeper step-by-step tool walkthroughs
- [x] Re-seed all updated lesson content into the database
- [x] Verify all 22 lessons display updated content in the app

## In-Lesson Visualizations (Round 8)

- [x] Audit LessonPage component to understand content rendering pipeline
- [x] Install and wire mermaid.js for in-browser diagram rendering
- [x] Build LessonVisual component (renders Mermaid diagrams with caption)
- [x] Add visualization field to LessonData interface in courseData.ts
- [x] Add Mermaid diagram definitions for all 22 lessons
- [x] Wire LessonVisual into LessonPage between content sections
- [x] Re-seed lesson visualizations into the database
- [x] Verify diagrams render correctly in the app
- [x] Save checkpoint

## Reset Course Progress (Round 9)

- [x] Add progress.reset tRPC mutation (deletes all lesson_progress rows for current user)
- [x] Add confirmation dialog on Dashboard with reset button
- [x] Invalidate progress and certificate queries after reset
- [x] Test reset flow end-to-end
- [x] Save checkpoint

## Diagram Enhancements (Round 10)

- [x] Add fullscreen modal to MermaidDiagram component (click to expand, ESC to close)
- [x] Add zoom in/out controls inside the fullscreen modal
- [x] Add PNG download button to each diagram (converts SVG to canvas to PNG)
- [x] Ensure download filename reflects the lesson title
- [x] Save checkpoint

## Walkthrough Audio & Customize Panel (Round 12)

- [x] Generate TTS narration audio for all 22 lessons (Option B — AI voice narration over branded slide)
- [x] Upload all 22 audio files to CDN
- [x] Add audioUrl field to LessonData interface, schema (audioUrl column), and seed
- [x] Build DemoAudioPlayer component (branded slide background, play/pause/seek/volume controls)
- [x] Build CustomizeWithAI instruction panel (3-step guide, Copy Prompt, Open ChatGPT/Claude/Mermaid Live buttons)
- [x] Wire DemoAudioPlayer above diagram in LessonPage
- [x] Wire CustomizeWithAI below diagram in LessonPage
- [x] Re-seed all 22 lessons with audioUrl data
- [x] Run tests and save checkpoint

## Bug Fix: Certificate Not Loading (Round 13)

- [x] Fix CertificatePage.tsx: replace hardcoded "18 lessons" and "5 modules" with TOTAL_LESSONS and COURSE_MODULES.length
- [x] Fix CertificatePage.tsx: isComplete check must use TOTAL_LESSONS not hardcoded 18
- [x] Fix certificate.ts: replace hardcoded "18 of 18" with dynamic TOTAL_LESSONS
- [x] Fix emailHelpers.ts: replace "5 modules and 18 lessons" with dynamic values
- [x] Fix stripeWebhook.ts: replace "5 modules" with dynamic value
- [x] Fix Dashboard.tsx: "all 5 modules" text
- [x] Run tests and save checkpoint

## Certificate ID & Verification (Round 14)

- [x] Fix ProgressTracker: per-module bars showed 0/N because moduleProgress was cast as Record instead of array.find()
- [x] Add `certificateId` varchar(32) column to certificates table + unique index migration
- [x] Add generateCertificateId() helper (format: AILLSB-YYYY-XXXXXX) to certificate.ts
- [x] Update generateCertificatePdf() to embed certificateId and completion date in PDF
- [x] Update createCertificate() in db.ts to accept and store certificateId
- [x] Add getUserById() helper to db.ts
- [x] Add getCertificateByPublicId() helper to db.ts
- [x] Add public certificate.verify tRPC procedure (no auth required)
- [x] Create VerifyCertificatePage at /verify/:certificateId (green verified / red not-found states)
- [x] Update CertificatePage to show certificateId badge, copy button, and verify link
- [x] 25 Vitest tests passing

## Bug Fix: Certificate Not Generating for Existing 100% Users (Round 14b)

- [x] Root cause: auto-issue only fires on toggleLesson; users already at 100% before the feature was built had no certificate
- [x] Add certificate.claim tRPC mutation: checks progress >= TOTAL_LESSONS, idempotent, generates PDF + stores cert + sends email
- [x] Update CertificatePage: show "Generate My Certificate" button when pct >= 100 and no cert exists
- [x] 25 Vitest tests passing

## Bug Fix: manus-md-to-pdf Not Available in Production (Round 14c)

- [x] Root cause: manus-md-to-pdf is a sandbox-only CLI tool not available in the Cloud Run production environment
- [x] Install pdf-lib (pure Node.js PDF generation, no shell commands)
- [x] Rewrite generateCertificatePdf() in certificate.ts to use pdf-lib: landscape A4, navy/gold design, Times Roman fonts, corner accents, stats row, certificate ID, verify URL
- [x] Remove all child_process/execSync/fs/tmpdir imports from certificate.ts
- [x] 25 Vitest tests passing, 0 TypeScript errors

## GitHub Pages Static Course Package

- [x] Create a GitHub Pages-ready static course companion with a deployment workflow
- [x] Write README documentation covering the course, six-module structure, and hands-on activities
- [x] Validate the static package and deployment configuration

## GitHub Pages Publishing Fix

- [ ] Configure GitHub Pages to publish the static course companion instead of the repository README
- [ ] Verify the live GitHub Pages URL renders the AI Literacy course homepage

## GitHub Pages Package Refresh

- [x] Review and refresh the static course companion files for GitHub Pages
- [x] Add or update GitHub Pages deployment guidance and validate the static package locally

## GitHub Pages Push Permission Fix

- [x] Remove the blocked GitHub Actions workflow so the current credential can push the package
- [x] Update GitHub Pages documentation and validation for branch-based `/docs` publishing
- [x] Validate the workflow-free static package and save a checkpoint

## Reusable GitHub Pages Skill & Push

- [x] Create and validate a reusable skill for static course companions and branch-based GitHub Pages publishing
- [x] Commit and push the workflow-free GitHub Pages package to the configured GitHub repository
