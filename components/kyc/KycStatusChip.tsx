/* ────────── KYC verification status chip ──────────
   Shows the caller's KYC state. When not yet verified / rejected it
   links to the verification page.
   ─────────────────────────────────────────────────── */
"use client";

import { useGetMyKycQuery } from "@/redux/features/auth/authApi";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import Link from "next/link";

export default function KycStatusChip({ className = "" }: { className?: string }) {
  const { data } = useGetMyKycQuery();
  const kyc = data?.kyc ?? data?.data ?? data;
  const status: string = kyc?.status || "draft";

  if (status === "approved") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#12b76a]/15 px-2.5 py-1 text-[11px] font-semibold text-[#12b76a] ${className}`}
      >
        <ShieldCheck size={13} />
        Verified
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-400 ${className}`}
      >
        <ShieldQuestion size={13} />
        Verification pending
      </span>
    );
  }

  const rejected = status === "rejected";
  return (
    <Link
      href="/kyc"
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
        rejected
          ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
          : "bg-[#2E7DF6]/15 text-[#5AA2FF] hover:bg-[#2E7DF6]/25"
      } ${className}`}
    >
      <ShieldAlert size={13} />
      {rejected ? "Verification rejected — resubmit" : "Not verified — verify now"}
    </Link>
  );
}
