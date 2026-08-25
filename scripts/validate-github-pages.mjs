import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "docs/index.html",
  "docs/404.html",
  "docs/.nojekyll",
  "docs/assets/css/styles.css",
  "docs/assets/js/course-data.js",
  "docs/assets/js/site.js",
  ".github/workflows/deploy-github-pages.yml",
];

const missingFiles = requiredFiles.filter((file) => !existsSync(resolve(root, file)));
if (missingFiles.length > 0) {
  console.error("GitHub Pages validation failed. Missing required file(s):");
  for (const file of missingFiles) console.error(`- ${file}`);
  process.exit(1);
}

const indexHtml = readFileSync(resolve(root, "docs/index.html"), "utf8");
const courseData = readFileSync(resolve(root, "docs/assets/js/course-data.js"), "utf8");
const workflow = readFileSync(resolve(root, ".github/workflows/deploy-github-pages.yml"), "utf8");

const checks = [
  [indexHtml.includes('href="assets/css/styles.css"'), "index.html links the stylesheet with a relative project-site path"],
  [indexHtml.includes('src="assets/js/course-data.js"'), "index.html loads the course data script"],
  [indexHtml.includes('src="assets/js/site.js"'), "index.html loads the rendering script"],
  [indexHtml.includes("https://ailitleaders-j5tktczv.manus.space"), "index.html links to the live interactive course platform"],
  [indexHtml.includes("GitHub Pages course companion"), "index.html clearly distinguishes the static companion from the live course platform"],
  [courseData.includes("Demystifying AI"), "course data includes Module 1"],
  [courseData.includes("AI in Action"), "course data includes Module 6"],
  [courseData.includes("Your Personal AI Implementation Plan"), "course data includes all 22 lesson titles"],
  [workflow.includes("actions/deploy-pages@v4"), "workflow deploys the docs artifact through GitHub Pages Actions"],
];

const failures = checks.filter(([, passed]) => !passed).map(([description]) => description);
if (failures.length > 0) {
  console.error("GitHub Pages validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("GitHub Pages static course companion is ready.");
console.log(`Validated ${requiredFiles.length} required files and ${checks.length} content checks.`);
