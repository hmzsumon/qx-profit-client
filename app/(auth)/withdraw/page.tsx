/* ────────── WithdrawPage (uses SecurityVerifyDrawer + RTK Query) ────────── */

"use client";

import SecurityVerifyDrawer from "@/components/security/SecurityVerifyDrawer";
import { useGetMyKycQuery } from "@/redux/features/auth/authApi";
import {
  useCreateWithdrawRequestMutation,
  useGetWithdrawConfigQuery,
} from "@/redux/features/withdraw/withdrawApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiInfo,
} from "react-icons/fi";
import { useSelector } from "react-redux";

export default function WithdrawPage() {
  const { user } = useSelector((state: any) => state.auth);

  // Create request
  const [createWithdrawRequest, { isLoading: isCreateLoading }] =
    useCreateWithdrawRequestMutation();

  // Admin-configured withdrawal rules
  const { data: cfgRes } = useGetWithdrawConfigQuery();
  const cfg = cfgRes?.config;
  const feePercent = cfg?.feePercent ?? 0;
  const maxWithdraw = cfg?.maxAmount ?? 0; // 0 = unlimited
  const processingTime = cfg?.processingTime ?? "1 minute – 48 hours";
  const withdrawDisabled = cfg ? !cfg.isActive : false;

  // KYC gate
  const { data: kycRes } = useGetMyKycQuery();
  const kycStatus: string =
    kycRes?.kyc?.status ?? kycRes?.data?.status ?? kycRes?.status ?? "draft";
  const needsKyc = (cfg?.requireKyc ?? true) && kycStatus !== "approved";

  // Local form state
  const [amount, setAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [method, setMethod] = useState<"crypto" | "binance">("crypto");
  const [network, setNetwork] = useState<"TRC20" | "BEP20">("TRC20");
  const [amountError, setAmountError] = useState<string>("");

  const isBinance = method === "binance";

  // OTP Drawer
  const [verifyOpen, setVerifyOpen] = useState(false);

  // Derived
  const minWithdraw = cfg?.minAmount ?? 10;
  const feeRate = feePercent / 100;
  const availableBalance = useMemo(
    () => Math.max(0, user?.m_balance || 0),
    [user?.m_balance],
  );

  // admin-configured quick-pick chips (a shortcut — the field is always typeable too)
  const presetAmounts = useMemo(
    () =>
      cfg?.presetAmounts?.length
        ? [...cfg.presetAmounts].sort((a, b) => a - b)
        : [20, 30, 50, 100, 200],
    [cfg?.presetAmounts],
  );
  const topPreset = presetAmounts[presetAmounts.length - 1] ?? 200;

  const withdrawFee = useMemo(() => {
    const n = parseFloat(amount || "0");
    return isNaN(n) ? 0 : +(n * feeRate).toFixed(2);
  }, [amount]);

  const actualReceipt = useMemo(() => {
    const n = parseFloat(amount || "0");
    return isNaN(n) ? 0 : +(n - n * feeRate).toFixed(2);
  }, [amount]);

  // Handlers
  const handleAmountChange = (value: string) => {
    setAmount(value);
    const parsed = parseFloat(value);

    if (!value) return setAmountError("");
    if (isNaN(parsed) || parsed <= 0)
      return setAmountError("Enter a valid amount");
    if (parsed < minWithdraw)
      return setAmountError(`Minimum withdrawal amount is ${minWithdraw} USDT`);
    if (maxWithdraw > 0 && parsed > maxWithdraw)
      return setAmountError(`Maximum withdrawal amount is ${maxWithdraw} USDT`);
    if (parsed > availableBalance)
      return setAmountError("Amount exceeds available balance");

    setAmountError("");
  };

  // preset button click handler
  const handlePresetClick = (value: number) => {
    // ব্যালেন্স যদি কম হয়, কিছু করবে না (সেফটি)
    if (availableBalance < value) return;

    const asString = value.toString();
    handleAmountChange(asString);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !!amountError) {
      toast.error(amountError || `Enter amount (min $${minWithdraw})`);
      return;
    }
    if (!walletAddress) {
      toast.error(
        isBinance
          ? "Please enter your Binance Pay ID / UID"
          : "Please enter your wallet address",
      );
      return;
    }
    if (isBinance && !/^[A-Za-z0-9_-]{6,32}$/.test(walletAddress.trim())) {
      toast.error("Enter a valid Binance Pay ID / UID");
      return;
    }
    if (user?.is_withdraw_block) {
      toast.error("Please contact customer support");
      return;
    }
    if (withdrawDisabled) {
      toast.error("Withdrawals are currently disabled");
      return;
    }
    if (needsKyc) {
      toast.error("Complete KYC verification to withdraw");
      return;
    }

    // open OTP drawer, which sends the code & verifies
    setVerifyOpen(true);
  };

  // Called by drawer after OTP verify success
  const handleRequestWithdraw = () => {
    const payload = {
      amount: parseFloat(amount),
      withdrawAddress: walletAddress.trim(),
      network: isBinance ? "BINANCE_PAY" : network,
      withdrawFee,
      receiptAmount: actualReceipt,
    };

    createWithdrawRequest(payload)
      .unwrap()
      .then(() => {
        toast.success("Withdrawal request created successfully!");
        setAmount("");
        setWalletAddress("");
      })
      .catch((err: any) => {
        toast.error(
          (err as fetchBaseQueryError)?.data?.message ||
            (err as fetchBaseQueryError)?.data?.error ||
            "Unable to create withdraw request",
        );
      });
  };

  const currentAmountNum = parseFloat(amount || "0");

  // UI
  return (
    <div className="min-h-screen bg-neutral-950 px-3 py-5 md:px-6 md:py-8">
      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto w-full max-w-2xl"
      >
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 ring-1 ring-emerald-800/10">
          {/* Header */}
          <div className="relative border-b border-neutral-800 bg-gradient-to-r from-emerald-600 to-cyan-600 p-4 text-neutral-950">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/dashboard"
                className="inline-flex items-center self-start rounded-lg bg-black/10 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-black/20"
              >
                <FiArrowLeft className="mr-2" /> Back
              </Link>

              <h1 className="mx-auto rounded-xl bg-white/20 px-4 py-1 text-center text-base font-extrabold tracking-wide text-white shadow-sm sm:mx-0 sm:text-lg">
                Withdraw USDT
              </h1>

              <div className="hidden w-[88px] sm:block" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
              <span className="inline-flex items-center justify-between gap-2 rounded-full border border-emerald-700/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100 sm:justify-center sm:text-[13px]">
                <span className="inline-flex items-center gap-1">
                  <FiClock className="opacity-90" /> Min:
                </span>
                <strong className="text-white/95">${minWithdraw}</strong>
              </span>

              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100 sm:text-[13px]">
                Fee: <strong className="text-white/95">{feePercent}%</strong>
              </span>

              <span className="col-span-2 inline-flex items-center justify-between gap-2 rounded-full border border-emerald-700/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100 sm:col-span-1 sm:justify-center sm:text-[13px]">
                <span>Available:</span>
                <strong className="text-white/95">
                  ${availableBalance.toFixed(2)}
                </strong>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-200">
                  Amount (USDT)
                </label>

                {/* Preset amount buttons */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {presetAmounts.map((preset) => {
                    const disabled = availableBalance < preset;
                    const isActive = currentAmountNum === preset;

                    return (
                      <button
                        key={preset}
                        type="button"
                        disabled={disabled}
                        onClick={() => handlePresetClick(preset)}
                        className={[
                          "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                          disabled
                            ? "cursor-not-allowed border-neutral-800 text-neutral-500 opacity-60"
                            : isActive
                              ? "border-emerald-600 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-600/40"
                              : "border-neutral-700 bg-neutral-900/70 text-neutral-200 hover:border-neutral-500",
                        ].join(" ")}
                      >
                        {preset === topPreset ? `${preset}+` : preset}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    $
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder={`Enter amount — min ${minWithdraw}, or pick above`}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-9 py-2.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-emerald-600/40"
                    step="0.01"
                    min={minWithdraw}
                  />
                </div>

                {amount && !amountError && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-neutral-300 md:grid-cols-3">
                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-1.5">
                      Fee ({feePercent}%):{" "}
                      <span className="font-semibold text-emerald-300">
                        ${withdrawFee}
                      </span>
                    </div>
                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-1.5">
                      You receive:{" "}
                      <span className="font-semibold text-emerald-300">
                        ${actualReceipt}
                      </span>
                    </div>
                    <div className="col-span-2 hidden rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 md:block">
                      Network: <span className="font-semibold">{network}</span>
                    </div>
                  </div>
                )}

                {!!amountError && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <FiAlertCircle className="mr-1" /> {amountError}
                  </p>
                )}
              </div>

              {/* withdraw method */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-200">
                  Withdrawal method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      ["crypto", "Crypto"],
                      ["binance", "Binance Pay"],
                    ] as const
                  ).map(([key, label]) => {
                    const active = method === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setMethod(key);
                          setWalletAddress("");
                        }}
                        className={[
                          "rounded-xl border px-4 py-2 text-sm transition",
                          active
                            ? "border-emerald-700/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-700/30"
                            : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700",
                        ].join(" ")}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* network (crypto only) */}
              {!isBinance && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-200">
                    Select network
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["TRC20", "BEP20"] as const).map((n) => {
                      const active = network === n;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setNetwork(n)}
                          className={[
                            "rounded-xl border px-4 py-2 text-sm transition",
                            active
                              ? "border-emerald-700/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-700/30"
                              : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700",
                          ].join(" ")}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* destination */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-200">
                  {isBinance
                    ? "Binance Pay ID / UID"
                    : `${network} wallet address`}
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder={
                    isBinance
                      ? "Enter your Binance Pay ID or UID"
                      : `Paste ${network} address`
                  }
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-3 py-2.5 font-mono text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-emerald-600/40"
                  required
                />
                {isBinance && (
                  <p className="mt-1.5 flex items-start gap-1 text-xs text-yellow-400">
                    <FiInfo className="mt-0.5 shrink-0" />
                    Use your own Binance account ID. A wrong ID may cause the
                    payout to be lost.
                  </p>
                )}
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={
                  !amount ||
                  !!amountError ||
                  !walletAddress ||
                  user?.is_withdraw_block ||
                  !availableBalance ||
                  isCreateLoading ||
                  withdrawDisabled ||
                  needsKyc
                }
                className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreateLoading ? "Processing…" : "Request withdrawal"}
              </button>

              {/* withdrawals turned off by admin */}
              {withdrawDisabled && (
                <div className="mt-3 rounded-2xl border border-neutral-700 bg-neutral-800/40 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-neutral-700/50 p-2 text-neutral-300">
                      <FiAlertCircle className="text-base" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-100">
                        Withdrawals are currently disabled
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                        The withdrawal service is temporarily paused. Please
                        check back later.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* KYC required */}
              {!withdrawDisabled && needsKyc && (
                <div className="mt-3 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-red-500/10 p-4 shadow-sm backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-500/15 p-2 text-amber-300">
                      <FiAlertCircle className="text-base" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-amber-100">
                        {kycStatus === "pending"
                          ? "Your KYC is under review"
                          : "KYC verification required"}
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-amber-200/90">
                        {kycStatus === "pending"
                          ? "Withdrawals unlock as soon as your identity check is approved."
                          : "To unlock withdrawal access, please complete your identity verification."}
                      </p>

                      {kycStatus !== "pending" && (
                        <div className="mt-3">
                          <Link
                            href="/kyc"
                            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/20"
                          >
                            {kycStatus === "rejected"
                              ? "Resubmit KYC"
                              : "Complete KYC Now"}
                            <FiArrowRight className="text-sm" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {user?.is_withdraw_block && (
                <p className="mt-1 flex items-center text-xs text-red-500">
                  <FiAlertCircle className="mr-1" />
                  Please contact customer support
                </p>
              )}
            </motion.form>

            {/* notes */}
            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
              <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900/60 px-4 py-2">
                <FiInfo className="text-emerald-300" />
                <h4 className="text-sm font-semibold text-neutral-200">
                  Withdrawal guidelines
                </h4>
              </div>
              <div className="space-y-3 p-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                    1
                  </span>
                  <div>
                    <div className="font-medium text-neutral-200">
                      Minimum withdrawal
                    </div>
                    <div className="text-neutral-400">
                      ${minWithdraw} USDT required for all withdrawals.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                    2
                  </span>
                  <div>
                    <div className="font-medium text-neutral-200">
                      {feePercent > 0 ? "Network fees" : "No fees"}
                    </div>
                    <div className="text-neutral-400">
                      {feePercent > 0
                        ? `${feePercent}% flat fee applies to all withdrawals.`
                        : "No withdrawal fee is charged."}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-700/40 bg-emerald-500/10 text-xs font-bold text-emerald-300">
                    3
                  </span>
                  <div>
                    <div className="font-medium text-neutral-200">
                      Processing time
                    </div>
                    <div className="text-neutral-400">
                      Typically completes within {processingTime}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /notes */}
          </div>
        </div>
      </motion.div>

      {/* OTP Drawer */}
      <SecurityVerifyDrawer
        open={verifyOpen}
        setOpen={setVerifyOpen}
        email={user?.email}
        context="withdraw"
        onVerified={handleRequestWithdraw}
        autoSendOnOpen={true}
        title="Verify Withdrawal"
      />
    </div>
  );
}
