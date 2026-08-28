/* ────────── QX PROFIT — "Trade on demo" banner ──────────
   Slim call-to-action strip between the features grid and the
   trading-predictions block.
   ─────────────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import { KeyRound } from "lucide-react";

const QxDemoBanner: React.FC = () => (
  <section className="bg-[#161b27] pb-4 pt-2 sm:pb-8">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/[0.05] bg-[#1c2230] px-6 py-6 sm:flex-row sm:justify-between">
        {/* ── Copy ── */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#12b76a]/10 text-[#12b76a] sm:inline-flex">
            <KeyRound size={22} />
          </span>
          <div>
            <p className="text-sm font-bold text-white">
              Trade on demo — no registration is required!
            </p>
            <p className="mt-1 text-[13px] text-gray-400">
              Or register a personal account to access additional features.
            </p>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/demo"
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Try demo
          </Link>
          <Link
            href="/register-login?tab=create"
            className="rounded-lg bg-[#12b76a] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]"
          >
            Register an account
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default QxDemoBanner;
