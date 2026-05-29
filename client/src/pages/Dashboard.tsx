import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect, useMemo } from "react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen, Cpu, Database, Rocket, Scale, Target,
  CheckCircle2, Lock, ChevronRight, LogOut, Award, MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

const MODULE_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
};

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [, navigate] = useLocation();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/dashboard");
    }
  }, [authLoading, isAuthenticated]);

  const { data: enrollmentStatus, isLoading: enrollLoading } = trpc.enrollment.check.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: modules, isLoading: modulesLoading } = trpc.course.getModules.useQuery();

  const { data: progress, isLoading: progressLoading } = trpc.progress.get.useQuery(
    undefined,
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const { data: certificate } = trpc.certificate.get.useQuery(
    undefined,
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled }
  );

  const moduleSlugs = useMemo(
    () => (modules ?? []).map((m) => m.slug),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modules?.map((m) => m.slug).join(",")]
  );
  const { data: commentCounts } = trpc.discussion.getCommentCounts.useQuery(
    { moduleSlugs },
    { enabled: isAuthenticated && !!enrollmentStatus?.enrolled && moduleSlugs.length > 0 }
  );
  const commentCountMap = useMemo(
    () => new Map((commentCounts ?? []).map((c) => [c.slug, c.count])),
    [commentCounts]
  );

  const freeEnroll = trpc.enrollment.freeEnroll.useMutation({
    onSuccess: (data) => { navigate(data.redirectTo); },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const isLoading = authLoading || enrollLoading || modulesLoading;

  // Not enrolled — show upgrade prompt
  if (!isLoading && isAuthenticated && enrollmentStatus && !enrollmentStatus.enrolled) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-3">
            Course Access Required
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Sign up to access all 5 modules and start learning immediately.
          </p>
          <Button
            className="w-full py-5 text-base font-semibold btn-scale"
            onClick={() => freeEnroll.mutate()}
            disabled={freeEnroll.isPending}
          >
            {freeEnroll.isPending ? "Starting course..." : "Begin the Course"}
          </Button>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors block"
          >
            ← Back to course overview
          </button>
        </div>
      </div>
    );
  }

  const completedIds = new Set(progress?.completedLessonIds ?? []);
  const moduleProgressMap = new Map(
    (progress?.moduleProgress ?? []).map((mp) => [mp.slug, mp])
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground">AI Literacy for Leaders</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-foreground gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        {/* Welcome + Progress */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Your Learning Journey</p>
              <h1 className="text-3xl font-serif font-semibold text-foreground">
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
              </h1>
            </div>
            {progress && progress.percentage === 100 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Course Complete!</span>
              </div>
            )}
          </div>

          {/* Certificate banner */}
          {certificate && certificate.pdfUrl && (
            <div className="mt-4 flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-900">Your Certificate is Ready</p>
                  <p className="text-xs text-amber-700">
                    Issued {new Date(certificate.issuedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
              <a
                href={certificate.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 transition-colors"
              >
                <Award className="w-4 h-4" />
                Download Certificate
              </a>
            </div>
          )}

          {/* Overall progress card */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            {progressLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-full" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Overall Progress</span>
                    <span className="text-sm font-semibold text-primary">
                      {progress?.completedCount ?? 0} / {progress?.totalLessons ?? 18} lessons
                    </span>
                  </div>
                  <Progress value={progress?.percentage ?? 0} className="h-2" />
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-3xl font-serif font-bold text-primary">
                    {progress?.percentage ?? 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-xl font-serif font-semibold text-foreground mb-6">Course Modules</h2>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(modules ?? []).map((mod, idx) => {
                // Count completed lessons for this module from shared data
                // We use the lesson IDs stored in progress — but since we only have IDs,
                // we show per-module progress based on the module's lesson count
                return (
                  <button
                    key={mod.slug}
                    onClick={() => navigate(`/course/${mod.slug}`)}
                    className="w-full text-left flex gap-5 p-6 rounded-2xl bg-card border border-border card-hover transition-all group"
                  >
                    {/* Module icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${mod.color}`}>
                        {MODULE_ICONS[mod.icon] ?? <BookOpen className="w-5 h-5" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">
                          Module {idx + 1}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {mod.lessonCount} lessons
                        </Badge>
                        {(() => {
                          const count = commentCountMap.get(mod.slug);
                          if (count && count > 0) {
                            return (
                              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                                <MessageSquare className="w-3 h-3" />{count}
                              </span>
                            );
                          }
                          return null;
                        })()}
                        {(() => {
                          const mp = moduleProgressMap.get(mod.slug);
                          if (mp && mp.completed > 0 && mp.completed === mp.total) {
                            return <Badge className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">Complete</Badge>;
                          }
                          return null;
                        })()}
                      </div>
                      <h3 className="font-serif font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{mod.subtitle}</p>
                      {(() => {
                        const mp = moduleProgressMap.get(mod.slug);
                        if (!mp || mp.total === 0) return null;
                        return (
                          <div className="flex items-center gap-2">
                            <Progress value={mp.percentage} className="h-1.5 flex-1" />
                            <span className="text-xs text-muted-foreground flex-shrink-0">{mp.completed}/{mp.total}</span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 flex items-center">
                      <ChevronRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
