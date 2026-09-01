"use client";

import {
  useConfirmBinanceDepositMutation,
  useDepositWithBinanceMutation,
  useGetBinancePayInfoQuery,
} from "@/redux/features/deposit/depositApi";
import { Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

export default function BinancePaymentPage() {
  const router = useRouter();
  const { data: info } = useGetBinancePayInfoQuery();
  const receiverId = info?.receiverId || "";

  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [confirmOrderId, setConfirmOrderId] = useState("");
  const [pendingDepositId, setPendingDepositId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [depositWithBinance, { isLoading }] = useDepositWithBinanceMutation();
  const [confirmBinanceDeposit, { isLoading: isConfirming }] =
    useConfirmBinanceDepositMutation();

  const submit = async () => {
    const amt = Number(amount);
    if (!amount || !orderId.trim())
      return toast.error("Amount and Binance Order ID are required");
    if (!Number.isFinite(amt) || amt <= 0)
      return toast.error("Enter a valid amount");
    try {
      const res = await depositWithBinance({
        amount: amt,
        orderId: orderId.trim(),
      }).unwrap();

      if (res?.autoApproved) {
        toast.success(res?.message || "Deposit approved");
        router.push("/deposit-history");
        return;
      }
      setPendingDepositId(res?.deposit?._id || "");
      setConfirmOrderId(orderId.trim());
      setModalOpen(true);
      toast.success(res?.message || "Request created. Please confirm payment.");
    } catch (e: any) {
      toast.error(e?.data?.error || e?.data?.message || "Submit failed");
    }
  };

  const confirm = async () => {
    if (!pendingDepositId) return toast.error("Pending deposit not found");
    if (confirmOrderId.trim() !== orderId.trim())
      return toast.error("Order ID does not match");
    try {
      const res = await confirmBinanceDeposit({
        depositId: pendingDepositId,
        orderId: confirmOrderId.trim(),
      }).unwrap();
      toast.success(res?.message || "Deposit approved");
      setModalOpen(false);
      router.push("/deposit-history");
    } catch (e: any) {
      toast.error(e?.data?.error || e?.data?.message || "Confirmation failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0e11] text-white">
      <div className="mx-auto w-full max-w-md px-4 py-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300"
          >
            <FiArrowLeft />
          </button>
          <Link
            href="/deposit-history"
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-neutral-950"
          >
            History
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-lg font-bold uppercase tracking-[0.14em] text-[#F0B90B]">
            Binance Pay
          </span>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
          <h1 className="text-center text-sm text-neutral-300">
            Scan with the Binance app to pay
          </h1>

          <div className="mt-5 flex justify-center">
            <div className="rounded-xl bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/deposit/binance-qr.png"
                alt="Binance Pay QR"
                className="h-[220px] w-[220px] object-contain"
              />
            </div>
          </div>

          {receiverId && (
            <button
              onClick={() => {
                navigator.clipboard?.writeText(receiverId).catch(() => {});
                toast.success("Binance ID copied");
              }}
              className="mx-auto mt-3 flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300"
            >
              Binance Pay ID: <span className="font-semibold">{receiverId}</span>
              <Copy size={13} />
            </button>
          )}

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                Amount (USDT)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the exact amount you paid"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-neutral-600"
              />
              <p className="mt-1 text-[11px] text-neutral-500">
                Pay the exact amount, then submit your Binance Order ID.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                Binance Order ID
              </label>
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Paste the Binance Order ID"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-neutral-600"
              />
            </div>

            <div className="rounded-xl border border-[#F0B90B]/20 bg-[#F0B90B]/10 px-4 py-3 text-xs leading-5 text-neutral-200">
              <span className="font-semibold text-[#F0B90B]">Note:</span> After
              paying in the Binance app, copy the Order ID from the payment
              receipt and submit it here. Your balance is credited automatically
              once the payment is verified.
            </div>

            <button
              onClick={submit}
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-xl bg-[#F0B90B] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-black disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing…
                </>
              ) : (
                "Submit payment"
              )}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
            <h2 className="text-center text-base font-extrabold uppercase tracking-[0.12em] text-[#F0B90B]">
              Confirm payment
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-neutral-300">
              Your deposit request was created. Enter the same Binance Order ID
              again to confirm.
            </p>
            <input
              value={confirmOrderId}
              onChange={(e) => setConfirmOrderId(e.target.value)}
              placeholder="Enter Binance Order ID again"
              className="mt-4 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-neutral-600"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-bold text-neutral-300"
              >
                Later
              </button>
              <button
                onClick={confirm}
                disabled={isConfirming}
                className="flex-1 rounded-xl bg-[#F0B90B] px-4 py-2.5 text-sm font-extrabold text-black disabled:opacity-60"
              >
                {isConfirming ? "Confirming…" : "Confirm payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
