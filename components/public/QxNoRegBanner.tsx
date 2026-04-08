/* ────────── QX PROFIT — No Registration Banner ────────── */

import Link from "next/link";
import React from "react";

const QxNoRegBanner: React.FC = () => (
  <section className="bg-[#131c28] py-8 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

        {/* ── Left copy ── */}
        <div className="flex items-center gap-4">
          {/* Robot/mascot placeholder */}
          <div className="w-14 h-14 bg-[#00c97a]/10 rounded-full flex items-center justify-center text-2xl shrink-0">
            🤖
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              This is done — no registration required!
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              ★ Try a demo account with virtual funds and practise trading for free.
            </p>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/demo"
            className="text-sm font-semibold border border-white/20 text-white px-5 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            Try demo
          </Link>
          <Link
            href="/register"
            className="text-sm font-bold bg-[#00c97a] hover:bg-[#00b36b] text-black px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#00c97a]/20"
          >
            Sign up an account
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default QxNoRegBanner;
