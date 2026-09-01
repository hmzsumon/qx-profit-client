"use client";

import { useGetAnnouncementsQuery } from "@/redux/features/announcement/announcementApi";
import { Megaphone } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const { data } = useGetAnnouncementsQuery();
  const latest = data?.items?.[0];
  if (!latest) return null;

  return (
    <Link
      href="/announcements"
      className="flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3"
    >
      {latest.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={latest.imageUrl}
          alt=""
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-sky-500/20 text-sky-300">
          <Megaphone size={18} />
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">
          {latest.title}
        </p>
        {latest.message && (
          <p className="truncate text-xs text-neutral-300">{latest.message}</p>
        )}
      </div>
    </Link>
  );
}
