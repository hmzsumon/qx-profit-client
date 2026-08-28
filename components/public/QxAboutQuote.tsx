/* ────────── QX PROFIT — About: manifesto quote ──────────
   Large pull-quote explaining why the platform exists, over a
   faint chart line with a row of trader avatars.
   ──────────────────────────────────────────────────────── */

import React from "react";
import { Quote } from "lucide-react";

const QxAboutQuote: React.FC = () => (
  <section className="bg-[#131a26] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#1c2230] p-8 sm:p-12">
        <Quote
          size={48}
          className="mb-5 text-[#12b76a]/40"
          strokeWidth={1.5}
        />
        <p className="max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
          The problem is that the best opportunities are usually kept inside a
          small, private circle. For most people, trading on the exchange sounds
          complicated — brokers, exchanges and jargon that an ordinary person is
          not supposed to understand. That is exactly why we are building a
          public platform that is open to everyone.
        </p>

        {/* ── Avatar row over a wavy line ── */}
        <div className="relative mt-10 h-16">
          <svg
            viewBox="0 0 900 60"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-30"
            aria-hidden
          >
            <polyline
              points="0,40 100,30 200,38 300,18 400,28 500,12 600,24 700,8 800,20 900,6"
              fill="none"
              stroke="#4c9ffb"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-0 flex items-center gap-3">
            {["🇧🇩", "🇮🇳", "🇳🇬", "🇵🇰", "🇧🇷", "🇮🇩"].map((f, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1c2230] bg-[#252c3d] text-base"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QxAboutQuote;
