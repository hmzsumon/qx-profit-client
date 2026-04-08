/* ────────── QX PROFIT — Hero Section ────────── */

import Link from "next/link";
import Image from "next/image";
import React from "react";

const QxHero: React.FC = () => (
  <section className="relative bg-[#0f1923] overflow-hidden pt-14">
    {/* ── Background gradient glow ── */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#00c97a]/5 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0 text-center">

      {/* ── Headline ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
        Innovative platform for{" "}
        <span className="text-white">smart investments</span>
      </h1>

      {/* ── Subtitle ── */}
      <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
        Sign up and get 10,000 USD to your demo account to learn how to trade.
      </p>

      {/* ── CTA row ── */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/register"
          className="bg-[#00c97a] hover:bg-[#00b36b] text-black font-bold text-sm px-6 py-3 rounded-lg transition-colors shadow-lg shadow-[#00c97a]/20"
        >
          Create a free account
        </Link>
        <span className="text-gray-500 text-xs">
          ★ Trusted by 48,000+ traders
        </span>
      </div>

      {/* ── Platform screenshot ── */}
      <div className="mt-10 relative max-w-5xl mx-auto">
        {/* Fake platform UI */}
        <div className="rounded-t-xl overflow-hidden border border-white/10 bg-[#161f2c] shadow-2xl shadow-black/60">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1a2535] border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <div className="flex-1 mx-4 bg-[#0f1923] rounded px-3 py-1 text-xs text-gray-500 text-left">
              qxprofit.com/trade
            </div>
          </div>

          {/* Trading UI mockup */}
          <div className="flex h-64 sm:h-80">
            {/* Left sidebar */}
            <div className="w-12 bg-[#111a24] border-r border-white/5 flex flex-col items-center gap-3 py-4">
              {["📊", "⏱", "📈", "💰", "⚙️"].map((icon, i) => (
                <span key={i} className="text-lg opacity-50 hover:opacity-100 cursor-pointer">{icon}</span>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative bg-[#0f1923] p-2">
              {/* Candlestick chart SVG */}
              <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* Grid lines */}
                {[30, 70, 110, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#1e2d3d" strokeWidth="1" />
                ))}
                {/* Green candles */}
                {[
                  [20, 60, 40, 80], [60, 40, 30, 65], [100, 70, 50, 85],
                  [140, 50, 35, 70], [180, 80, 55, 95], [220, 45, 30, 60],
                  [260, 65, 40, 78], [300, 35, 20, 52], [340, 75, 50, 90],
                  [380, 50, 30, 68], [420, 60, 45, 78], [460, 40, 25, 55],
                ].map(([x, open, close, high], i) => {
                  const isGreen = i % 3 !== 1;
                  const color = isGreen ? "#00c97a" : "#ef4444";
                  const top = Math.min(open, close);
                  const h = Math.abs(open - close) || 2;
                  return (
                    <g key={i}>
                      <line x1={x + 4} y1={top - 8} x2={x + 4} y2={high} stroke={color} strokeWidth="1" opacity="0.6" />
                      <rect x={x} y={top} width="8" height={h + 4} fill={color} opacity="0.8" />
                    </g>
                  );
                })}
              </svg>
              {/* Price badge */}
              <div className="absolute top-2 right-2 bg-[#00c97a] text-black text-xs font-bold px-2 py-0.5 rounded">
                +2.34%
              </div>
            </div>

            {/* Right panel */}
            <div className="w-36 bg-[#111a24] border-l border-white/5 flex flex-col gap-2 p-3">
              <div className="text-xs text-gray-500 mb-1">Quick Trade</div>
              {/* Amount */}
              <div className="bg-[#1a2535] rounded p-2">
                <div className="text-xs text-gray-500">Amount</div>
                <div className="text-white font-bold text-sm">$50.00</div>
              </div>
              {/* Time */}
              <div className="bg-[#1a2535] rounded p-2">
                <div className="text-xs text-gray-500">Time</div>
                <div className="text-white font-bold text-sm">3:00</div>
              </div>
              {/* Buttons */}
              <button className="bg-[#00c97a] text-black font-bold text-xs py-2 rounded mt-1">
                ▲ HIGHER
              </button>
              <button className="bg-red-500 text-white font-bold text-xs py-2 rounded">
                ▼ LOWER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QxHero;
