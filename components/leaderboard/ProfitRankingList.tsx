/* ────────── Profit ranking — list + podium ────────── */
"use client";

import Avatar from "@/components/ui/Avatar";
import type { ProfitRankRow } from "@/redux/features/leaderboard/leaderboardApi";
import RankRow from "./RankRow";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const PODIUM_STYLE: Record<number, string> = {
  1: "order-2 -mt-4 border-[#F5B544]/60",
  2: "order-1 border-[#C7CFDB]/50",
  3: "order-3 border-[#E0995B]/50",
};

function PodiumCard({ row }: { row: ProfitRankRow }) {
  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-2xl border bg-white/[0.03] px-3 py-4 text-center ${
        PODIUM_STYLE[row.rank] || ""
      }`}
    >
      <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
        {row.rank}
      </span>
      <Avatar src={row.avatar} name={row.name} size={56} />
      <p className="mt-2 line-clamp-1 text-xs font-semibold text-white">
        {row.name}
      </p>
      <p className="mt-1 text-sm font-bold text-[#12b76a]">{usd(row.profit)}</p>
    </div>
  );
}

export default function ProfitRankingList({
  data,
}: {
  data: { top: ProfitRankRow[]; me: { rank: number; profit: number } | null };
}) {
  const podium = data.top.slice(0, 3);
  const rest = data.top.slice(3);

  return (
    <div className="space-y-5">
      {podium.length > 0 && (
        <div className="flex items-end gap-3">
          {podium.map((r) => (
            <PodiumCard key={r.rank} row={r} />
          ))}
        </div>
      )}

      <div className="space-y-2">
        {rest.map((r) => (
          <RankRow key={r.rank} row={r} />
        ))}
      </div>

      {data.me && !data.top.some((r) => r.isMe) && (
        <div className="space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            Your position
          </p>
          <RankRow
            row={{
              rank: data.me.rank,
              name: "You",
              avatar: "",
              profit: data.me.profit,
              isMe: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
