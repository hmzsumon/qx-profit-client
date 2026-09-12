/* ────────── Profit ranking — list ────────── */
"use client";

import type { ProfitRankRow } from "@/redux/features/leaderboard/leaderboardApi";
import RankRow from "./RankRow";

export default function ProfitRankingList({
  data,
}: {
  data: { top: ProfitRankRow[]; me: { rank: number; profit: number } | null };
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {data.top.map((r) => (
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
              country: "",
              profit: data.me.profit,
              isMe: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
