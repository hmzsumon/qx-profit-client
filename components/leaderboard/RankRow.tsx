/* ────────── Profit ranking — single row ────────── */
"use client";

import Avatar from "@/components/ui/avatar";
import type { ProfitRankRow } from "@/redux/features/leaderboard/leaderboardApi";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const MEDAL: Record<number, string> = {
  1: "bg-[#F5B544] text-[#3a2a00]",
  2: "bg-[#C7CFDB] text-[#232a34]",
  3: "bg-[#E0995B] text-[#3a1e00]",
};

export default function RankRow({ row }: { row: ProfitRankRow }) {
  const medal = MEDAL[row.rank];

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
        row.isMe
          ? "border-[#2E7DF6]/60 bg-[#2E7DF6]/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          medal || "bg-white/10 text-white/70"
        }`}
      >
        {row.rank}
      </span>

      <Avatar src={row.avatar} name={row.name} size={36} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {row.name}
          {row.isMe && (
            <span className="ml-2 rounded-full bg-[#2E7DF6]/20 px-2 py-0.5 text-[10px] font-medium text-[#5AA2FF]">
              You
            </span>
          )}
        </p>
        <p className="text-[11px] text-white/50">QX Investment profit</p>
      </div>

      <span className="shrink-0 text-sm font-bold text-[#12b76a]">
        {usd(row.profit)}
      </span>
    </div>
  );
}
