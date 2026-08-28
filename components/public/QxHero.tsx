/* ────────── QX PROFIT — Hero ──────────
   Headline + demo-bonus subline + primary CTA, sitting above the
   web-platform screenshot. Green radial glow behind the heading.
   ────────────────────────────────────── */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import platformShot from "@/public/images/main-platform-3x.png";

const QxHero: React.FC = () => (
  <section className="relative overflow-hidden bg-[#161b27]">
    {/* ── Background: green glow + faint skyline wash ── */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
      style={{
        background:
          "radial-gradient(760px 340px at 50% -40px, rgba(18,183,106,0.28), rgba(18,183,106,0.06) 45%, transparent 72%)",
      }}
    />

    <div className="relative mx-auto max-w-6xl px-4 pb-0 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
      {/* ── Headline ── */}
      <h1 className="mx-auto max-w-3xl text-[32px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
        Innovative platform for
        <br />
        smart investments
      </h1>

      {/* ── Demo-bonus subline ── */}
      <p className="mx-auto mt-5 max-w-xl text-sm text-gray-300 sm:text-[15px]">
        Sign up and get 10,000 USD to your demo account to learn how to trade.
      </p>

      {/* ── CTA row ── */}
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/register-login?tab=create"
          className="rounded-lg bg-[#12b76a] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#12b76a]/25 transition-colors hover:bg-[#0fa762]"
        >
          Create a free account
        </Link>
        <span className="max-w-[220px] text-xs text-gray-500 sm:text-left">
          * The minimum deposit amount to start real trading is 10 USD
        </span>
      </div>

      {/* ── Platform screenshot ── */}
      <div className="relative mx-auto mt-12 max-w-5xl">
        <Image
          src={platformShot}
          alt="QX Profit web trading platform"
          priority
          placeholder="blur"
          className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/60"
        />
      </div>
    </div>
  </section>
);

export default QxHero;
