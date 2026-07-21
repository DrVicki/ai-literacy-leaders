/**
 * Force-seed all lessons from courseData.ts into the database.
 * Run with: pnpm tsx scripts/force-seed-lessons.ts
 */
import { COURSE_MODULES, TOTAL_LESSONS } from "../shared/courseData";
import { getAllLessons, upsertLesson } from "../server/db";

async function main() {
  const existing = await getAllLessons();
  console.log(`DB has ${existing.length} lessons. courseData has ${TOTAL_LESSONS} lessons.`);

  let inserted = 0;
  let updated = 0;
  const existingSlugs = new Set(existing.map((l) => l.lessonSlug));

  for (const mod of COURSE_MODULES) {
    for (const lesson of mod.lessons) {
      const isNew = !existingSlugs.has(lesson.slug);
      await upsertLesson({
        moduleSlug: mod.slug,
        moduleOrder: mod.order,
        lessonSlug: lesson.slug,
        lessonOrder: lesson.order,
        title: lesson.title,
        content: lesson.content,
        reflection: lesson.reflection,
        assignment: lesson.assignment,
        diagram: lesson.diagram,
        diagramCaption: lesson.diagramCaption,
      });
      if (isNew) {
        inserted++;
        console.log(`  INSERTED: ${mod.slug}/${lesson.slug}`);
      } else {
        updated++;
      }
    }
  }

  const after = await getAllLessons();
  console.log(`\nDone. Inserted ${inserted} new lessons, updated ${updated} existing.`);
  console.log(`DB now has ${after.length} lessons.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
