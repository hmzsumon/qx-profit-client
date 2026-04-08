/* ────────── QX PROFIT — How To Trade Section ────────── */

import Link from "next/link";
import React from "react";

const steps = [
  { num: 1, title: "Sign in once", icon: "🔑" },
  { num: 2, title: "Choose the chart", icon: "📊" },
  { num: 3, title: "Place a trade", icon: "💸" },
  { num: 4, title: "Get the result", icon: "🏆" },
];

const QxHowToTrade: React.FC = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* ── Left content ── */}
        <div className="flex-1 max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            Grow your capital by making the right trading predictions
          </h2>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            It's this precise go up or down? Predict the price movement of a
            leading asset and make a trade.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/register"
              className="bg-[#00c97a] hover:bg-[#00b36b] text-black font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Try it for free
            </Link>
            <span className="text-xs text-gray-400">
              ★ No deposit required to start
            </span>
          </div>

          {/* ── Chart wave illustration ── */}
          <div className="mt-8">
            <svg viewBox="0 0 300 80" className="w-full max-w-xs opacity-80">
              <polyline
                points="0,60 30,50 60,55 90,35 120,42 150,25 180,30 210,15 240,22 270,10 300,5"
                fill="none"
                stroke="#00c97a"
                strokeWidth="2.5"
              />
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00c97a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00c97a" stopOpacity="0" />
              </linearGradient>
              <polygon
                points="0,60 30,50 60,55 90,35 120,42 150,25 180,30 210,15 240,22 270,10 300,5 300,80 0,80"
                fill="url(#waveGrad)"
              />
              {/* Coin icon */}
              <circle cx="285" cy="5" r="12" fill="#f59e0b" />
              <text x="285" y="9" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">$</text>
            </svg>
          </div>
        </div>

        {/* ── Right steps grid ── */}
        <div className="flex-1 grid grid-cols-2 gap-4 max-w-sm w-full">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col items-start gap-2 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{step.icon}</span>
              <div>
                <p className="text-xs text-gray-400 font-medium">{step.num}.</p>
                <p className="text-gray-800 font-semibold text-sm">{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default QxHowToTrade;
