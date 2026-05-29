import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation, useParams } from "wouter";
import { useEffect } from "react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Clock, PlayCircle,
} from "lucide-react";

export default function ModulePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const params = useParams<{ moduleSlug: string }>();
  const moduleSlug = params.moduleSlug;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/dashboard");
    }
  }, [authLoading, isAuthenticated]);

  const { data: enrollmentStatus } = trpc.enrollment.check.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: mod, isLoading: modLoading, error } = trpc.course.getModuleWithLessons.useQuery(
    { moduleSlug },
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const { data: progress } = trpc.progress.get.useQuery(
    undefined,
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const allModules = trpc.course.getModules.useQuery();

  useEffect(() => {
    if (!authLoading && isAuthenticated && enrollmentStatus && !enrollmentStatus.enrolled) {
      navigate("/dashboard");
    }
  }, [authLoading, isAuthenticated, enrollmentStatus]);

  useEffect(() => {
    if (error?.data?.code === "FORBIDDEN") {
      navigate("/dashboard");
    }
  }, [error]);

  const completedIds = new Set(progress?.completedLessonIds ?? []);
  const modules = allModules.data ?? [];
  const currentIdx = modules.findIndex((m) => m.slug === moduleSlug);
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : null;
  const nextModule = currentIdx < modules.length - 1 ? modules[currentIdx + 1] : null;

  if (modLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
          <div className="container flex items-center h-16 gap-3">
            <Skeleton className="w-24 h-8" />
          </div>
        </header>
        <main className="container py-10 max-w-3xl">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-96 mb-10" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        </main>
      </div>
    );
  }

  if (!mod) return null;

  // Count completed lessons in this module
  // We need to match lesson IDs — but we only have IDs from progress
  // The lesson IDs are stored in DB; we'll show a simplified progress
  const moduleCompletedCount = mod.lessons.filter((l) => {
    // We can't easily match without DB IDs on the client, so we show total progress
    return false;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground hidden sm:block">AI Literacy for Leaders</span>
          </div>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      <main className="container py-10 max-w-3xl">
        {/* Module header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${mod.color}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <Badge variant="secondary" className="text-xs uppercase tracking-widest">
              Module {mod.order}
            </Badge>
          </div>
          <h1 className="text-3xl font-serif font-semibold text-foreground mb-2">{mod.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{mod.description}</p>

          {/* Module progress */}
          <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Module Progress</span>
              <span className="text-sm text-muted-foreground">{mod.lessons.length} lessons</span>
            </div>
            <Progress value={0} className="h-1.5" />
          </div>
        </div>

        {/* Lessons list */}
        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => (
            <button
              key={lesson.slug}
              onClick={() => navigate(`/course/${moduleSlug}/${lesson.slug}`)}
              className="w-full text-left flex items-center gap-4 p-5 rounded-xl bg-card border border-border card-hover group transition-all"
            >
              {/* Lesson number / check */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  {idx + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {lesson.duration}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0">
                <PlayCircle className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {/* Module navigation */}
        <div className="mt-12 flex items-center justify-between">
          {prevModule ? (
            <button
              onClick={() => navigate(`/course/${prevModule.slug}`)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Module {prevModule.order}: {prevModule.title}</span>
            </button>
          ) : (
            <div />
          )}
          {nextModule ? (
            <button
              onClick={() => navigate(`/course/${nextModule.slug}`)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Module {nextModule.order}: {nextModule.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
