"use client";

import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState, ErrorState, InlineLoader } from "@/components/ui/States";
import {
  useClaimRankMutation,
  useGetMyRankSummaryQuery,
} from "@/redux/features/rank/rankApi";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function RankDetails({ params }: { params: { rank: string } }) {
  const { data, isLoading, isError, refetch } = useGetMyRankSummaryQuery();
  const [claim, { isLoading: claiming }] = useClaimRankMutation();
  const [msg, setMsg] = useState<string | null>(null);

  const item = useMemo(
    () => data?.ranks.find((r) => r.key === params.rank),
    [data, params.rank],
  );
  useEffect(() => setMsg(null), [params.rank]);

  if (isLoading) return <InlineLoader label="Loading rank details..." />;
  if (isError)
    return (
      <ErrorState
        title="Failed to load"
        subtitle="Please check your connection and try again."
        onRetry={() => refetch()}
      />
    );
  if (!data)
    return (
      <ErrorState
        title="Missing data"
        subtitle="No response received from server."
        onRetry={() => refetch()}
      />
    );
  if (!item)
    return (
      <EmptyState title="Rank not found" subtitle="The requested rank does not exist." />
    );

  const { teamVolume, target, remaining, overall } = item.progress;

  async function onClaim() {
    setMsg(null);
    if (!item) return;
    try {
      const res = await claim({ key: item.key }).unwrap();
      setMsg(res.message ?? `Reward ${usd(item.rewardUsd)} claimed`);
      await refetch();
    } catch (e: any) {
      setMsg(e?.data?.message ?? "Failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <Link href="/rank-reward" className="text-sm text-blue-400 hover:underline">
          &larr; Back to all ranks
        </Link>

        <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0C1222] to-[#0B0F1A] p-6">
          <h1 className="text-2xl font-bold">{item.name} Rank</h1>
          <p className="mt-1 text-white/70">
            {item.qualified
              ? item.claimed
                ? "Already claimed."
                : "You are qualified — claim your reward."
              : "Keep growing your team volume to qualify."}
          </p>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-white/60">
              <span>Total Team Volume</span>
              <span>
                {usd(teamVolume)} / {usd(target)}
              </span>
            </div>
            <ProgressBar value={teamVolume} max={target || 1} />
            <p className="mt-2 text-xs text-white/60">
              {remaining <= 0 ? "Target met" : `${usd(remaining)} more team volume needed`} · Overall {overall}%
            </p>
          </div>

          {data.levels.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              Reward on completion:{" "}
              <span className="font-semibold text-white">{usd(item.rewardUsd)}</span>
            </div>
            <button
              onClick={onClaim}
              disabled={!item.qualified || item.claimed || claiming}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {claiming ? "Processing..." : item.claimed ? "Claimed" : item.qualified ? "Get Reward" : "Not Qualified"}
            </button>
          </div>

          {msg && <p className="mt-3 text-sm text-white/80">{msg}</p>}
          {item.claimedAt && (
            <p className="mt-1 text-xs text-white/60">
              Claimed at: {new Date(item.claimedAt).toLocaleString()}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
