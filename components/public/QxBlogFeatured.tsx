/* ────────── QX PROFIT — Blog: featured article ──────────
   The lead post, shown in full so the page carries real,
   detailed content about the platform.
   ────────────────────────────────────────────────────── */

import React from "react";

const QxBlogFeatured: React.FC = () => (
  <section className="bg-[#161b27] py-12 sm:py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-white/[0.05] bg-[#1c2230] p-7 sm:p-12">
        {/* ── Meta ── */}
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-[#12b76a]/15 px-3 py-1 font-semibold text-[#12b76a]">
            Platform
          </span>
          <span className="text-gray-500">Featured · 8 min read</span>
        </div>

        {/* ── Title ── */}
        <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[32px]">
          QX Profit: how the platform works and why traders choose it
        </h2>

        {/* ── Body ── */}
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-400">
          <p>
            QX Profit is a digital options trading platform. In plain terms, you
            pick an asset — a currency pair, a stock, an index, a metal or a
            cryptocurrency — decide how much to invest, choose how long the trade
            should run, and predict whether the price will be higher or lower
            when that time is up. If your forecast is correct at expiry, you
            receive a fixed payout that is shown before you open the trade. If it
            is wrong, you lose only the amount you invested in that single trade.
            Nothing more, no hidden margin calls.
          </p>

          <h3 className="pt-2 text-base font-bold text-white">
            Built by a team that has been at this since 2019
          </h3>
          <p>
            The project started in 2019 with a small group of engineers who had
            already spent years building trading software. Their goal was
            simple: make a platform that is fast, honest and easy enough that a
            complete beginner can place a first trade in minutes, while still
            giving experienced traders the indicators and speed they expect. The
            combined experience of the team today adds up to more than 200 years.
          </p>

          <h3 className="pt-2 text-base font-bold text-white">
            What you actually get
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-gray-300">300+ assets</span> across
              currencies, stocks, indices, commodities and crypto, including OTC
              markets that stay open on weekends.
            </li>
            <li>
              <span className="text-gray-300">A free demo account</span> preloaded
              with 10,000 USD in virtual funds — reset it whenever you like and
              practise with zero risk.
            </li>
            <li>
              <span className="text-gray-300">Built-in signals and indicators</span>{" "}
              you can add to any chart to test and refine a strategy.
            </li>
            <li>
              <span className="text-gray-300">A low entry point</span> — you can
              fund a real account from just 10 USD, and the minimum trade size is
              small enough to learn without pressure.
            </li>
            <li>
              <span className="text-gray-300">Fast payments</span> — most
              withdrawals are processed within minutes to a few business days,
              with no deposit fee from QX Profit.
            </li>
          </ul>

          <h3 className="pt-2 text-base font-bold text-white">
            Security and transparency
          </h3>
          <p>
            Quotes are delivered from reliable liquidity providers and update in
            real time, so what you see on the chart is what your trade is priced
            against. Account access is protected with email verification and, for
            withdrawals, identity verification (KYC). Support is available 24/7
            through the platform.
          </p>

          <h3 className="pt-2 text-base font-bold text-white">
            Where to start
          </h3>
          <p>
            Create a free account, open the demo, and place a few small trades to
            get a feel for the interface and expiry times. When you are
            comfortable, switch to a real account and start with an amount you
            are happy to risk. The rest of this blog breaks each of those steps
            down in detail.
          </p>
        </div>
      </article>
    </div>
  </section>
);

export default QxBlogFeatured;
