"use client";

import type { Announcement } from "@/redux/features/announcement/announcementApi";
import { useState } from "react";

const fmt = (s: string) =>
  new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function AnnouncementCard({ item }: { item: Announcement }) {
  const [zoom, setZoom] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
        <span className="text-[11px] text-neutral-500">
          {fmt(item.createdAt)}
        </span>
      </div>
      {item.message && (
        <p className="mt-1 whitespace-pre-line text-sm text-neutral-300">
          {item.message}
        </p>
      )}
      {item.imageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            onClick={() => setZoom(true)}
            className="mt-3 max-h-72 w-full cursor-zoom-in rounded-xl object-cover"
          />
          {zoom && (
            <div
              onClick={() => setZoom(false)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
