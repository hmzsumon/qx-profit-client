"use client";

import type { DailyVideo } from "@/redux/features/daily-video/dailyVideoApi";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function DailyVideoPlayer({ video }: { video: DailyVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

  // Restart playback whenever the source changes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setNeedsTap(false);
    el.load();
    el.play().catch(() => setNeedsTap(true));
  }, [video.url]);

  const tapToPlay = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = false;
    setMuted(false);
    el.play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true));
  };

  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-white">{video.title}</h1>
        <p className="text-xs text-neutral-400">{fmtDate(video.publishDate)}</p>
      </div>

      <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-neutral-800 bg-black">
        <video
          ref={ref}
          src={video.url}
          poster={video.posterUrl}
          controls
          playsInline
          muted={muted}
          preload="metadata"
          className="block max-h-[78vh] w-auto max-w-full bg-black"
        />

        {needsTap && (
          <button
            onClick={tapToPlay}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-white"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Play size={28} className="ml-1" />
            </span>
            <span className="text-sm font-medium">Tap to play</span>
          </button>
        )}

        {!needsTap && (
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>

      {video.description && (
        <p className="mt-3 whitespace-pre-line text-sm text-neutral-300">
          {video.description}
        </p>
      )}
    </div>
  );
}
