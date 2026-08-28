/* ────────── QX PROFIT — Blog: post grid ──────────
   Grid of article cards. Each has a category, date, title and a
   full-sentence excerpt describing the topic in QX Profit terms.
   ─────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";

/* ────────── Data: posts ────────── */
type Post = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

const POSTS: Post[] = [
  {
    category: "Getting started",
    date: "12 Aug 2026",
    title: "Your first trade on QX Profit, step by step",
    excerpt:
      "Open the platform, pick an asset from the selector, set your investment and expiry time, then choose Up or Down. We walk through every button on the order panel and explain what the payout percentage next to each asset means.",
  },
  {
    category: "Platform",
    date: "5 Aug 2026",
    title: "Digital options explained: up or down in 60 seconds",
    excerpt:
      "A digital option has a fixed payout and a fixed expiry. You are not buying the asset — you are forecasting its direction. Here is how profit, loss and the rare tie result are calculated on QX Profit.",
  },
  {
    category: "Payments",
    date: "29 Jul 2026",
    title: "Deposits and withdrawals: methods, limits and timing",
    excerpt:
      "Fund a real account from 10 USD using cards, e-wallets or crypto. QX Profit does not charge a deposit fee; withdrawal fees depend on the provider and are shown before you confirm. Most requests clear within minutes to 3 business days.",
  },
  {
    category: "Strategy",
    date: "21 Jul 2026",
    title: "Using signals and indicators inside QX Profit",
    excerpt:
      "Add moving averages, Bollinger Bands, RSI and the built-in signal feed to any chart. Test combinations on the demo account first and keep the ones that match your trading style and preferred expiry.",
  },
  {
    category: "Getting started",
    date: "14 Jul 2026",
    title: "Practice with 10,000 USD: getting the most from the demo",
    excerpt:
      "The demo account mirrors real market prices with virtual funds. Use it to learn the interface, build a routine and track a simple journal before you risk real money — and reset the balance whenever you need a clean start.",
  },
  {
    category: "Bonuses",
    date: "3 Jul 2026",
    title: "Tournaments and bonus programs for QX Profit traders",
    excerpt:
      "Join scheduled tournaments and giveaways to compete for prize pools, and check the current deposit bonus terms before you top up. We explain wagering conditions so there are no surprises at withdrawal.",
  },
];

const QxBlogList: React.FC = () => (
  <section className="bg-[#131a26] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">
        Latest articles
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <article
            key={p.title}
            className="flex flex-col rounded-2xl border border-white/[0.05] bg-[#1c2230] p-6"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-[#12b76a]/15 px-2.5 py-0.5 font-semibold text-[#12b76a]">
                {p.category}
              </span>
              <span className="text-gray-500">{p.date}</span>
            </div>
            <h3 className="mt-3 text-[16px] font-bold leading-snug text-white">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-gray-400">
              {p.excerpt}
            </p>
            <Link
              href="/register-login?tab=create"
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4c9ffb] hover:text-[#7bb8fc]"
            >
              Read more <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default QxBlogList;
