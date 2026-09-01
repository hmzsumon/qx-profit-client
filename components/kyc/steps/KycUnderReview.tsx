"use client";

import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KycUnderReview() {
  const router = useRouter();
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-yellow-400/10 text-yellow-400">
        <Clock size={30} />
      </div>
      <h1 className="text-2xl font-bold text-white">
        Your documents are under review
      </h1>
      <p className="text-neutral-400">
        Verification usually completes within a few minutes but can take up to 24
        hours. You can keep using your account meanwhile.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-neutral-950"
      >
        Back to dashboard
      </button>
    </div>
  );
}
