import { useState } from "react";
import { Copy, Check, Wand2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CustomizeWithAIProps {
  diagramCode?: string;
  lessonTitle: string;
}

const CHATGPT_URL = "https://chat.openai.com";
const CLAUDE_URL = "https://claude.ai";
const MERMAID_LIVE_URL = "https://mermaid.live";

export function CustomizeWithAI({ diagramCode, lessonTitle }: CustomizeWithAIProps) {
  const [copied, setCopied] = useState(false);

  const promptText = diagramCode
    ? `I just copied a Mermaid workflow diagram from a lesson called "${lessonTitle}". Here is the diagram code:\n\n\`\`\`mermaid\n${diagramCode}\n\`\`\`\n\nPlease help me customize this workflow for my own small business. Ask me a few questions about my business type and goals, then rewrite the diagram to reflect my specific situation.`
    : `I am working through a lesson called "${lessonTitle}" about using AI in my small business. Please help me apply the concepts from this lesson to my specific business situation. Ask me a few questions about my business type, size, and goals, then give me a customized action plan.`;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      toast.success("Prompt copied! Paste it into ChatGPT or Claude.");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Could not copy. Please copy the text manually.");
    }
  };

  return (
    <div className="rounded-xl border border-[#c8a84b]/30 bg-gradient-to-br from-[#c8a84b]/5 to-[#c8a84b]/10 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8a84b]/20">
          <Wand2 className="h-4 w-4 text-[#c8a84b]" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Customize This for Your Business</h4>
          <p className="text-xs text-muted-foreground">Use AI to adapt this workflow to your specific situation</p>
        </div>
      </div>

      {/* Instructions */}
      <ol className="space-y-2 text-sm text-muted-foreground">
        <li className="flex gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white text-xs font-bold">1</span>
          <span>
            {diagramCode ? (
              <>Click <strong className="text-foreground">Copy Code</strong> on the diagram above to copy the Mermaid syntax.</>
            ) : (
              <>Click <strong className="text-foreground">Copy Prompt</strong> below to copy a ready-made customization prompt.</>
            )}
          </span>
        </li>
        <li className="flex gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white text-xs font-bold">2</span>
          <span>
            Open <strong className="text-foreground">ChatGPT</strong> or <strong className="text-foreground">Claude</strong> and paste the prompt.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white text-xs font-bold">3</span>
          <span>
            Answer the AI's questions about your business — it will rewrite the workflow specifically for you.
          </span>
        </li>
        {diagramCode && (
          <li className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white text-xs font-bold">4</span>
            <span>
              Paste the new diagram code into <strong className="text-foreground">Mermaid Live Editor</strong> to visualize your custom workflow.
            </span>
          </li>
        )}
      </ol>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          onClick={handleCopyPrompt}
          className="gap-1.5 text-white"
          style={{ background: "#1e3a5f" }}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Prompt
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => window.open(CHATGPT_URL, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open ChatGPT
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => window.open(CLAUDE_URL, "_blank")}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open Claude
        </Button>

        {diagramCode && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => window.open(MERMAID_LIVE_URL, "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Mermaid Live
          </Button>
        )}
      </div>
    </div>
  );
}
