/* ────────── QX PROFIT — About: "A modern platform for modern people" ──────────
   Four value cards describing what makes QX Profit different.
   ────────────────────────────────────────────────────────────────────────── */

import React from "react";
import { Gauge, ScanLine, ShieldCheck, Headset, type LucideIcon } from "lucide-react";

/* ────────── Data: value cards ────────── */
const VALUES: { Icon: LucideIcon; text: string }[] = [
  {
    Icon: Gauge,
    text: "The main advantage of QX Profit is premium quality in everything, with no exceptions. A transparent platform, advanced technology and fair conditions for every participant are what make us unique.",
  },
  {
    Icon: ScanLine,
    text: "Thanks to cooperation with reliable liquidity providers, we keep tight control over quotes on the client side. You can always verify every indicator yourself.",
  },
  {
    Icon: ShieldCheck,
    text: "We work to create a comfortable environment for our users and have built the best functionality for money management. Lightning-fast quote updates and a clean interface are what make the platform pleasant to work with.",
  },
  {
    Icon: Headset,
    text: "Our support service deserves special attention. Every support agent enjoys the job — 24/7, fast responses and a genuine desire to help. That is why we stay ahead of alternative platforms.",
  },
];

const QxAboutValues: React.FC = () => (
  <section className="bg-[#131a26] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Heading ── */}
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
        A modern platform for modern people
      </h2>

      {/* ── Cards ── */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map(({ Icon, text }, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.05] bg-[#1c2230] p-6"
          >
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#12b76a]/12 text-[#12b76a]">
              <Icon size={22} />
            </span>
            <p className="text-[13px] leading-relaxed text-gray-400">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QxAboutValues;
