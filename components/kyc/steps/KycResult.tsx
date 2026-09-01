"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function KycApproved() {
  const router = useRouter();
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-400">
        <CheckCircle2 size={32} />
      </div>
      <h1 className="text-2xl font-bold text-white">Identity verified</h1>
      <p className="text-neutral-400">
        Your KYC is complete. All account features are now unlocked.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-neutral-950"
      >
        Go to dashboard
      </button>
    </div>
  );
}

export function KycRejected({
  reason,
  onResubmit,
}: {
  reason?: string;
  onResubmit: () => void;
}) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-500/10 text-red-400">
        <XCircle size={32} />
      </div>
      <h1 className="text-2xl font-bold text-white">Verification rejected</h1>
      {reason && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {reason}
        </p>
      )}
      <button
        onClick={onResubmit}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-neutral-950"
      >
        Resubmit documents
      </button>
    </div>
  );
}
