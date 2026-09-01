"use client";

import AnnouncementBanner from "@/components/announcements/AnnouncementBanner";
import DailyVideoHistory from "@/components/dashboard/DailyVideoHistory";
import DailyVideoPlayer from "@/components/dashboard/DailyVideoPlayer";
import { useGetDailyVideosQuery } from "@/redux/features/daily-video/dailyVideoApi";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetDailyVideosQuery();
  const videos = data?.videos ?? [];

  const [activeId, setActiveId] = useState<string | null>(null);

  // Default to the newest video once data arrives.
  useEffect(() => {
    if (videos.length && !videos.some((v) => v._id === activeId)) {
      setActiveId(videos[0]._id);
    }
  }, [videos, activeId]);

  const active = videos.find((v) => v._id === activeId) ?? videos[0];

  return (
    <main className="min-h-screen w-full bg-[#0b0e11] pb-24 pt-6 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4">
        <AnnouncementBanner />

        {isLoading && (
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-40 rounded bg-neutral-800" />
            <div className="aspect-video w-full rounded-2xl bg-neutral-800" />
          </div>
        )}

        {!isLoading && (isError || videos.length === 0) && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-10 text-center">
            <p className="text-sm text-neutral-300">
              No video available yet. Check back soon.
            </p>
          </div>
        )}

        {!isLoading && active && (
          <>
            <DailyVideoPlayer video={active} />
            <DailyVideoHistory
              videos={videos}
              activeId={active._id}
              onSelect={(v) => setActiveId(v._id)}
            />
          </>
        )}
      </div>
    </main>
  );
}
