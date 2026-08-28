/* ────────── QX PROFIT — About: closing innovation banner ──────────
   Centred headline over the platform screenshot ringed with asset
   bubbles, plus the two account CTAs.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import platformShot from "@/public/images/main-platform-3x.png";

/* ────────── Data: floating asset bubbles ────────── */
const BUBBLES = [
  { label: "$", cls: "left-0 top-6" },
  { label: "€", cls: "right-0 top-10" },
  { label: "₿", cls: "left-6 bottom-8" },
  { label: "Au", cls: "right-8 bottom-4" },
];

const QxAboutInnovation: React.FC = () => (
  <section className="bg-[#131a26] py-16 sm:py-20">
    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      {/* ── Heading ── */}
      <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[32px]">
        QX Profit: an innovation platform for digital asset trading
      </h2>

      {/* ── Screenshot + bubbles ── */}
      <div className="relative mx-auto mt-10 max-w-3xl">
        {BUBBLES.map((b) => (
          <span
            key={b.label}
            className={`absolute z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1c2230] text-sm font-bold text-white sm:flex ${b.cls}`}
          >
            {b.label}
          </span>
        ))}
        <Image
          src={platformShot}
          alt="QX Profit platform overview"
          placeholder="blur"
          className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/50"
        />
      </div>

      {/* ── CTAs ── */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/register-login?tab=create"
          className="rounded-lg bg-[#12b76a] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]"
        >
          Open real account
        </Link>
        <Link
          href="/register-login?tab=create"
          className="rounded-lg border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Demo account
        </Link>
      </div>
    </div>
  </section>
);

export default QxAboutInnovation;
