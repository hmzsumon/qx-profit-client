"use client";

import ProfitRankingList from "@/components/leaderboard/ProfitRankingList";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { useGetProfitLeaderboardQuery } from "@/redux/features/leaderboard/leaderboardApi";
import { Trophy } from "lucide-react";

export default function ProfitRankingPage() {
  const { data, isLoading, isError, refetch } = useGetProfitLeaderboardQuery();

  return (
    <main className="min-h-screen w-full bg-[#0b0e11] pb-24 pt-6 text-white">
      <div className="mx-auto w-full max-w-2xl space-y-6 px-1 sm:px-3">
        <header className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E7DF6]/15 text-[#5AA2FF]">
            <Trophy size={20} />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Profit Ranking</h1>
            <p className="text-xs text-white/50">
              Top 20 partners by lifetime QX Investment profit
            </p>
          </div>
        </header>

        {isLoading && (
          <div className="animate-pulse space-y-3">
            <div className="flex gap-3">
              <div className="h-32 flex-1 rounded-2xl bg-neutral-800" />
              <div className="h-36 flex-1 rounded-2xl bg-neutral-800" />
              <div className="h-32 flex-1 rounded-2xl bg-neutral-800" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-neutral-800" />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <ErrorState
            title="Failed to load"
            subtitle="We could not fetch the profit ranking."
            retryLabel="Reload"
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (!data || data.top.length === 0) && (
          <EmptyState
            title="No ranking yet"
            subtitle="Once partners start earning QX Investment profit, the top 20 will appear here."
            actionLabel="Go to Dashboard"
            onAction={() => (window.location.href = "/dashboard")}
          />
        )}

        {!isLoading && !isError && data && data.top.length > 0 && (
          <ProfitRankingList data={data} />
        )}
      </div>
    </main>
  );
}
