"use client";

import { ProgressBar } from "@/components/ProgressBar";
import { RankGrid } from "@/components/rank/RankGrid";
import RankGridSkeleton from "@/components/skeletons/RankGridSkeleton";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { useGetMyRankSummaryQuery } from "@/redux/features/rank/rankApi";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function RankRewardPage() {
  const { data, isLoading, isError, refetch } = useGetMyRankSummaryQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#070A12] text-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10">
          <RankGridSkeleton />
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#070A12] text-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10">
          <ErrorState
            title="Failed to load"
            subtitle="We could not fetch your rank and reward data."
            retryLabel="Reload"
            onRetry={() => refetch()}
          />
        </section>
      </main>
    );
  }

  if (!data || data.ranks.length === 0) {
    return (
      <main className="min-h-screen bg-[#070A12] text-white">
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10">
          <EmptyState
            title="No ranks yet"
            subtitle="Build your team volume to unlock your first rank."
            actionLabel="Go to Dashboard"
            onAction={() => (window.location.href = "/dashboard")}
          />
        </section>
      </main>
    );
  }

  const teamVolume = data.overall.teamVolume;
  const nextTier = data.ranks.find((r) => !r.qualified);

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Rank &amp; Reward</h1>
            <p className="mt-1 text-sm text-white/60">
              Rewards unlock as your total team investment volume grows.
            </p>
          </div>

          <div className="w-full sm:w-96">
            <div className="mb-2 flex justify-between text-xs text-white/60">
              <span>Total team volume</span>
              <span>
                {usd(teamVolume)}
                {nextTier ? ` / ${usd(nextTier.targetVolume)}` : ""}
              </span>
            </div>
            <ProgressBar
              value={nextTier ? teamVolume : 1}
              max={nextTier ? nextTier.targetVolume || 1 : 1}
            />
            {nextTier && (
              <p className="mt-1 text-[11px] text-white/50">
                {usd(nextTier.progress.remaining)} left to reach {nextTier.name}
              </p>
            )}
          </div>
        </header>

        {/* Per-level breakdown */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="mb-3 text-sm font-semibold text-white/80">Team Volume by Level</h2>
          {data.levels.length === 0 ? (
            <p className="text-sm text-white/50">No team volume yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-white/50">
                  <tr>
                    <th className="py-2">Level</th>
                    <th>Members</th>
                    <th>Volume</th>
                    <th>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.levels.map((l) => (
                    <tr key={l.level} className="border-t border-white/10">
                      <td className="py-2">Level {l.level}</td>
                      <td>{l.members}</td>
                      <td>{usd(l.volume)}</td>
                      <td>{Math.round(l.pct * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6">
          <RankGrid items={data.ranks} />
        </div>
      </section>
    </main>
  );
}
