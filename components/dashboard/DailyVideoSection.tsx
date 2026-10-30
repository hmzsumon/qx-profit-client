"use client";

import { useState } from "react";
import { useGetDailyVideosQuery } from "@/redux/features/daily-video/dailyVideoApi";
import DailyVideoPlayer from "./DailyVideoPlayer";
import DailyVideoHistory from "./DailyVideoHistory";

export default function DailyVideoSection() {
  const { data, isLoading, isError, refetch } = useGetDailyVideosQuery(undefined, {
    pollingInterval: 60_000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const videos = data?.videos ?? [];
  const active = videos.find((video) => video._id === selectedId) ?? videos[0];

  return (
    <section aria-label="Daily videos" className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <h2 className="text-sm font-semibold text-white">Daily videos</h2>
      {isLoading ? <p role="status" className="text-sm text-white/60">Loading videos...</p> :
        isError ? <div role="alert" className="text-sm text-white/60">Could not load videos. <button onClick={() => refetch()} className="text-teal-300 underline">Try again</button></div> :
        active ? <>
          <DailyVideoPlayer key={active._id} video={active} />
          <DailyVideoHistory videos={videos} activeId={active._id} onSelect={(video) => setSelectedId(video._id)} />
        </> : <p className="text-sm text-white/60">No videos published yet.</p>}
    </section>
  );
}