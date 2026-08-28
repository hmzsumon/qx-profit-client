/* ────────── QX PROFIT — Blog: header ──────────
   Page heading, intro line and a static row of category chips.
   ───────────────────────────────────────────── */

import React from "react";

/* ────────── Data: category chips ────────── */
const CATEGORIES = [
  "All",
  "Platform",
  "Getting started",
  "Payments",
  "Strategy",
  "Bonuses",
];

const QxBlogHero: React.FC = () => (
  <section className="bg-[#161b27] pt-14 sm:pt-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Heading ── */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Blog
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-gray-400">
        Guides, explainers and platform news — everything you need to understand
        how QX Profit works and how to trade on it with confidence.
      </p>

      {/* ── Category chips ── */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
              i === 0
                ? "bg-[#12b76a] text-white"
                : "bg-[#1c2230] text-gray-400"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default QxBlogHero;
