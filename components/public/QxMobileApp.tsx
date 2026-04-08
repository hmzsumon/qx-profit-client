/* ────────── QX PROFIT — Mobile App Section ────────── */

import React from "react";
import Link from "next/link";

const QxMobileApp: React.FC = () => (
  <section className="bg-[#131c28] py-16 sm:py-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col lg:flex-row items-center gap-10">

        {/* ── Left: Phone mockup ── */}
        <div className="relative shrink-0 flex items-end justify-center w-56 h-80">
          {/* Rating badge */}
          <div className="absolute top-0 left-0 bg-[#00c97a] text-black font-bold rounded-xl px-3 py-2 flex flex-col items-center leading-tight z-10 shadow-lg">
            <span className="text-2xl font-black">4.8</span>
            <div className="flex gap-0.5 mt-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-black" style={{ fontSize: 9 }}>★</span>
              ))}
            </div>
            <span className="text-xs mt-0.5 font-semibold">Rating</span>
          </div>

          {/* Phone body */}
          <div className="w-48 h-72 bg-[#0f1923] rounded-3xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#161f2c] rounded-full z-10" />
            {/* Screen content */}
            <div className="absolute inset-0 flex flex-col pt-8">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                <span className="text-[10px] text-white font-bold">QX PROFIT</span>
                <span className="text-[10px] text-[#00c97a]">● Live</span>
              </div>
              {/* Chart area */}
              <div className="flex-1 p-2">
                <svg viewBox="0 0 160 100" className="w-full h-full">
                  <polyline
                    points="0,80 20,70 40,75 60,50 80,58 100,35 120,42 140,20 160,15"
                    fill="none"
                    stroke="#00c97a"
                    strokeWidth="1.5"
                  />
                  <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c97a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00c97a" stopOpacity="0" />
                  </linearGradient>
                  <polygon
                    points="0,80 20,70 40,75 60,50 80,58 100,35 120,42 140,20 160,15 160,100 0,100"
                    fill="url(#mobileGrad)"
                  />
                </svg>
              </div>
              {/* Bottom trade bar */}
              <div className="px-2 pb-3 flex gap-1.5">
                <div className="flex-1 bg-[#00c97a] text-black text-[9px] font-black py-1.5 rounded-lg text-center">▲ UP</div>
                <div className="flex-1 bg-red-500 text-white text-[9px] font-black py-1.5 rounded-lg text-center">▼ DOWN</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Text content ── */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            Mobile app is always at{" "}
            <span className="text-[#00c97a]">your fingertips</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-md">
            Download our user-friendly trading app to your mobile device and start trading anytime, anywhere with full access to all features.
          </p>

          {/* ── Store badges ── */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            {/* Google Play */}
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-black border border-white/20 text-white rounded-xl px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <span className="text-2xl">▶</span>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 leading-none">GET IT ON</p>
                <p className="text-sm font-semibold leading-tight">Google Play</p>
              </div>
            </Link>

            {/* Web App */}
            <Link
              href="#"
              className="flex items-center gap-2.5 bg-black border border-white/20 text-white rounded-xl px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <span className="text-2xl">🌐</span>
              <div className="text-left">
                <p className="text-[9px] text-gray-400 leading-none">OPEN IN</p>
                <p className="text-sm font-semibold leading-tight">Web App</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QxMobileApp;
