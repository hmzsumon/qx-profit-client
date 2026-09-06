/* ────────── Smart dashboard home ──────────
   Balance + copyable ID, quick actions, live stats, then the daily
   video below.
   ───────────────────────────────────────── */

"use client";

import AnnouncementBanner from "@/components/announcements/AnnouncementBanner";
import DailyVideoHistory from "@/components/dashboard/DailyVideoHistory";
import DailyVideoPlayer from "@/components/dashboard/DailyVideoPlayer";
import KycStatusChip from "@/components/kyc/KycStatusChip";
import Avatar from "@/components/ui/Avatar";
import { formatBalance } from "@/lib/functions";
import { useGetDailyVideosQuery } from "@/redux/features/daily-video/dailyVideoApi";
import { useGetProfitLeaderboardQuery } from "@/redux/features/leaderboard/leaderboardApi";
import { useGetMyRankSummaryQuery } from "@/redux/features/rank/rankApi";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Copy,
  Eye,
  EyeOff,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const usd = (v: number) =>
  `$${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const QUICK_ACTIONS = [
  { label: "Deposit", href: "/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/withdraw", icon: ArrowUpFromLine },
  { label: "QX Investment", href: "/trade-investment", icon: TrendingUp },
  { label: "Profit Ranking", href: "/profit-ranking", icon: Trophy },
];

export default function DashboardHome() {
  const { user } = useSelector((s: any) => s.auth);
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: videoData, isLoading: videoLoading, isError: videoError } =
    useGetDailyVideosQuery();
  const videos = videoData?.videos ?? [];
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    if (videos.length && !videos.some((v) => v._id === activeId)) {
      setActiveId(videos[0]._id);
    }
  }, [videos, activeId]);
  const activeVideo = videos.find((v) => v._id === activeId) ?? videos[0];

  const { data: rank } = useGetMyRankSummaryQuery();
  const { data: board } = useGetProfitLeaderboardQuery();

  const balance = Number(user?.m_balance ?? 0);
  const customerId = user?.customerId ?? "";
  const teamVolume = rank?.overall?.teamVolume ?? 0;
  const currentRank =
    [...(rank?.ranks ?? [])].reverse().find((r) => r.qualified)?.name ?? "—";
  const myProfit = board?.me?.profit ?? 0;
  const myProfitRank = board?.me?.rank ?? null;

  const copyId = async () => {
    if (!customerId) return;
    try {
      await navigator.clipboard.writeText(customerId);
      setCopied(true);
      toast.success("ID copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0b0e11] pb-24 pt-5 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-5 px-1 sm:px-3">
        {/* greeting */}
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar} name={user?.name} size={44} />
          <div className="min-w-0">
            <p className="text-xs text-white/50">Welcome back</p>
            <p className="truncate text-sm font-semibold">
              {user?.name || "Trader"}
            </p>
            <div className="mt-1">
              <KycStatusChip />
            </div>
          </div>
        </div>

        <AnnouncementBanner />

        {/* balance card */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#12203a] to-[#0e1626] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">Main balance</p>
            <button
              onClick={() => setHidden((v) => !v)}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label={hidden ? "Show balance" : "Hide balance"}
            >
              {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="mt-1 text-3xl font-bold tracking-tight">
            {hidden ? "••••••" : formatBalance(balance)}
            <span className="ml-1.5 text-sm font-medium text-white/50">USDT</span>
          </div>

          {customerId ? (
            <button
              onClick={copyId}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
            >
              ID: <span className="font-semibold text-white">{customerId}</span>
              {copied ? (
                <Check size={13} className="text-[#12b76a]" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          ) : null}

          <div className="mt-4 flex gap-2">
            <Link
              href="/deposit"
              className="flex-1 rounded-lg bg-[#2E7DF6] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#1E6FE0]"
            >
              Deposit
            </Link>
            <Link
              href="/withdraw"
              className="flex-1 rounded-lg border border-white/15 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/5"
            >
              Withdraw
            </Link>
          </div>
        </section>

        {/* quick actions */}
        <section className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3 text-center hover:bg-white/[0.07]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E7DF6]/15 text-[#5AA2FF]">
                <a.icon size={18} />
              </span>
              <span className="text-[11px] font-medium text-white/80">
                {a.label}
              </span>
            </Link>
          ))}
        </section>

        {/* stat chips */}
        <section className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/50">QX Invest. profit</p>
            <p className="mt-1 text-sm font-bold text-[#12b76a]">
              {usd(myProfit)}
            </p>
            {myProfitRank && (
              <p className="text-[10px] text-white/40">Rank #{myProfitRank}</p>
            )}
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/50">Team volume</p>
            <p className="mt-1 text-sm font-bold text-white">{usd(teamVolume)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/50">Current rank</p>
            <p className="mt-1 text-sm font-bold text-white">{currentRank}</p>
          </div>
        </section>

        {/* daily video */}
        <section className="rounded-2xl border border-white/10 bg-[#111418] p-2 sm:p-3">
          <h2 className="mb-3 px-1 text-sm font-semibold">Daily video</h2>

          {videoLoading && (
            <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-800" />
          )}

          {!videoLoading && (videoError || videos.length === 0) && (
            <p className="py-8 text-center text-sm text-neutral-400">
              No video available yet. Check back soon.
            </p>
          )}

          {!videoLoading && activeVideo && (
            <div className="space-y-4">
              <DailyVideoPlayer video={activeVideo} />
              <DailyVideoHistory
                videos={videos}
                activeId={activeVideo._id}
                onSelect={(v) => setActiveId(v._id)}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
