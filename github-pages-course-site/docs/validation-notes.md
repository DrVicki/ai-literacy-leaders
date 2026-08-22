# GitHub Pages Package Validation Notes

## Local Preview Result

The GitHub Pages source directory at `/home/ubuntu/ai-literacy-leaders/docs` was previewed locally on August 22, 2026. The page rendered successfully with the intended navy-and-gold course homepage, accessible navigation, six learning objectives, all six modules, all 22 lesson titles, hands-on activity summaries, and links to the interactive course platform.

## Publishing Source Diagnosis

The live GitHub Pages site currently uses the `main` branch root (`/`) as its publishing source, which causes GitHub Pages to render the repository's template `README.md`. The corrected public site files have been placed in the repository's `/docs` directory. GitHub Pages must be switched to publish from `main` → `/docs` after those files are pushed to GitHub.
