/* ────────── QX PROFIT — Trading predictions block ──────────
   Light panel on the dark page. Left: pitch + CTA + mini chart.
   Right: 2 × 2 grid of the four trading steps.
   ────────────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import {
  CandlestickChart,
  MousePointerClick,
  Search,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/* ────────── Data: the four steps ────────── */
const STEPS: { Icon: LucideIcon; label: string }[] = [
  { Icon: Search, label: "Select an asset" },
  { Icon: CandlestickChart, label: "Monitor the chart" },
  { Icon: MousePointerClick, label: "Place a trade" },
  { Icon: Trophy, label: "Get the result" },
];

const QxPredictions: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#eef1f5] p-8 sm:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* ── Left: pitch ── */}
          <div>
            <h2 className="max-w-md text-2xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-[30px]">
              Grow your capital by making the right trading predictions
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
              Will the price go up or down? Predict the price movement of a
              trading asset and place a trade.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register-login?tab=create"
                className="rounded-lg bg-[#12b76a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]"
              >
                Try it for free
              </Link>
              <span className="text-xs text-gray-400">
                Practice on a demo account without registration
              </span>
            </div>

            {/* ── Mini chart illustration ── */}
            <svg
              viewBox="0 0 320 90"
              className="mt-8 w-full max-w-xs"
              aria-hidden
            >
              <polyline
                points="0,70 32,58 64,64 96,40 128,48 160,28 192,34 224,16 256,24 288,10 320,6"
                fill="none"
                stroke="#2e90fa"
                strokeWidth="2.5"
              />
              <circle cx="288" cy="10" r="4" fill="#2e90fa" />
            </svg>
          </div>

          {/* ── Right: step grid ── */}
          <div className="grid grid-cols-2 gap-4">
            {STEPS.map(({ Icon, label }, i) => (
              <div
                key={label}
                className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#12b76a] text-white">
                  <Icon size={20} />
                </span>
                <p className="text-sm font-semibold text-gray-800">
                  <span className="text-gray-400">{i + 1}.</span> {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QxPredictions;
