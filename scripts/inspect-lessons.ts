import { getDb } from "../server/db";
import { lessons } from "../drizzle/schema";
import { sql } from "drizzle-orm";

async function main() {
  const db = await getDb();
  if (!db) { console.error("No DB"); process.exit(1); }

  const rows = await db.select().from(lessons).orderBy(lessons.moduleOrder, lessons.lessonOrder, lessons.id);
  console.log(`Total rows: ${rows.length}`);

  // Group by lessonSlug to find duplicates
  const bySlug: Record<string, typeof rows> = {};
  for (const r of rows) {
    if (!bySlug[r.lessonSlug]) bySlug[r.lessonSlug] = [];
    bySlug[r.lessonSlug].push(r);
  }

  const dupes = Object.entries(bySlug).filter(([, v]) => v.length > 1);
  console.log(`\nDuplicate slugs (${dupes.length}):`);
  for (const [slug, entries] of dupes) {
    console.log(`  ${slug}: ids=${entries.map(e => e.id).join(', ')}`);
  }

  const missing = Object.entries(bySlug).filter(([, v]) => v.length === 0);
  console.log(`\nUnique slugs: ${Object.keys(bySlug).length}`);

  // Show module 6 entries
  const mod6 = rows.filter(r => r.moduleSlug === 'ai-in-action');
  console.log(`\nModule 6 (ai-in-action) rows: ${mod6.length}`);
  for (const r of mod6) {
    console.log(`  id=${r.id} slug=${r.lessonSlug} contentLen=${r.content?.length ?? 0}`);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
