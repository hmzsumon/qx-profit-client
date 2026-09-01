"use client";

import { Download, ExternalLink, FileText } from "lucide-react";

const PDF = "/docs/business-plan.pdf";

const HIGHLIGHTS = [
  "How QX Profit works, in 3 steps",
  "QX Investment — daily profit, minimums & lock period",
  "Team income across 5 referral levels",
  "Rank Rewards (QX1–QX5) and their targets",
  "Deposits & withdrawals (Crypto + Binance Pay)",
  "Getting-started checklist & important notes",
];

export default function BusinessPlanPage() {
  return (
    <main className="min-h-screen bg-[#0b0e11] text-white">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-xl font-extrabold tracking-tight">Business Plan</h1>
        <p className="mt-1 text-sm text-neutral-400">
          A short guide to how you earn on QX Profit. Open it on your phone or
          download the PDF.
        </p>

        {/* action card */}
        <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-neutral-950">
              <FileText size={22} />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">QX Profit — Business Plan</p>
              <p className="text-xs text-neutral-400">PDF • 9 pages</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a
              href={PDF}
              download
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3 text-sm font-semibold text-neutral-950"
            >
              <Download size={16} /> Download PDF
            </a>
            <a
              href={PDF}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-semibold text-neutral-200"
            >
              <ExternalLink size={16} /> Open in new tab
            </a>
          </div>
        </div>

        {/* what's inside */}
        <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <p className="text-sm font-semibold text-neutral-200">What's inside</p>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* inline preview — desktop only (mobile browsers can't render this) */}
        <div className="mt-4 hidden md:block">
          <iframe
            src={PDF}
            title="QX Profit Business Plan"
            className="h-[80vh] w-full rounded-xl border border-neutral-800"
          />
        </div>
      </div>
    </main>
  );
}
