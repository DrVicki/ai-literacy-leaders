# GitHub Pages Deployment Guide

The repository includes a **static course companion** in the [`docs/`](docs/) directory. It is designed for GitHub Pages and presents the public-facing course overview, six-module curriculum, learning objectives, lesson titles, and hands-on activity descriptions.

> The static companion is intentionally separate from the full interactive course application. It directs visitors to the live platform for the authenticated learning experience.

## What GitHub Pages Hosts

| Included in the static course companion | Requires the live course platform |
|---|---|
| Public course overview and learning objectives | Manus OAuth sign-in and enrollment |
| Six-module curriculum and 22 lesson titles | Individual lesson completion tracking |
| Hands-on activity summaries | Audio walkthrough playback and progress persistence |
| Links to the full course platform | Certificates, certificate verification, and email delivery |
| Responsive, accessible landing page | Database, tRPC server, Stripe, and protected learner dashboard |

GitHub Pages is a static web-hosting service. The current interactive application uses server-side authentication, a database, and protected procedures, so it should continue to run on the live course platform rather than on GitHub Pages.

## Files Prepared for Pages

| Path | Purpose |
|---|---|
| [`docs/index.html`](docs/index.html) | Static course companion homepage |
| [`docs/404.html`](docs/404.html) | Project-site-compatible not-found page |
| [`docs/assets/css/styles.css`](docs/assets/css/styles.css) | Responsive navy-and-gold course styling |
| [`docs/assets/js/course-data.js`](docs/assets/js/course-data.js) | Course objectives, modules, activities, and lesson titles |
| [`docs/assets/js/site.js`](docs/assets/js/site.js) | Client-side rendering for the curriculum and objectives |
| [`docs/.nojekyll`](docs/.nojekyll) | Disables Jekyll processing for direct static-asset serving |
| [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) | Automated GitHub Actions deployment workflow |
| [`scripts/validate-github-pages.mjs`](scripts/validate-github-pages.mjs) | Local preflight validation for the static package |

## One-Time GitHub Setup

1. Commit and push the prepared files to the repository's `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and run **Deploy GitHub Pages**, or make a future change beneath `docs/` to deploy automatically.
5. Once the workflow finishes, visit the Pages URL shown in the workflow summary.

For this repository, the expected project-site URL is:

```text
https://drvicki.github.io/ai-literacy-leaders/
```

## Local Validation

Run the following before pushing a static companion update:

```bash
pnpm pages:check
```

The check confirms that the required entry files and linked assets exist, that the static content contains no local API endpoints, and that the expected course data is present.

## Content Updates

The live application remains the source of truth for the interactive course. When public objectives, module descriptions, lesson titles, or activity summaries change, update [`docs/assets/js/course-data.js`](docs/assets/js/course-data.js) to keep the GitHub Pages companion aligned.

The static companion currently links visitors to the live learning platform at:

```text
https://ailitleaders-j5tktczv.manus.space
```
