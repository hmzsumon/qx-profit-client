/* ────────── QX PROFIT — About: "Any doubts?" demo CTA ──────────
   Left: pitch + "Demo account" button. Right: a monitor mock with
   a green speech bubble.
   ──────────────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";

const QxAboutDemoCta: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* ── Pitch ── */}
        <div>
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[30px]">
            Any doubts? Practice without risk with a demo account.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
            We are open with our visitors. If you are torn between hundreds of
            projects that claim to help you trade, we make it easy to compare:
            open a demo account. There is nothing to lose because you are not
            using real money — so you can safely test how the platform works
            first.
          </p>
          <Link
            href="/register-login?tab=create"
            className="mt-6 inline-flex rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Demo account
          </Link>
        </div>

        {/* ── Monitor mock ── */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -top-4 right-2 z-10 rounded-xl bg-[#12b76a] px-4 py-2 text-xs font-bold text-white shadow-lg">
            QX Profit: while others doubt, you act!
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1c2230] p-3">
            <svg viewBox="0 0 320 170" className="w-full" aria-hidden>
              <rect width="320" height="170" rx="8" fill="#131a26" />
              <polyline
                points="10,130 45,110 80,120 115,80 150,95 185,55 220,72 255,40 290,58 310,30"
                fill="none"
                stroke="#12b76a"
                strokeWidth="2.5"
              />
              <line
                x1="0"
                y1="150"
                x2="320"
                y2="150"
                stroke="#ffffff"
                strokeOpacity="0.06"
              />
            </svg>
          </div>
          <div className="mx-auto mt-1 h-3 w-24 rounded-b-lg bg-[#252c3d]" />
        </div>
      </div>
    </div>
  </section>
);

export default QxAboutDemoCta;
