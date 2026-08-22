# AI Literacy & Application for Small Business

This repository is a **GitHub Pages-ready static course companion** for *AI Literacy & Application for Small Business*, developed by **Dr. Vicki Bealman, Ed.D.** It presents the course overview, learning objectives, six-module curriculum, lesson sequence, and hands-on activities in a public, accessible format.

> **Purpose:** This static package is designed for public course information, orientation, and curriculum sharing. It is not a replacement for the authenticated learning platform, which provides learner progress tracking, audio walkthroughs, downloadable Mermaid diagrams, certificate generation, and verification.

## Course at a Glance

| Element | Description |
|---|---|
| **Audience** | Small business owners, nonprofit leaders, and operational teams who want to use AI effectively without a technical background. |
| **Format** | Self-paced, practical online learning with guided demonstrations and action-oriented activities. |
| **Structure** | 6 modules and 22 lessons. |
| **Estimated effort** | Approximately 15 hours. |
| **Learning approach** | Hands-on tool practice, business-specific reflection, workflow visualization, and implementation planning. |
| **Credential** | The authenticated course platform issues a verifiable certificate after learners complete all 22 lessons. |

## Major Learning Objectives

By the end of the course, learners will be able to:

| Objective | Learner outcome |
|---|---|
| **Understand AI clearly** | Explain AI in non-technical language, distinguish predictive from generative AI, and assess AI claims critically. |
| **Identify strategic opportunities** | Evaluate organizational readiness, identify high-value use cases, and create a 90-day AI roadmap. |
| **Prepare data responsibly** | Audit business data, protect customer information, and establish practical governance practices. |
| **Use AI ethically** | Recognize bias, communicate transparently, and create an AI ethics policy suitable for a small organization. |
| **Lead adoption well** | Guide team members through AI-related change, build practical AI fluency, and adapt over time. |
| **Apply AI in operations** | Use AI for analysis, productivity, and marketing, then create a business-specific implementation plan. |

## Course Structure and Activities

Every lesson combines short instruction with an activity that learners can apply in their own organization. The complete lesson sequence is summarized below.

| Module | Lessons | Core activities and deliverables |
|---|---|---|
| **1. Demystifying AI** | *What Is AI? Your First Hands-On Session*; *Two Types of AI You'll Actually Use*; *Cutting Through the Hype: A Hands-On Reality Check*; *How to Evaluate Any AI Tool in 20 Minutes* | Start a real AI conversation, draft a customer follow-up email, distinguish predictive and generative uses, and assess an AI tool using a practical evaluation framework. |
| **2. Strategic AI Integration** | *Is Your Business Ready for AI? A Self-Assessment*; *Finding Your Best AI Opportunities*; *Building Your 90-Day AI Roadmap* | Complete a readiness assessment, map business processes and opportunities, prioritize use cases, and draft a 90-day implementation roadmap. |
| **3. Data Strategy & Governance** | *Auditing Your Business Data: A Hands-On Exercise*; *Protecting Customer Data When Using AI Tools*; *Simple Data Rules for Your Small Business* | Conduct a data audit, identify sensitive information, create data-handling guidelines, and document simple governance rules. |
| **4. Ethical AI** | *Spotting and Avoiding AI Bias in Your Business*; *Being Honest with Customers About AI*; *Talking to Your Team About AI*; *Your Simple AI Ethics Policy* | Test for bias, prepare transparent customer communication, facilitate a team discussion, and draft a proportional AI ethics policy. |
| **5. Leading the AI-Powered Organization** | *Managing the AI Transition in Your Business*; *Building AI Skills in Your Team*; *Future-Proofing Your Small Business with AI*; *You as an AI-Augmented Leader* | Plan the change process, map team learning needs, identify future-ready practices, and reflect on responsible AI-enabled leadership. |
| **6. AI in Action** | *Using AI to Understand Your Business Data*; *AI for Daily Operations: Save 5 Hours a Week*; *AI Marketing for Small Business: A Complete Walkthrough*; *Your Personal AI Implementation Plan* | Analyze business data, streamline a routine operational process, develop marketing content, and complete a personal AI implementation plan. |

## How Each Lesson Works

The activities are designed to turn learning into practical action. Learners move through the following five components in each lesson:

| Component | What learners do |
|---|---|
| **Step-by-Step Demonstration** | Follow a numbered walkthrough using a real AI tool and copy-ready prompts. |
| **Try This Now Activity** | Complete a short, business-relevant exercise that produces a usable output. |
| **Workflow Diagram** | Review a Mermaid visualization, download it as a PNG, or copy the diagram code to customize the workflow. |
| **Audio Walkthrough** | Listen to an AI-narrated version of the demonstration at a convenient pace. |
| **Reflection and Action Assignment** | Connect the lesson to the learner's own organization and commit to a concrete next step. |

## Repository Structure

```text
github-pages-course-site/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml        # GitHub Actions deployment workflow
├── assets/
│   ├── css/
│   │   └── styles.css               # Site design and responsive layout
│   └── js/
│       ├── course-data.js           # Editable course modules, lessons, and activities
│       └── site.js                  # Static-site rendering and navigation behavior
├── docs/
│   └── content-editing-guide.md     # Instructions for maintaining the public companion
├── .gitignore
├── .nojekyll                        # Prevents Jekyll processing of static assets
├── 404.html                         # GitHub Pages-friendly fallback page
├── index.html                       # Public course companion homepage
└── README.md                        # Course, activity, and deployment documentation
```

## Local Preview

The package has no build step and no dependency installation. From this folder, start any static web server. For example:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in a browser. The site is entirely client-side and can be hosted without a server, database, API keys, or environment variables.

## Publish to GitHub Pages

Create a **separate repository** for this public companion rather than deploying the full authenticated course application to GitHub Pages. The current package includes a deployment workflow that publishes the repository root.

| Step | Action |
|---|---|
| **1. Create a repository** | Create a GitHub repository, such as `ai-literacy-small-business`. Use a public repository unless your GitHub plan supports private Pages sites. |
| **2. Add this package** | Copy the contents of this folder to the root of the new repository, including `.github/workflows/deploy-pages.yml` and `.nojekyll`. |
| **3. Push to `main`** | Commit and push the files to the `main` branch. The workflow also supports a manual run from the Actions tab. |
| **4. Enable Pages** | In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. |
| **5. Review deployment** | Open the **Actions** tab and confirm the *Deploy GitHub Pages* workflow finishes successfully. GitHub displays the resulting site URL in the deployment details. |

GitHub Pages can publish a static site either from a selected branch/folder or with a GitHub Actions workflow. This package uses the workflow route so deployment is explicit, repeatable, and compatible with future static build steps.[1] GitHub's recommended workflow pattern includes checking out the repository, configuring Pages, uploading the static artifact, and deploying it with the required Pages permissions.[2]

> **Privacy reminder:** A GitHub Pages site is publicly accessible. Do not place learner records, credentials, API keys, private course assets, customer data, or other sensitive materials in this repository.[1]

## Editing Course Content

The public website's curriculum content is maintained in `assets/js/course-data.js`. Edit the course title, learning objectives, module summaries, lesson titles, or activity highlights there; the homepage renders the updates automatically. See [`docs/content-editing-guide.md`](docs/content-editing-guide.md) for editing guidance and the expected data structure.

## Recommended Use

This static site works well as a public curriculum overview, enrollment information page, orientation resource, or shareable companion for partners and stakeholders. For the interactive learner experience, including progress, diagrams, audio walkthroughs, and certificates, direct learners to the full course platform:

<https://ailitleaders-j5tktczv.manus.space>

## References

[1]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site "GitHub Docs — Configuring a publishing source for your GitHub Pages site"
[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "GitHub Docs — Using custom workflows with GitHub Pages"
