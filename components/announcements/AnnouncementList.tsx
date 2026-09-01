"use client";

import { useGetAnnouncementsQuery } from "@/redux/features/announcement/announcementApi";
import { useEffect } from "react";
import AnnouncementCard from "./AnnouncementCard";

export default function AnnouncementList() {
  const { data, isLoading } = useGetAnnouncementsQuery();
  const items = data?.items ?? [];

  // Visiting the page clears the "unseen" badge.
  useEffect(() => {
    if (items[0]?.createdAt) {
      try {
        localStorage.setItem("announcements_seen_at", items[0].createdAt);
      } catch {}
    }
  }, [items]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-xl font-bold text-white">Announcements</h1>
      {isLoading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-500">No announcements yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <AnnouncementCard key={a._id} item={a} />
          ))}
        </div>
      )}
    </div>
  );
}
