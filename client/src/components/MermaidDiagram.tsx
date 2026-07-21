import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let mermaidInitialized = false;

function initMermaid() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      primaryColor: "#1e3a5f",
      primaryTextColor: "#ffffff",
      primaryBorderColor: "#2d5a8e",
      lineColor: "#64748b",
      secondaryColor: "#f0f4ff",
      tertiaryColor: "#fef9ec",
      background: "#ffffff",
      mainBkg: "#1e3a5f",
      nodeBorder: "#2d5a8e",
      clusterBkg: "#f8fafc",
      titleColor: "#1e3a5f",
      edgeLabelBackground: "#f8fafc",
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: "14px",
    },
    flowchart: { curve: "basis", padding: 20 },
    sequence: { actorMargin: 50, messageMargin: 40 },
  });
  mermaidInitialized = true;
}

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

export function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        initMermaid();
        const { svg: rendered } = await mermaid.render(idRef.current, chart.trim());
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(String(e));
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Diagram could not be rendered.
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 rounded-xl border border-border bg-muted/30 h-40 flex items-center justify-center animate-pulse">
        <span className="text-sm text-muted-foreground">Loading diagram…</span>
      </div>
    );
  }

  return (
    <figure className="my-8 rounded-xl border border-border bg-white shadow-sm overflow-hidden">
      <div
        className="p-6 flex justify-center overflow-x-auto"
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="px-6 py-3 bg-muted/40 border-t border-border text-xs text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
