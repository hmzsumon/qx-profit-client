"use client";

import { useGetMyKycQuery } from "@/redux/features/auth/authApi";
import { ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/*
  Soft, dismissible "complete your KYC" prompt. Rides along every authenticated
  page (mounted in the dashboard Layout). Hidden on /kyc, and when KYC is
  pending or approved. Dismissal lasts the browser session.
*/
export default function KycStatusBanner() {
  const pathname = usePathname();
  const { data } = useGetMyKycQuery();
  const kyc = data?.kyc ?? data?.data ?? data;
  const status: string = kyc?.status || "draft";

  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem("kyc_banner_dismissed") === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (pathname?.startsWith("/kyc")) return null;
  if (dismissed) return null;
  if (status === "pending" || status === "approved") return null;

  const rejected = status === "rejected";

  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm">
      <ShieldCheck size={18} className="shrink-0 text-emerald-400" />
      <div className="min-w-0 flex-1 text-emerald-100">
        {rejected
          ? "Your verification was rejected. Please resubmit your documents."
          : "Verify your identity to unlock withdrawals and full access."}
      </div>
      <Link
        href="/kyc"
        className="shrink-0 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-neutral-950"
      >
        {rejected ? "Resubmit" : "Verify now"}
      </Link>
      <button
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("kyc_banner_dismissed", "1");
          } catch {}
        }}
        className="shrink-0 rounded-lg p-1 text-emerald-200/70 hover:text-emerald-100"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
