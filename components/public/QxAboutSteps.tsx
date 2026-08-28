/* ────────── QX PROFIT — About: "How does the platform work?" ──────────
   Four simple steps, each with an icon, a bold verb and a short line.
   ─────────────────────────────────────────────────────────────────── */

import React from "react";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/* ────────── Data: the four steps ────────── */
const STEPS: { Icon: LucideIcon; verb: string; rest: string }[] = [
  { Icon: Search, verb: "We choose", rest: "the asset of interest." },
  {
    Icon: SlidersHorizontal,
    verb: "We set",
    rest: "the trade size and the time the deal closes.",
  },
  {
    Icon: TrendingUp,
    verb: "We forecast",
    rest: "the price direction for the selected time.",
  },
  { Icon: Wallet, verb: "We get", rest: "the result of the transaction." },
];

const QxAboutSteps: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Heading ── */}
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
        How does the platform work?
      </h2>
      <p className="mt-2 text-sm text-gray-500">4 simple steps</p>

      {/* ── Steps ── */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ Icon, verb, rest }, i) => (
          <div key={i} className="flex flex-col gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1c2230] text-[#12b76a]">
              <Icon size={22} />
            </span>
            <p className="text-sm text-gray-400">
              <span className="font-bold text-white">{verb}</span> {rest}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QxAboutSteps;
