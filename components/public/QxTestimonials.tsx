/* ────────── QX PROFIT — Testimonials ──────────
   "What people say about us" — 3 × 2 review cards with a
   five-star rating, then a "View all reviews" CTA.
   ───────────────────────────────────────────── */

import Link from "next/link";
import React from "react";

/* ────────── Data: customer reviews ────────── */
type Review = {
  name: string;
  date: string;
  earned: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Rahima",
    date: "29.01.2025",
    earned: "$8440",
    text: "As a beginner, I really appreciated the demo account. It let me experiment with different indicators and strategies without the fear of losing money. Now I trade with confidence.",
  },
  {
    name: "Terwase",
    date: "05.12.2024",
    earned: "$913",
    text: "The interface is easy and simple to understand and use. The proximity ratio for placing an up or down trade, buy or sell, is 1:1. The app works smoothly on my phone.",
  },
  {
    name: "Abhi",
    date: "28.11.2024",
    earned: "$1041",
    text: "Genuinely a great trading platform. I tried a lot of trading apps, but now that I have found QX Profit, I am sticking to it. Withdrawals are fast and support actually replies.",
  },
  {
    name: "Sonal",
    date: "25.11.2024",
    earned: "$398",
    text: "I've had nothing but positive experiences with QX Profit over the years that I've been using it. The platform is intuitive and the user-friendly design keeps me coming back.",
  },
  {
    name: "Md Imran",
    date: "24.11.2024",
    earned: "$217",
    text: "In binary trading, QX Profit is very good for me! The broker's deposit and withdrawal system is very good. Best regards, QX Profit broker from me.",
  },
  {
    name: "Shree Ganesh",
    date: "20.11.2024",
    earned: "$379",
    text: "I've been using QX Profit for some time now, and the experience has been excellent. The platform is straightforward to navigate, with a clean and modern layout.",
  },
];

/* ────────── Sub-component: 5 stars ────────── */
const Stars: React.FC = () => (
  <div className="mt-2 flex gap-0.5 text-[#12b76a]" aria-label="5 out of 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ fontSize: 14 }}>
        ★
      </span>
    ))}
  </div>
);

const QxTestimonials: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Section header ── */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          What people say about us
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          We asked our customers to rate QX Profit on a five-point scale.
        </p>
      </div>

      {/* ── Reviews grid ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="flex flex-col rounded-2xl border border-white/[0.05] bg-[#1c2230] p-6"
          >
            <p className="text-[15px] font-bold text-white">{r.name}</p>
            <p className="mt-1 text-xs text-gray-500">
              {r.date} · Earned: {r.earned}
            </p>
            <Stars />
            <p className="mt-3 line-clamp-4 flex-1 text-[13px] leading-relaxed text-gray-400">
              {r.text}
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4c9ffb] hover:text-[#7bb8fc]"
            >
              Read more <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>

      {/* ── View all CTA ── */}
      <div className="mt-10 text-center">
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-lg bg-[#12b76a] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]"
        >
          View all reviews
        </Link>
      </div>
    </div>
  </section>
);

export default QxTestimonials;
