import { trpc } from "@/lib/trpc";
import { useParams, useLocation } from "wouter";
import { Award, CheckCircle2, XCircle, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifyCertificatePage() {
  const params = useParams<{ certificateId: string }>();
  const [, navigate] = useLocation();
  const certId = params.certificateId ?? "";

  const { data, isLoading } = trpc.certificate.verify.useQuery(
    { certificateId: certId },
    { enabled: certId.length > 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Brand header */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground font-sans">AI Literacy & Application for Small Business</span>
      </button>

      <div className="w-full max-w-lg">
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-border shadow-xl p-10 space-y-4">
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>
        ) : data?.valid ? (
          /* ── Valid certificate ── */
          <div className="bg-white rounded-3xl border-2 border-emerald-200 shadow-xl overflow-hidden">
            {/* Green verified banner */}
            <div className="bg-emerald-500 px-8 py-5 flex items-center gap-3">
              <CheckCircle2 className="w-7 h-7 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-bold text-lg leading-none">Certificate Verified</p>
                <p className="text-emerald-100 text-sm mt-0.5">This is an authentic certificate of completion</p>
              </div>
            </div>

            {/* Certificate details */}
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground font-sans mb-2">
                  Certificate of Completion
                </p>
                <p className="text-sm text-muted-foreground font-sans mb-1">This certifies that</p>
                <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
                  {data.recipientName}
                </h1>
                <p className="text-sm text-muted-foreground font-sans mb-1">has successfully completed</p>
                <h2 className="text-lg font-serif font-semibold text-primary mb-1">
                  {data.courseName}
                </h2>
                <p className="text-xs text-muted-foreground font-sans">
                  Executive Education Program | Dr. Vicki Bealman
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mb-1">Modules</p>
                  <p className="text-xl font-bold text-foreground font-sans">{data.modules}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mb-1">Lessons</p>
                  <p className="text-xl font-bold text-foreground font-sans">{data.lessons}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mb-1">Issued</p>
                  <p className="text-sm font-semibold text-foreground font-sans">
                    {new Date(data.issuedAt!).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="bg-slate-50 rounded-xl px-6 py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-sans mb-1">Certificate ID</p>
                <p className="text-base font-mono font-bold text-foreground tracking-widest">
                  {data.certificateId}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── Invalid / not found ── */
          <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl overflow-hidden">
            <div className="bg-red-500 px-8 py-5 flex items-center gap-3">
              <XCircle className="w-7 h-7 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-bold text-lg leading-none">Certificate Not Found</p>
                <p className="text-red-100 text-sm mt-0.5">No matching certificate was found for this ID</p>
              </div>
            </div>
            <div className="p-8 text-center space-y-4">
              <p className="text-muted-foreground font-sans text-sm">
                The certificate ID <span className="font-mono font-semibold text-foreground">{certId}</span> does not
                match any issued certificate. Please check the ID and try again.
              </p>
              <p className="text-xs text-muted-foreground font-sans">
                If you believe this is an error, please contact the course administrator.
              </p>
            </div>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground gap-1.5 font-sans"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Learn more about this course
          </Button>
        </div>
      </div>
    </div>
  );
}
