"use client";

import type { TradeInvestmentAccount, TradeInvestmentConfig } from "@/redux/features/trade-investment/tradeInvestmentApi";
import { Clock3, Info, LockKeyhole } from "lucide-react";
import { countdown, investmentProgress } from "./investmentProgress";
import LiveMarketChart from "./LiveMarketChart";

const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 });

export default function InvestmentActivity({ account, config, now, loading, stale }: {
  account?: TradeInvestmentAccount | null;
  config?: TradeInvestmentConfig;
  now: number;
  loading: boolean;
  stale: boolean;
}) {
  const { nextRun, dayProgress } = investmentProgress(now, config?.excludedWeekDays);
  const validRate = Number.isFinite(config?.dailyProfitPercent) && Number(config?.dailyProfitPercent) > 0;
  const rate = validRate ? Math.min(4, Math.max(1, Number(config?.dailyProfitPercent))) : 0;
  const active = !!config?.isActive && account?.status === "active" && account.balance >= config.minAmount;
  const estimate = active && validRate && nextRun ? account.balance * rate / 100 : 0;
  const lockRemaining = Math.max(0, new Date(account?.lockUntil ?? 0).getTime() - now);

  return <>
    <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,1fr)]">
      <LiveMarketChart />
      <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-bold">Daily Profit Estimate</h2><span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Estimate only</span></div>
        <p className="mt-2 text-sm text-white/50">Based on your current balance and selected rate.</p>
        <p className="mt-5 break-words text-3xl font-bold tabular-nums text-emerald-400">{loading || stale ? "—" : money(estimate)} <span className="text-lg">USDT</span></p>
        <p className="mt-1 text-xs text-white/50">Estimated for the next eligible payout · Not yet credited</p>
        {!loading && !stale && !active && <p className="mt-3 text-sm text-amber-300">{config?.isActive ? "Add funds to activate your investment." : "Investment processing is currently paused."}</p>}
        {!loading && !stale && active && !validRate && <p className="mt-3 text-sm text-amber-300">Waiting for a valid daily rate.</p>}
        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="flex justify-between text-sm"><span className="text-white/65">Day completed</span><span className="tabular-nums text-emerald-300">{dayProgress.toFixed(1)}%</span></div>
          <div role="progressbar" aria-label="Day completed in Bangladesh" aria-valuenow={Math.round(dayProgress)} aria-valuemin={0} aria-valuemax={100} className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-500 transition-[width] duration-1000" style={{ width: `${dayProgress}%` }} /></div>
          <p className="mt-2 text-xs text-white/40">Time progress only; profit is not accrued per second.</p>
        </div>
        <div className="mt-5 border-t border-white/10 pt-5">
          <h3 className="flex items-center gap-2 text-sm text-white/75"><Clock3 size={17} className="text-sky-400" /> Next Scheduled Processing</h3>
          <p className="mt-3 text-3xl font-bold tabular-nums tracking-wider text-sky-400">{!loading && !stale && active && validRate && nextRun ? countdown(nextRun - now) : "—"}</p>
          <p className="mt-2 text-sm text-white/60">{nextRun ? new Date(nextRun).toLocaleString("en-US", { timeZone: "Asia/Dhaka", weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }) : "No eligible processing day"}</p>
          <p className="mt-1 text-xs text-white/40">Bangladesh time · Mon–Fri, excluding disabled days</p>
          <p className="mt-3 text-xs text-white/60">{stale ? "Account updates unavailable. Reconnecting…" : "Credit is confirmed only after processing succeeds."}</p>
        </div>
      </section>
    </div>
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-400/15 bg-sky-500/5 p-4 text-xs leading-relaxed text-white/60"><Info size={17} className="mt-0.5 shrink-0 text-sky-400" /><p>Estimates may change when your balance or the admin-selected rate changes. Market movements do not affect this estimate. Your credited profit appears in Transaction History.</p></div>
    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><LockKeyhole size={22} className="shrink-0 text-emerald-400" /><div><h2 className="text-sm text-white/60">Investment Lock</h2><p className="mt-1 font-semibold">{loading ? "Loading…" : lockRemaining > 0 ? `${Math.ceil(lockRemaining / 86400000)} days remaining` : "No active lock"}</p>{lockRemaining > 0 && <p className="mt-1 text-xs text-white/45">Unlocks {new Date(account!.lockUntil!).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} · Bangladesh time</p>}</div></div>
  </>;
}
