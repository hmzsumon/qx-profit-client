/* ────────── QX PROFIT — Features Grid ────────── */

import React from "react";
import {
  Monitor,
  TrendingUp,
  BarChart2,
  Headphones,
  Gift,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Monitor,
    color: "#7c6af7",
    title: "User-friendly interface",
    desc: "The platform adapts to the needs of both beginners and professionals.",
  },
  {
    icon: TrendingUp,
    color: "#f77c6a",
    title: "Integrated signals",
    desc: "Signals with 87% accuracy rate will help you in finding the best strategy.",
  },
  {
    icon: BarChart2,
    color: "#6af7c8",
    title: "Trading indicators",
    desc: "We have the most commonly used trading indicators available to help you.",
  },
  {
    icon: Headphones,
    color: "#f7c86a",
    title: "Support 24/7",
    desc: "Our support team is always ready to help you trade anytime.",
  },
  {
    icon: Gift,
    color: "#00c97a",
    title: "Bonus programs",
    desc: "Our bonus systems and tournaments are bonuses for maximum performance.",
  },
  {
    icon: ArrowLeftRight,
    color: "#6aaaf7",
    title: "Deposits and withdrawals",
    desc: "Wide range of payment methods. The minimum deposit is only 10 USD.",
  },
];

const QxFeaturesGrid: React.FC = () => (
  <section className="bg-[#0f1923] py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Section header ── */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Features of the platform
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          We regularly improve our platform to ensure your trading comfort and success.
        </p>
      </div>

      {/* ── Feature cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-[#161f2c] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${feat.color}20` }}
            >
              <feat.icon size={20} style={{ color: feat.color }} />
            </div>
            <h3 className="text-white font-semibold text-sm mb-1.5">{feat.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
            <Link
              href="#"
              className="mt-3 text-xs font-medium inline-flex items-center gap-1 transition-colors"
              style={{ color: feat.color }}
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QxFeaturesGrid;
