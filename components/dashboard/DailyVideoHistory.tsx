"use client";

import type { DailyVideo } from "@/redux/features/daily-video/dailyVideoApi";
import { PlayCircle } from "lucide-react";

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

export default function DailyVideoHistory({
  videos,
  activeId,
  onSelect,
}: {
  videos: DailyVideo[];
  activeId: string;
  onSelect: (v: DailyVideo) => void;
}) {
  if (videos.length <= 1) return null;

  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
        Recent days
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {videos.map((v) => {
          const active = v._id === activeId;
          return (
            <button
              key={v._id}
              onClick={() => onSelect(v)}
              className={`group relative w-40 shrink-0 overflow-hidden rounded-xl border text-left ${
                active
                  ? "border-emerald-500"
                  : "border-neutral-800 hover:border-neutral-600"
              }`}
            >
              <div className="relative aspect-video w-full bg-neutral-900">
                {v.posterUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.posterUrl}
                    alt={v.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-600">
                    <PlayCircle size={26} />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="line-clamp-1 text-xs font-medium text-white">
                  {v.title}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {fmtDate(v.publishDate)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
