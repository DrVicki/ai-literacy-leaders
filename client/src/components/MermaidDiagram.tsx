import { useEffect, useRef, useState, useCallback } from "react";
import mermaid from "mermaid";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  /** Used as the PNG download filename (spaces → hyphens, lowercased) */
  title?: string;
}

export function MermaidDiagram({ chart, caption, title }: MermaidDiagramProps) {
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const modalIdRef = useRef(`mermaid-modal-${Math.random().toString(36).slice(2)}`);

  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Render the diagram once
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

  // Close fullscreen on ESC
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  // Reset zoom when closing
  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setZoom(1);
  }, []);

  // PNG download: render SVG to a canvas, then trigger download
  const handleDownload = useCallback(async () => {
    if (!svg) return;
    try {
      const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const scale = 2; // 2× for retina quality
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const a = document.createElement("a");
          const filename = title
            ? `${title.toLowerCase().replace(/\s+/g, "-")}-diagram.png`
            : "lesson-diagram.png";
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          a.click();
          URL.revokeObjectURL(a.href);
          toast.success("Diagram downloaded as PNG");
        }, "image/png");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        toast.error("Could not download diagram");
      };
      img.src = url;
    } catch {
      toast.error("Could not download diagram");
    }
  }, [svg, title]);

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
    <>
      {/* Inline diagram card */}
      <figure className="my-8 rounded-xl border border-border bg-white shadow-sm overflow-hidden group">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Diagram
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              onClick={handleDownload}
              title="Download as PNG"
            >
              <Download className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => { setZoom(1); setIsFullscreen(true); }}
              title="View fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* SVG preview */}
        <div
          className="p-6 flex justify-center overflow-x-auto cursor-zoom-in"
          onClick={() => { setZoom(1); setIsFullscreen(true); }}
          title="Click to expand"
          dangerouslySetInnerHTML={{ __html: svg }}
        />

        {caption && (
          <figcaption className="px-6 py-3 bg-muted/40 border-t border-border text-xs text-muted-foreground text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
          onClick={(e) => { if (e.target === e.currentTarget) closeFullscreen(); }}
        >
          {/* Modal toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-white/10 border-b border-white/20 shrink-0">
            <span className="text-sm font-medium text-white/80">
              {caption ?? "Diagram"}
            </span>
            <div className="flex items-center gap-2">
              {/* Zoom out */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.25).toFixed(2)))}
                title="Zoom out"
                disabled={zoom <= 0.25}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              {/* Zoom label */}
              <span className="text-xs text-white/60 w-12 text-center tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              {/* Zoom in */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setZoom((z) => Math.min(4, +(z + 0.25).toFixed(2)))}
                title="Zoom in"
                disabled={zoom >= 4}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              {/* Reset zoom */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setZoom(1)}
                title="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              {/* Download */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                onClick={handleDownload}
                title="Download as PNG"
              >
                <Download className="w-4 h-4" />
              </Button>
              {/* Close */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 ml-2"
                onClick={closeFullscreen}
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Scrollable diagram area */}
          <div className="flex-1 overflow-auto flex items-start justify-center p-8">
            <div
              id={modalIdRef.current}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
                transition: "transform 150ms cubic-bezier(0.23,1,0.32,1)",
                background: "#fff",
                borderRadius: "12px",
                padding: "32px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          {/* Caption bar */}
          {caption && (
            <div className="shrink-0 px-6 py-3 bg-white/5 border-t border-white/10 text-center text-xs text-white/50 italic">
              {caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}
