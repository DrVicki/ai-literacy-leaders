import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { getLoginUrl } from "@/const";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen, ChevronLeft, Users, DollarSign, TrendingUp, Award,
} from "lucide-react";

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/admin");
    }
  }, [authLoading, isAuthenticated]);

  const { data: stats, isLoading: statsLoading } = trpc.admin.getStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: enrollments, isLoading: enrollmentsLoading } = trpc.admin.getEnrollments.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // If not admin, redirect
  useEffect(() => {
    if (!authLoading && isAuthenticated && user?.role !== "admin") {
      navigate("/dashboard");
    }
  }, [authLoading, isAuthenticated, user]);

  const isLoading = authLoading || statsLoading || enrollmentsLoading;

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
            <span className="text-sm font-semibold text-foreground hidden sm:block">Admin Panel</span>
          </div>
          <Badge variant="secondary" className="text-xs">Admin</Badge>
        </div>
      </header>

      <main className="container py-10">
        {/* Page title */}
        <div className="mb-10">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Course Management</p>
          <h1 className="text-3xl font-serif font-semibold text-foreground">Enrollment Dashboard</h1>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: <Users className="w-5 h-5" />,
              label: "Total Enrolled",
              value: statsLoading ? "—" : String(stats?.totalEnrolled ?? 0),
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: <DollarSign className="w-5 h-5" />,
              label: "Total Revenue",
              value: statsLoading ? "—" : (stats?.totalRevenueDisplay ?? "$0.00"),
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              icon: <TrendingUp className="w-5 h-5" />,
              label: "Avg. Progress",
              value: statsLoading || !enrollments?.length
                ? "—"
                : `${Math.round(
                    enrollments.reduce((sum, e) => sum + e.progressPercent, 0) /
                    enrollments.length
                  )}%`,
              color: "text-violet-600",
              bg: "bg-violet-50",
            },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-serif font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enrolled students table */}
        <div>
          <h2 className="text-xl font-serif font-semibold text-foreground mb-6">Enrolled Students</h2>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : !enrollments?.length ? (
            <div className="text-center py-16 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No students enrolled yet</p>
              <p className="text-sm mt-1">Enrollments will appear here after successful purchases.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-secondary/50 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-widest">
                <div className="col-span-4">Student</div>
                <div className="col-span-2 hidden sm:block">Enrolled</div>
                <div className="col-span-2 hidden sm:block">Amount Paid</div>
                <div className="col-span-4">Progress</div>
              </div>

              {/* Rows */}
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.enrollmentId}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 items-center hover:bg-secondary/30 transition-colors"
                >
                  {/* Student info */}
                  <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {(enrollment.name ?? enrollment.email ?? "?")[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-foreground text-sm truncate">
                          {enrollment.name ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {enrollment.email ?? "—"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enrolled date */}
                  <div className="col-span-2 hidden sm:block text-sm text-muted-foreground">
                    {formatDate(enrollment.enrolledAt)}
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 hidden sm:block text-sm text-foreground font-medium">
                    {enrollment.amountPaid
                      ? `$${(enrollment.amountPaid / 100).toFixed(2)}`
                      : "—"}
                  </div>

                  {/* Progress */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Progress value={enrollment.progressPercent} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-right flex-shrink-0">
                        {enrollment.progressPercent}%
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
