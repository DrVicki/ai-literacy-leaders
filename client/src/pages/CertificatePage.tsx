import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Award, Download, ChevronLeft, CheckCircle2, ExternalLink, Copy, Check, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { TOTAL_LESSONS, COURSE_MODULES } from "../../../shared/courseData";

function CopyCertIdButton({ certId }: { certId: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(certId);
      setCopied(true);
      toast.success("Certificate ID copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={handleCopy} title="Copy certificate ID" className="flex-shrink-0">
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
}

export default function CertificatePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl("/certificate");
    }
  }, [authLoading, isAuthenticated]);

  const utils = trpc.useUtils();
  const { data: certificate, isLoading } = trpc.certificate.get.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: progress } = trpc.progress.get.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const claimMutation = trpc.certificate.claim.useMutation({
    onSuccess: () => {
      toast.success("Certificate generated! Refreshing...");
      utils.certificate.get.invalidate();
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to generate certificate");
    },
  });

  const resetMutation = trpc.progress.reset.useMutation({
    onSuccess: () => {
      toast.success("Progress and certificate have been reset. You can start fresh!");
      utils.certificate.get.invalidate();
      utils.progress.get.invalidate();
    },
    onError: () => toast.error("Failed to reset. Please try again."),
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const pct = progress?.percentage ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Back nav */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-sans"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {certificate ? (
          <div className="space-y-8">
            {/* Certificate preview card */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-amber-500/5 p-10 text-center shadow-xl">
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />

              {/* Award icon */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground font-sans mb-3">
                Certificate of Completion
              </p>

              <p className="text-sm text-muted-foreground font-sans mb-2">This certifies that</p>

              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                {user?.name ?? "Learner"}
              </h1>

              <p className="text-sm text-muted-foreground font-sans mb-4">
                has successfully completed
              </p>

              <h2 className="text-xl font-serif font-semibold text-primary mb-1">
                AI Literacy & Application for Small Business
              </h2>
              <p className="text-sm text-muted-foreground font-sans mb-6">
                Executive Education Program | Dr. Vicki Bealman
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-sans mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  Completed{" "}
                  {new Date(certificate.issuedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Certificate ID */}
              {certificate.certificateId && (
                <div className="mt-2 bg-primary/5 rounded-xl px-5 py-3 inline-block">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mb-1">Certificate ID</p>
                  <p className="text-sm font-mono font-bold text-foreground tracking-widest">
                    {certificate.certificateId}
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {certificate.pdfUrl && (
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl gap-2">
                    <Download className="w-5 h-5" />
                    Download PDF Certificate
                  </Button>
                </a>
              )}

              {/* Verify link */}
              {certificate.certificateId && (
                <div className="flex gap-2">
                  <a
                    href={`/verify/${certificate.certificateId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full gap-2 font-sans">
                      <ExternalLink className="w-4 h-4" />
                      View Verification Page
                    </Button>
                  </a>
                  <CopyCertIdButton certId={certificate.certificateId} />
                </div>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground font-sans">
              Share your achievement with colleagues and on LinkedIn
            </p>

            {/* Reset — destructive, behind confirmation dialog */}
            <div className="pt-4 border-t border-border/40 flex justify-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={resetMutation.isPending}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {resetMutation.isPending ? "Resetting..." : "Reset Progress & Certificate"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Progress &amp; Certificate?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your certificate and clear all completed lessons, resetting your progress to 0%. Your enrollment will remain active. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => resetMutation.mutate()}
                    >
                      Yes, Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          /* Not yet earned */
          <div className="text-center space-y-6 py-16">
            <div className="w-24 h-24 rounded-full bg-muted/40 flex items-center justify-center mx-auto">
              <Award className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                Certificate Not Yet Earned
              </h2>
              <p className="text-muted-foreground font-sans max-w-sm mx-auto">
                Complete all {TOTAL_LESSONS} lessons across the {COURSE_MODULES.length} modules to earn your certificate of completion.
              </p>
            </div>

            {/* Progress bar */}
            <div className="max-w-sm mx-auto space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-muted-foreground">Your progress</span>
                <span className="font-semibold text-foreground">{pct}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {progress?.completedCount ?? 0} of {TOTAL_LESSONS} lessons complete
              </p>
            </div>

            {pct >= 100 ? (
              <Button
                onClick={() => claimMutation.mutate()}
                disabled={claimMutation.isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-base font-semibold rounded-xl gap-2"
              >
                <Award className="w-5 h-5" />
                {claimMutation.isPending ? "Generating Certificate..." : "Generate My Certificate"}
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5"
              >
                Continue Learning
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
