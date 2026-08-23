"use client";

import {
  useGetMyTradeInvestmentQuery,
  useTransferFromTradeInvestmentMutation,
  useTransferToTradeInvestmentMutation,
} from "@/redux/features/trade-investment/tradeInvestmentApi";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  LockKeyhole,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StatCard from "./StatCard";

const fmt = (v: number) =>
  `${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 8 })} USDT`;
const toDate = (v?: string) => (v ? new Date(v).toLocaleString() : "No lock");

export default function TradeInvestmentScreen() {
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetMyTradeInvestmentQuery();
  const [transferIn, inState] = useTransferToTradeInvestmentMutation();
  const [transferOut, outState] = useTransferFromTradeInvestmentMutation();
  const [amount, setAmount] = useState("");
  const account = data?.account;
  const config = data?.config;
  // ────────── Own Investment History Only ──────────
  // Generation bonus হলো upline/leader income।
  // তাই user-এর Trade Investment history table-এ এটা দেখানো হবে না।
  const logs = (data?.logs ?? []).filter(
    (log) => log.type !== "generation_bonus",
  );

  const canWithdraw = useMemo(() => {
    if (!account?.lockUntil) return true;
    return new Date(account.lockUntil).getTime() <= Date.now();
  }, [account?.lockUntil]);

  const submitIn = async () => {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return toast.error("Enter valid amount");
    try {
      await toast.promise(transferIn({ amount: n }).unwrap(), {
        loading: "Transferring...",
        success: "Trade Investment activated ✅",
        error: (e: any) => e?.data?.message || "Transfer failed",
      });
      setAmount("");
    } catch {}
  };

  const submitOut = async () => {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return toast.error("Enter valid amount");
    try {
      await toast.promise(transferOut({ amount: n }).unwrap(), {
        loading: "Transferring...",
        success: "Transferred to main balance ✅",
        error: (e: any) => e?.data?.message || "Transfer failed",
      });
      setAmount("");
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0f141b] px-3 py-5 text-white md:px-6">
      {/* ────────── Header Section ────────── */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-white/5 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-emerald-300">Trade Investment</p>
            <h1 className="mt-1 text-2xl font-black">
              Smart weekly profit investment
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Minimum {config?.minAmount ?? 10} USDT দিয়ে start করুন। Balance
              lock থাকবে {config?.lockDays ?? 7} দিন। শনিবার ও রবিবার ছাড়া
              active balance এর উপর daily profit auto add হবে।
            </p>
          </div>
          <div
            className={`rounded-full px-3 py-1 text-xs font-bold ${account?.status === "active" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}`}
          >
            {account?.status ?? "inactive"}
          </div>
        </div>
      </div>

      {/* ────────── Summary Cards ────────── */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Main Balance"
          value={fmt(user?.m_balance || 0)}
          tone="blue"
        />
        <StatCard
          label="Investment Balance"
          value={fmt(account?.balance || 0)}
          tone="green"
        />
        <StatCard
          label="Daily Profit Rate"
          value={`${config?.dailyProfitPercent ?? 1}%`}
          tone="amber"
        />
        <StatCard
          label="Total Profit"
          value={fmt(account?.totalUserProfit || 0)}
        />
      </div>

      {/* ────────── Transfer Box ────────── */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2 text-lg font-bold">
          <TrendingUp size={20} /> Transfer Balance
        </div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder={`Minimum ${config?.minAmount ?? 10} USDT`}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-emerald-400"
        />
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={submitIn}
            disabled={inState.isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-black disabled:opacity-60"
          >
            <ArrowDownToLine size={18} /> Main to Investment
          </button>
          <button
            onClick={submitOut}
            disabled={!canWithdraw || outState.isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-bold text-black disabled:opacity-50"
          >
            <ArrowUpFromLine size={18} /> Investment to Main
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-white/55">
          <LockKeyhole size={14} /> Lock Until: {toDate(account?.lockUntil)}
        </div>
      </div>

      {/* ────────── Profit Rules ────────── */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
        <h2 className="mb-3 text-lg font-bold text-white">
          Profit Distribution
        </h2>
        <p>
          User Profit:{" "}
          <b className="text-emerald-300">{config?.userProfitPercent ?? 60}%</b>{" "}
          · Generation Bonus Pool:{" "}
          <b className="text-sky-300">{config?.teamBonusPercent ?? 35}%</b> ·
          Company:{" "}
          <b className="text-amber-300">{config?.companyPercent ?? 5}%</b>
        </p>
        <p className="mt-2">
          Level Bonus:{" "}
          {(config?.levelPercents ?? [40, 30, 15, 10, 5])
            .map((x, i) => `L${i + 1} ${x}%`)
            .join(" · ")}
        </p>
      </div>

      {/* ────────── History Table ────────── */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-lg font-bold">Trade Investment History</h2>
        {isLoading ? (
          <p className="text-white/50">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-white/50">No history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-white/50">
                <tr>
                  <th className="py-2">Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Gross</th>
                  <th>Rate</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-t border-white/10">
                    <td className="py-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="capitalize">
                      {log.type.replace(/_/g, " ")}
                    </td>
                    <td>{fmt(log.amount)}</td>
                    <td>{log.grossProfit ? fmt(log.grossProfit) : "-"}</td>
                    <td>
                      {log.percentSnapshot ? `${log.percentSnapshot}%` : "-"}
                    </td>
                    <td className="text-white/55">{log.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
