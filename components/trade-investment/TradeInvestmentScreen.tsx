"use client";

import {
  useCancelTradeInvestmentMutation,
  useGetMyTradeInvestmentQuery,
  useTransferFromTradeInvestmentMutation,
  useTransferToTradeInvestmentMutation,
} from "@/redux/features/trade-investment/tradeInvestmentApi";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  LockKeyhole,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StatCard from "./StatCard";

const fmt = (v: number) =>
  `${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 8 })} USDT`;
const toDate = (v?: string) => (v ? new Date(v).toLocaleString() : "No lock");

const LOG_LABEL: Record<string, string> = {
  transfer_in: "Deposit",
  transfer_out: "Withdraw",
  profit: "Daily Profit",
  generation_bonus: "Referral Bonus",
  company_cut: "Company",
  cancel: "Cancelled",
};

export default function TradeInvestmentScreen() {
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading } = useGetMyTradeInvestmentQuery();
  const [transferIn, inState] = useTransferToTradeInvestmentMutation();
  const [transferOut, outState] = useTransferFromTradeInvestmentMutation();
  const [cancelInvestment, cancelState] = useCancelTradeInvestmentMutation();
  const [amount, setAmount] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);

  const account = data?.account;
  const config = data?.config;

  // Referral bonus rows are upline income and are not shown on the investor's own history.
  const logs = (data?.logs ?? []).filter((log) => log.type !== "generation_bonus");

  const locked = useMemo(() => {
    if (!account?.lockUntil) return false;
    return new Date(account.lockUntil).getTime() > Date.now();
  }, [account?.lockUntil]);

  const canCancel = !!account && account.status !== "cancelled" && (account.balance || 0) > 0 && !locked;
  const cancelCharge = useMemo(() => {
    const pct = Number(config?.cancelChargePercent ?? 0);
    return Number(account?.balance || 0) * (pct / 100);
  }, [account?.balance, config?.cancelChargePercent]);

  const submitIn = async () => {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return toast.error("Enter a valid amount");
    try {
      await toast.promise(transferIn({ amount: n }).unwrap(), {
        loading: "Processing...",
        success: "QX Investment activated",
        error: (e: any) => e?.data?.message || "Transfer failed",
      });
      setAmount("");
    } catch {}
  };

  const submitOut = async () => {
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return toast.error("Enter a valid amount");
    try {
      await toast.promise(transferOut({ amount: n }).unwrap(), {
        loading: "Processing...",
        success: "Transferred to main balance",
        error: (e: any) => e?.data?.message || "Transfer failed",
      });
      setAmount("");
    } catch {}
  };

  const submitCancel = async () => {
    try {
      await toast.promise(cancelInvestment().unwrap(), {
        loading: "Cancelling...",
        success: "Investment cancelled",
        error: (e: any) => e?.data?.message || "Cancel failed",
      });
      setConfirmCancel(false);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0f141b] px-3 py-5 text-white md:px-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-white/5 p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-emerald-300">QX Investment</p>
            <h1 className="mt-1 text-2xl font-black">Daily profit investment</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              Start from {config?.minAmount ?? 10} USDT. Your principal stays locked for{" "}
              {config?.lockDays ?? 7} days. Daily profit between 1% and 4% is credited to your
              main balance by the admin.
            </p>
          </div>
          <div
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              account?.status === "active"
                ? "bg-emerald-500/20 text-emerald-300"
                : account?.status === "cancelled"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            {account?.status ?? "inactive"}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Main Balance" value={fmt(user?.m_balance || 0)} tone="blue" />
        <StatCard label="Investment Balance" value={fmt(account?.balance || 0)} tone="green" />
        <StatCard label="Daily Profit Rate" value="1% - 4%" tone="amber" />
        <StatCard label="Total Profit" value={fmt(account?.totalUserProfit || 0)} />
      </div>

      {/* Transfer */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2 text-lg font-bold">
          <TrendingUp size={20} /> Manage Investment
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
            <ArrowDownToLine size={18} /> Add to Investment
          </button>
          <button
            onClick={submitOut}
            disabled={locked || outState.isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-bold text-black disabled:opacity-50"
          >
            <ArrowUpFromLine size={18} /> Withdraw to Main
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/55">
          <span className="flex items-center gap-2">
            <LockKeyhole size={14} /> Lock Until: {toDate(account?.lockUntil)}
          </span>
          <button
            onClick={() => setConfirmCancel(true)}
            disabled={!canCancel}
            className="flex items-center gap-1 rounded-lg border border-red-400/40 px-3 py-1.5 font-semibold text-red-300 disabled:opacity-40"
          >
            <XCircle size={14} /> Cancel Investment
          </button>
        </div>
        {locked && (
          <p className="mt-2 text-xs text-amber-300">
            Withdraw and cancel are disabled until the lock period ends.
          </p>
        )}
      </div>

      {/* Referral rewards */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
        <h2 className="mb-3 text-lg font-bold text-white">Multi-Level Referral Rewards</h2>
        <p>Earn a share of your team&apos;s daily profit across {config?.levelPercents?.length ?? 5} levels.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(config?.levelPercents ?? [25, 15, 10, 5, 3]).map((x, i) => (
            <span
              key={i}
              className="rounded-lg border border-white/10 bg-black/20 px-3 py-1 text-xs"
            >
              Level {i + 1}: <b className="text-emerald-300">{x}%</b>
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/45">
          To earn referral rewards your own investment must be active in the pool.
        </p>
      </div>

      {/* History */}
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <h2 className="mb-3 text-lg font-bold">Transaction History</h2>
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
                  <th>Rate</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-t border-white/10">
                    <td className="py-3">{new Date(log.createdAt).toLocaleString()}</td>
                    <td>{LOG_LABEL[log.type] ?? log.type}</td>
                    <td>{fmt(log.amount)}</td>
                    <td>{log.percentSnapshot ? `${log.percentSnapshot}%` : "-"}</td>
                    <td className="text-white/55">{log.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cancel confirm modal */}
      {confirmCancel && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141a22] p-5">
            <h3 className="text-lg font-bold">Cancel QX Investment?</h3>
            <p className="mt-2 text-sm text-white/60">
              A {config?.cancelChargePercent ?? 0}% cancellation charge applies. You will get
              back approximately <b className="text-emerald-300">{fmt(Math.max(0, (account?.balance || 0) - cancelCharge))}</b>{" "}
              (charge {fmt(cancelCharge)}) to your main balance.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancel(false)}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm"
              >
                Keep it
              </button>
              <button
                onClick={submitCancel}
                disabled={cancelState.isLoading}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
