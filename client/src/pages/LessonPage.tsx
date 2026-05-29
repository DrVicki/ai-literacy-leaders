import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation, useParams } from "wouter";
import { useEffect } from "react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import {
  BookOpen, ChevronLeft, ChevronRight, CheckCircle2, Circle,
} from "lucide-react";

export default function LessonPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const params = useParams<{ moduleSlug: string; lessonSlug: string }>();
  const { moduleSlug, lessonSlug } = params;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/dashboard");
    }
  }, [authLoading, isAuthenticated]);

  const { data: enrollmentStatus } = trpc.enrollment.check.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: lesson, isLoading: lessonLoading, error } = trpc.course.getLesson.useQuery(
    { moduleSlug, lessonSlug },
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const { data: mod } = trpc.course.getModuleWithLessons.useQuery(
    { moduleSlug },
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const { data: progress, refetch: refetchProgress } = trpc.progress.get.useQuery(
    undefined,
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const utils = trpc.useUtils();
  const toggleLesson = trpc.progress.toggleLesson.useMutation({
    onMutate: async ({ complete }) => {
      toast.success(complete ? "Lesson marked as complete!" : "Lesson marked as incomplete");
    },
    onSuccess: () => {
      refetchProgress();
      utils.progress.get.invalidate();
    },
    onError: () => {
      toast.error("Failed to update progress. Please try again.");
    },
  });

  useEffect(() => {
    if (!authLoading && isAuthenticated && enrollmentStatus && !enrollmentStatus.enrolled) {
      navigate("/dashboard");
    }
  }, [authLoading, isAuthenticated, enrollmentStatus]);

  useEffect(() => {
    if (error?.data?.code === "FORBIDDEN") navigate("/dashboard");
  }, [error]);

  const completedIds = new Set(progress?.completedLessonIds ?? []);
  const isComplete = lesson ? completedIds.has(lesson.id) : false;

  // Find prev/next lesson within the module
  const lessons = mod?.lessons ?? [];
  const currentLessonIdx = lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentLessonIdx > 0 ? lessons[currentLessonIdx - 1] : null;
  const nextLesson = currentLessonIdx < lessons.length - 1 ? lessons[currentLessonIdx + 1] : null;

  if (lessonLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
          <div className="container flex items-center h-16">
            <Skeleton className="w-24 h-8" />
          </div>
        </header>
        <main className="container py-10 max-w-3xl">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </main>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate(`/course/${moduleSlug}`)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{mod?.title ?? "Module"}</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground hidden sm:block">AI Literacy for Leaders</span>
          </div>
          <div className="w-24 flex justify-end">
            <Badge variant="secondary" className="text-xs">
              {currentLessonIdx + 1} / {lessons.length}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container py-10 max-w-3xl">
        {/* Lesson header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs uppercase tracking-widest">
              Module {mod?.order} · Lesson {currentLessonIdx + 1}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground mb-4 leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{lesson.lessonOrder} min read</span>
            </div>
            <Button
              variant={isComplete ? "default" : "outline"}
              size="sm"
              onClick={() =>
                toggleLesson.mutate({ moduleSlug, lessonSlug, complete: !isComplete })
              }
              disabled={toggleLesson.isPending}
              className={`gap-2 btn-scale transition-all ${isComplete ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600" : ""}`}
            >
              {isComplete ? (
                <><CheckCircle2 className="w-4 h-4" /> Completed</>
              ) : (
                <><Circle className="w-4 h-4" /> Mark Complete</>
              )}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Lesson content */}
        <div className="prose prose-slate max-w-none lesson-content">
          <Streamdown>{lesson.content}</Streamdown>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-12 mb-8" />

        {/* Complete + navigation */}
        <div className="flex flex-col gap-4">
          {!isComplete && (
            <Button
              className="w-full py-5 font-semibold btn-scale bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => toggleLesson.mutate({ moduleSlug, lessonSlug, complete: true })}
              disabled={toggleLesson.isPending}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark Lesson Complete
            </Button>
          )}

          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => navigate(`/course/${moduleSlug}/${prevLesson.slug}`)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="line-clamp-1">{prevLesson.title}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate(`/course/${moduleSlug}`)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to module</span>
              </button>
            )}

            {nextLesson ? (
              <button
                onClick={() => navigate(`/course/${moduleSlug}/${nextLesson.slug}`)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="line-clamp-1">{nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Back to dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
