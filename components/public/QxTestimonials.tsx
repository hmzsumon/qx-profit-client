/* ────────── QX PROFIT — Testimonials Section ────────── */

import React from "react";
import Link from "next/link";

const testimonials = [
  {
    name: "Rahim",
    flag: "🇧🇩",
    country: "Dhaka, Bangladesh",
    stars: 5,
    text: "Excellent platform! I appreciate how reliable everything is. Execution is fast and payouts arrive without any delay. Highly recommend it.",
  },
  {
    name: "Terrence",
    flag: "🇺🇸",
    country: "London, USA",
    stars: 5,
    text: "After trying many platforms, this is by far the best for ease of use. I can navigate it effortlessly and the signals are very accurate.",
  },
  {
    name: "Abhi",
    flag: "🇮🇳",
    country: "Kerala, India",
    stars: 5,
    text: "This platform is really handy. It's very easy to use and there are many features. I highly recommend it to anyone who wants to invest.",
  },
  {
    name: "Sonal",
    flag: "🇮🇳",
    country: "Mumbai, India",
    stars: 4,
    text: "I've been a trader using this platform for 2 years and I'm really satisfied. Customer service is always available when needed.",
  },
  {
    name: "Md Imran",
    flag: "🇧🇩",
    country: "Sylhet, Bangladesh",
    stars: 5,
    text: "Incredible results! The tournaments and bonus programs make it even more exciting. Deposits and withdrawals work seamlessly.",
  },
  {
    name: "Shree Ganesh",
    flag: "🇮🇳",
    country: "Tamil Nadu, India",
    stars: 5,
    text: "Outstanding experience! The interface is clean and I love the indicator tools. My win rate has improved significantly since joining.",
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-0.5 mt-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? "text-[#f59e0b]" : "text-gray-600"} style={{ fontSize: 13 }}>
        ★
      </span>
    ))}
  </div>
);

const QxTestimonials: React.FC = () => (
  <section className="bg-[#0f1923] py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Section header ── */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          What people say about us
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          We added our customer reviews on a five-point scale.
        </p>
      </div>

      {/* ── Reviews grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#161f2c] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all"
          >
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#1e2d3d] flex items-center justify-center text-base">
                {t.flag}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.country}</p>
              </div>
            </div>
            <Stars count={t.stars} />
            <p className="mt-3 text-gray-400 text-xs leading-relaxed line-clamp-4">
              {t.text}
            </p>
          </div>
        ))}
      </div>

      {/* ── View all button ── */}
      <div className="mt-8 text-center">
        <Link
          href="/reviews"
          className="inline-block bg-[#00c97a] hover:bg-[#00b36b] text-black font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          View all reviews
        </Link>
      </div>
    </div>
  </section>
);

export default QxTestimonials;
