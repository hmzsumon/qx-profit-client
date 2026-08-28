/* ────────── QX PROFIT — Mobile app section ──────────
   Rating badge + phone screenshot on the left, pitch + store
   badges on the right.
   ─────────────────────────────────────────────────── */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import phoneShot from "@/public/images/main-platform-mobile-3x.png";

/* ────────── Sub-component: store badge ────────── */
const StoreBadge: React.FC<{ top: string; bottom: string; glyph: string }> = ({
  top,
  bottom,
  glyph,
}) => (
  <Link
    href="#"
    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-black px-4 py-2.5 transition-colors hover:bg-white/5"
  >
    <span className="text-xl leading-none">{glyph}</span>
    <span className="flex flex-col leading-tight">
      <span className="text-[9px] uppercase tracking-wide text-gray-400">
        {top}
      </span>
      <span className="text-sm font-semibold text-white">{bottom}</span>
    </span>
  </Link>
);

const QxMobileApp: React.FC = () => (
  <section className="overflow-hidden bg-[#131a26] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
        {/* ── Left: rating badge + phone ── */}
        <div className="relative shrink-0">
          {/* Rating badge */}
          <div className="absolute -left-2 top-4 z-10 flex flex-col items-center rounded-2xl bg-[#2e90fa] px-3 py-2 leading-none text-white shadow-lg shadow-[#2e90fa]/30">
            <span className="text-2xl font-black">4,8</span>
            <span className="mt-1 text-[10px]">★★★★★</span>
          </div>

          <Image
            src={phoneShot}
            alt="QX Profit mobile trading app"
            placeholder="blur"
            className="h-auto w-[240px] sm:w-[280px]"
          />
        </div>

        {/* ── Right: pitch ── */}
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[32px]">
            Mobile app is always at your fingertips
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Download our user friendly trading app to your mobile device and
            start trading.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <StoreBadge top="Get it on" bottom="Google Play" glyph="▶" />
            <StoreBadge top="Progressive" bottom="Web App" glyph="" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QxMobileApp;
