import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface DemoAudioPlayerProps {
  audioUrl: string;
  lessonTitle: string;
  moduleTitle?: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function DemoAudioPlayer({ audioUrl, lessonTitle, moduleTitle }: DemoAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError(true);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setError(true);
      }
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setError(true));
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolume = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value[0];
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
      audio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-md">
      {/* Branded slide background */}
      <div
        className="relative flex flex-col items-center justify-center px-6 py-10 text-center"
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f2040 60%, #1a3050 100%)",
          minHeight: "180px",
        }}
      >
        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,168,75,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Headphones icon */}
        <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <Headphones className="h-7 w-7 text-[#c8a84b]" />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a84b] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#c8a84b]" />
            </span>
          )}
        </div>

        {/* Labels */}
        {moduleTitle && (
          <p className="relative text-xs font-medium tracking-widest uppercase text-[#c8a84b] mb-1 opacity-80">
            {moduleTitle}
          </p>
        )}
        <h3 className="relative text-base font-bold text-white leading-snug max-w-sm">
          {lessonTitle}
        </h3>
        <p className="relative mt-1 text-xs text-white/60">Demo Walkthrough — Audio Narration</p>
      </div>

      {/* Controls */}
      <div className="bg-card px-4 py-4 space-y-3">
        {error ? (
          <p className="text-center text-sm text-muted-foreground">
            Audio unavailable. Please refresh the page.
          </p>
        ) : (
          <>
            {/* Progress bar */}
            <div className="space-y-1">
              <Slider
                min={0}
                max={duration || 100}
                step={0.5}
                value={[currentTime]}
                onValueChange={handleSeek}
                disabled={!isLoaded}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-between gap-2">
              {/* Restart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={restart}
                disabled={!isLoaded}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Restart"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              {/* Play / Pause */}
              <Button
                onClick={togglePlay}
                disabled={!isLoaded}
                className="h-12 w-12 rounded-full text-white shadow-md transition-transform active:scale-95"
                style={{ background: isLoaded ? "#1e3a5f" : undefined }}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolume}
                  className="w-20 cursor-pointer"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
}
