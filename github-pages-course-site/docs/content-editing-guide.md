# Content Editing Guide

The public GitHub Pages companion is intentionally simple: all editable course content lives in one file, `assets/js/course-data.js`. The homepage uses that data to render the learning objectives, module cards, lesson lists, and activity highlights.

## Edit Workflow

| Task | File to edit | What to change |
|---|---|---|
| Update a learning objective | `assets/js/course-data.js` | Edit one item in the `objectives` array. |
| Rename a module | `assets/js/course-data.js` | Update the module object's `title` value. |
| Update a module summary | `assets/js/course-data.js` | Update the module object's `description` value. |
| Add, remove, or rename a lesson | `assets/js/course-data.js` | Edit the strings in that module's `lessons` array. |
| Update a hands-on activity | `assets/js/course-data.js` | Update the module object's `activity` value. |
| Change visual styling | `assets/css/styles.css` | Adjust the CSS variables at the top of the file before changing individual rules. |
| Change static page wording or external links | `index.html` | Edit the relevant section directly. |

## Data Shape

Each module follows the same pattern:

```js
{
  number: "01",
  title: "Demystifying AI",
  description: "A concise, learner-facing module summary.",
  activity: "A concise, hands-on description of the module activity.",
  lessons: [
    "First lesson title",
    "Second lesson title"
  ]
}
```

Keep lesson titles in double quotation marks and separate each entry with a comma except for the final entry in an array. Keep the module `number` values formatted with two digits (`"01"`, `"02"`, and so on) so the public site remains visually consistent.

## Quality Check Before Publishing

Before committing changes, preview the static site locally with `python3 -m http.server 8080` from the repository root. Review the curriculum at desktop and mobile widths. Verify that links point to the intended course platform and that the number of displayed lessons matches the course outline.

The GitHub Actions workflow publishes on pushes to `main`. Review the workflow result in the repository's **Actions** tab after pushing changes. For GitHub Pages setup and workflow troubleshooting, use the official GitHub documentation.[1] [2]

## References

[1]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site "GitHub Docs — Configuring a publishing source for your GitHub Pages site"
[2]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "GitHub Docs — Using custom workflows with GitHub Pages"

