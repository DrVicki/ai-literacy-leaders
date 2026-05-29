import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MessageCircle, Reply, Trash2, Send, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  moduleSlug: string;
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function DiscussionThread({ moduleSlug }: Props) {
  const { user } = useAuth();
  const utils = trpc.useUtils();

  const { data: comments, isLoading, error, refetch } = trpc.discussion.getComments.useQuery({ moduleSlug });

  const [newQuestion, setNewQuestion] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [expanded, setExpanded] = useState(true);

  const postComment = trpc.discussion.postComment.useMutation({
    onSuccess: () => {
      setNewQuestion("");
      utils.discussion.getComments.invalidate({ moduleSlug });
      toast.success("Question posted!");
    },
    onError: () => toast.error("Failed to post. Please try again."),
  });

  const postReply = trpc.discussion.postComment.useMutation({
    onSuccess: () => {
      setReplyingTo(null);
      setReplyText("");
      utils.discussion.getComments.invalidate({ moduleSlug });
      toast.success("Reply posted!");
    },
    onError: () => toast.error("Failed to post reply."),
  });

  const deleteComment = trpc.discussion.deleteComment.useMutation({
    onSuccess: () => {
      utils.discussion.getComments.invalidate({ moduleSlug });
      toast.success("Comment deleted.");
    },
    onError: () => toast.error("Failed to delete comment."),
  });

  const handlePost = () => {
    if (!newQuestion.trim()) return;
    postComment.mutate({ moduleSlug, content: newQuestion.trim() });
  };

  const handleReply = (parentId: number) => {
    if (!replyText.trim()) return;
    postReply.mutate({ moduleSlug, content: replyText.trim(), parentId });
  };

  const commentCount = comments?.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0) ?? 0;

  return (
    <div className="mt-10 border-t border-border pt-8">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-3 w-full text-left mb-6 group"
      >
        <div className="flex items-center gap-2 flex-1">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-serif font-semibold text-foreground">
            Discussion & Q&A
          </h3>
          {commentCount > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {commentCount}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </button>

      {expanded && (
        <div className="space-y-6">
          {/* New question input */}
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0 mt-1">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Ask a question or share an insight about this module..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="resize-none text-sm min-h-[80px] focus-visible:ring-primary/30"
                maxLength={2000}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handlePost();
                }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {newQuestion.length}/2000 · Cmd+Enter to post
                </span>
                <Button
                  size="sm"
                  onClick={handlePost}
                  disabled={!newQuestion.trim() || postComment.isPending}
                  className="gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {postComment.isPending ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>

          {/* Comments list */}
          {error ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-3">Failed to load discussion. Please try again.</p>
              <button
                onClick={() => refetch()}
                className="text-xs text-primary hover:underline"
              >
                Retry
              </button>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="group">
                  {/* Top-level comment */}
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                        {initials(comment.userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {comment.userName ?? "Learner"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {timeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => {
                            setReplyingTo(replyingTo === comment.id ? null : comment.id);
                            setReplyText("");
                          }}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          Reply
                        </button>
                        {user?.id === comment.userId && (
                          <button
                            onClick={() => deleteComment.mutate({ commentId: comment.id })}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )}
                      </div>

                      {/* Reply input */}
                      {replyingTo === comment.id && (
                        <div className="mt-3 flex gap-2">
                          <Avatar className="w-7 h-7 flex-shrink-0 mt-1">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {initials(user?.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder={`Reply to ${comment.userName ?? "this comment"}...`}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="resize-none text-sm min-h-[60px] focus-visible:ring-primary/30"
                              maxLength={2000}
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleReply(comment.id);
                                if (e.key === "Escape") { setReplyingTo(null); setReplyText(""); }
                              }}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleReply(comment.id)}
                                disabled={!replyText.trim() || postReply.isPending}
                                className="gap-1.5 text-xs"
                              >
                                <Send className="w-3 h-3" />
                                {postReply.isPending ? "Posting..." : "Reply"}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => { setReplyingTo(null); setReplyText(""); }}
                                className="text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-border space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2 group/reply">
                              <Avatar className="w-7 h-7 flex-shrink-0">
                                <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                                  {initials(reply.userName)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-sm font-semibold text-foreground">
                                    {reply.userName ?? "Learner"}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {timeAgo(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                  {reply.content}
                                </p>
                                {user?.id === reply.userId && (
                                  <button
                                    onClick={() => deleteComment.mutate({ commentId: reply.id })}
                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors mt-1 opacity-0 group-hover/reply:opacity-100"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No questions yet. Be the first to ask!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
