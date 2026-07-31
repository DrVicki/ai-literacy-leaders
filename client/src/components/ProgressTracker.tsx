import { trpc } from "@/lib/trpc";
import { COURSE_MODULES, TOTAL_LESSONS } from "../../../shared/courseData";
import { cn } from "@/lib/utils";
import { Award, BookOpen } from "lucide-react";

interface ProgressTrackerProps {
  compact?: boolean;
}

export default function ProgressTracker({ compact = false }: ProgressTrackerProps) {
  const { data: progress } = trpc.progress.get.useQuery();
  const { data: certificate } = trpc.certificate.get.useQuery();

  const completedCount = progress?.completedLessonIds?.length ?? 0;
  const overallPct = TOTAL_LESSONS > 0 ? Math.round((completedCount / TOTAL_LESSONS) * 100) : 0;

  // Circumference for SVG circle (r=36)
  const R = 36;
  const CIRC = 2 * Math.PI * R;
  const dashOffset = CIRC - (CIRC * overallPct) / 100;

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-sans">Overall Progress</span>
          <span className="font-semibold text-foreground font-sans">{overallPct}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-sans">
          {completedCount} of {TOTAL_LESSONS} lessons complete
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground font-serif">Your Progress</h3>
          <p className="text-xs text-muted-foreground font-sans">{completedCount} of {TOTAL_LESSONS} lessons complete</p>
        </div>
        {certificate && (
          <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            Certified
          </div>
        )}
      </div>

      {/* Circular progress */}
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
            <circle
              cx="44" cy="44" r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/40"
            />
            <circle
              cx="44" cy="44" r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              className="text-primary transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground font-sans leading-none">{overallPct}%</span>
            <span className="text-xs text-muted-foreground font-sans mt-0.5">done</span>
          </div>
        </div>
      </div>

      {/* Per-module bars */}
      <div className="space-y-3">
        {COURSE_MODULES.map((mod) => {
          const moduleData = (progress?.moduleProgress ?? []).find((mp) => mp.slug === mod.slug);
          const modPct = moduleData?.percentage ?? 0;
          const modCompleted = moduleData?.completed ?? 0;
          const modTotal = moduleData?.total ?? mod.lessons.length;

          return (
            <div key={mod.slug} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground font-sans font-medium truncate max-w-[70%]">
                  {mod.order}. {mod.title}
                </span>
                <span className="text-xs text-muted-foreground font-sans flex-shrink-0">
                  {modCompleted}/{modTotal}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    modPct === 100 ? "bg-emerald-500" : "bg-primary"
                  )}
                  style={{ width: `${modPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
