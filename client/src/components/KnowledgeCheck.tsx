import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, RotateCcw, BookOpen, ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface KnowledgeCheckProps {
  lessonSlug: string;
  onPassed?: () => void;
}

type SubmitResult = {
  passed: boolean;
  score: number;
  total: number;
  results: Array<{
    questionId: number;
    question: string;
    options: string[];
    selectedIndex: number;
    correctIndex: number;
    explanation: string;
    isCorrect: boolean;
  }>;
};

export default function KnowledgeCheck({ lessonSlug, onPassed }: KnowledgeCheckProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const { data: questions, isLoading } = trpc.quiz.getQuestions.useQuery(
    { lessonSlug },
    { enabled: isOpen }
  );
  const { data: latestAttempt } = trpc.quiz.getAttempt.useQuery({ lessonSlug });
  const utils = trpc.useUtils();

  const submitQuiz = trpc.quiz.submit.useMutation({
    onSuccess: (data) => {
      setResult(data);
      if (data.passed) {
        utils.quiz.getAttempt.invalidate({ lessonSlug });
        onPassed?.();
      }
    },
  });

  const handleSelect = (questionId: number, index: number) => {
    if (result) return; // locked after submission
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = () => {
    if (!questions) return;
    const answers = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: selectedAnswers[q.id] ?? -1,
    }));
    submitQuiz.mutate({ lessonSlug, answers });
  };

  const handleRetry = () => {
    setResult(null);
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };

  const allAnswered = questions?.every((q) => selectedAnswers[q.id] !== undefined) ?? false;
  const alreadyPassed = latestAttempt?.passed === true;

  // Collapsed state
  if (!isOpen) {
    return (
      <div className="mt-10 border border-primary/20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        <div className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground font-serif">Knowledge Check</h3>
                {alreadyPassed && (
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Passed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {alreadyPassed
                  ? `You scored ${latestAttempt?.score}/${latestAttempt?.total} — review the questions anytime`
                  : "Test your understanding before marking this lesson complete"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="flex-shrink-0 border-primary/30 text-primary hover:bg-primary/5"
          >
            {alreadyPassed ? "Review" : "Start Quiz"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 border border-primary/20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground font-serif">Knowledge Check</h3>
          {questions && !result && (
            <span className="text-xs text-muted-foreground font-sans">
              {Object.keys(selectedAnswers).length}/{questions.length} answered
            </span>
          )}
        </div>
        <button
          onClick={() => { setIsOpen(false); handleRetry(); }}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
        >
          Close
        </button>
      </div>

      <div className="p-6">
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted/40 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Results view */}
        {result && (
          <div className="space-y-6">
            {/* Score banner */}
            <div className={cn(
              "rounded-xl p-5 flex items-center gap-4",
              result.passed
                ? "bg-emerald-500/10 border border-emerald-500/20"
                : "bg-amber-500/10 border border-amber-500/20"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                result.passed ? "bg-emerald-500/20" : "bg-amber-500/20"
              )}>
                {result.passed
                  ? <Award className="w-6 h-6 text-emerald-600" />
                  : <RotateCcw className="w-6 h-6 text-amber-600" />
                }
              </div>
              <div>
                <p className={cn(
                  "font-semibold text-lg font-serif",
                  result.passed ? "text-emerald-700" : "text-amber-700"
                )}>
                  {result.passed ? "Well done! You passed." : "Not quite — give it another try."}
                </p>
                <p className="text-sm text-muted-foreground font-sans mt-0.5">
                  You got <strong>{result.score}</strong> out of <strong>{result.total}</strong> correct
                  ({Math.round((result.score / result.total) * 100)}%)
                </p>
              </div>
            </div>

            {/* Per-question review */}
            <div className="space-y-5">
              {result.results.map((r, idx) => (
                <div key={r.questionId} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      r.isCorrect ? "bg-emerald-500/20" : "bg-red-500/20"
                    )}>
                      {r.isCorrect
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        : <XCircle className="w-4 h-4 text-red-500" />
                      }
                    </span>
                    <p className="font-medium text-foreground text-sm leading-relaxed">{idx + 1}. {r.question}</p>
                  </div>
                  <div className="ml-9 space-y-1.5">
                    {r.options.map((opt, i) => (
                      <div key={i} className={cn(
                        "px-3 py-2 rounded-lg text-sm font-sans",
                        i === r.correctIndex && "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20",
                        i === r.selectedIndex && i !== r.correctIndex && "bg-red-500/10 text-red-700 border border-red-500/20",
                        i !== r.correctIndex && i !== r.selectedIndex && "text-muted-foreground"
                      )}>
                        {opt}
                        {i === r.correctIndex && <span className="ml-2 text-xs font-medium">✓ Correct</span>}
                        {i === r.selectedIndex && i !== r.correctIndex && <span className="ml-2 text-xs font-medium">✗ Your answer</span>}
                      </div>
                    ))}
                  </div>
                  <div className="ml-9 bg-muted/40 rounded-lg px-3 py-2.5 text-sm text-muted-foreground font-sans leading-relaxed">
                    <span className="font-medium text-foreground">Explanation: </span>{r.explanation}
                  </div>
                </div>
              ))}
            </div>

            {!result.passed && (
              <Button onClick={handleRetry} variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5">
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            )}
          </div>
        )}

        {/* Question view */}
        {!result && questions && questions.length > 0 && (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium text-foreground leading-relaxed">
                  <span className="text-primary font-semibold mr-2">{idx + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border text-sm font-sans transition-all duration-150",
                        "hover:border-primary/40 hover:bg-primary/5",
                        selectedAnswers[q.id] === i
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-foreground"
                      )}
                    >
                      <span className="inline-flex w-5 h-5 rounded-full border border-current items-center justify-center text-xs mr-3 flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitQuiz.isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitQuiz.isPending ? "Checking..." : "Submit Answers"}
            </Button>
            {!allAnswered && (
              <p className="text-xs text-center text-muted-foreground font-sans">
                Answer all questions to submit
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
