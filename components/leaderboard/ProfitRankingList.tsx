/* ────────── Top Investment — list ────────── */
"use client";

import type { ProfitLeaderboard } from "@/redux/features/leaderboard/leaderboardApi";
import RankRow from "./RankRow";

export default function ProfitRankingList({ data }: { data: ProfitLeaderboard }) {
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
            Your ranking
          </p>
          <RankRow
            row={{
              rank: data.me.rank ?? 0,
              name: "You",
              avatar: "",
              country: "",
              investment: data.me.investment,
              isMe: true,
            }}
            rankLabel={data.me.rank == null ? "20+" : undefined}
          />
        </div>
      )}
    </div>
  );
}
