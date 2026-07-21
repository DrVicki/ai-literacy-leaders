import { getDb } from "../server/db";
import { lessons } from "../drizzle/schema";
import { sql } from "drizzle-orm";

async function main() {
  const db = await getDb();
  if (!db) { console.error("No DB"); process.exit(1); }

  const rows = await db
    .select({
      moduleSlug: lessons.moduleSlug,
      lessonSlug: lessons.lessonSlug,
      contentLen: sql<number>`LENGTH(content)`,
      hasSteps: sql<string>`CASE WHEN content LIKE '%Step 1%' THEN 'YES' ELSE 'NO' END`,
      hasTryThis: sql<string>`CASE WHEN content LIKE '%Try This Now%' THEN 'YES' ELSE 'NO' END`,
    })
    .from(lessons)
    .orderBy(lessons.moduleSlug, lessons.order);

  let allGood = true;
  for (const r of rows) {
    const ok = r.hasSteps === "YES" && r.hasTryThis === "YES" && r.contentLen > 1500;
    if (!ok) allGood = false;
    console.log(
      `${ok ? "✅" : "❌"} ${r.moduleSlug.padEnd(35)} ${r.lessonSlug.padEnd(30)} len:${r.contentLen} steps:${r.hasSteps} try:${r.hasTryThis}`
    );
  }
  console.log(allGood ? "\n✅ All 22 lessons verified." : "\n❌ Some lessons need attention.");
  process.exit(allGood ? 0 : 1);
}

main();
