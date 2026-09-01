/* Rank tier card driven by live team-volume progress. */
"use client";

import { ProgressBar } from "@/components/ProgressBar";
import type { RankSummaryItem } from "@/types/rank";
import { Trophy } from "lucide-react";
import Link from "next/link";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

function tierColor(order: number) {
  const palette = [
    "from-orange-500 to-amber-600",
    "from-slate-400 to-slate-500",
    "from-yellow-500 to-amber-500",
    "from-cyan-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-fuchsia-500 to-violet-600",
  ];
  return palette[(order - 1 + palette.length) % palette.length] ?? palette[0];
}

export function RankCard({ item }: { item: RankSummaryItem }) {
  const color = tierColor(item.sortOrder);
  const { teamVolume, target, remaining, overall } = item.progress;

  return (
    <div className="relative rounded-2xl border border-white/12 bg-gradient-to-br from-[#0B0F19] to-[#0A0D16] p-5 shadow-[0_1px_10px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-[1px]">
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr ${color}`}
        style={{ opacity: 0.08 }}
        aria-hidden
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr ${color} text-white/95`}
            >
              <Trophy size={18} />
            </div>
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
          </div>
          <span className="text-[11px] tracking-wide text-white/65">Reward {usd(item.rewardUsd)}</span>
        </div>

        <p className="mt-2 text-[13px] leading-5 text-white/75">
          {item.claimed
            ? "Reward claimed."
            : item.qualified
              ? "Qualified — claim your reward."
              : "Grow your team volume to unlock this tier."}
        </p>

        <div className="mt-4 space-y-2">
          <div className="mb-1 flex justify-between text-[11px] text-white/60">
            <span>Team Volume</span>
            <span>
              {usd(teamVolume)} / {usd(target)}
            </span>
          </div>
          <ProgressBar value={teamVolume} max={target || 1} />
          <div className="flex justify-between text-[11px] text-white/65">
            <span>Overall {overall}%</span>
            <span>{remaining > 0 ? `${usd(remaining)} left` : "Target met"}</span>
          </div>
        </div>

        <Link
          href={`/rank-reward/${item.key}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
