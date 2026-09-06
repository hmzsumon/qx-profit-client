/* ────────── Partner home — Partner reviews carousel ────────── */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const REVIEWS = [
  {
    name: "Aditi",
    country: "India",
    flag: "/partner/flag-in.svg",
    tint: "bg-[#FFF3EC]",
    text: "I didn't expect much from support at first, but QX Profit changed that. Whenever I had questions or needed creatives, my manager actually helped. Once I had a tracking issue — they fixed it the same day. Payments are always on time, and the bonus system motivates you to grow. It's not just numbers — you feel like they care.",
    tags: ["#DedicatedManager", "#HighCommissions", "#TrustedPlatform"],
  },
  {
    name: "Ngozi",
    country: "Nigeria",
    flag: "/partner/flag-ng.svg",
    tint: "bg-[#EEFBF1]",
    text: "Most networks don't care about African GEOs, but QX Profit really works here. They support local payments and the dashboard updates quickly. I started without any background in finance, and within a week I was running campaigns in 3 languages. It's the first time I feel like I'm building something long term.",
    tags: ["#LocalPayments", "#QuickStart", "#GlobalReach"],
  },
  {
    name: "Carlos",
    country: "Mexico",
    flag: "/partner/flag-mx.svg",
    tint: "bg-[#EEF4FF]",
    text: "QX Profit keeps it simple: send traffic, get paid when users deposit and trade. No weird rules or surprises. I tested a few finance offers before, and this one gave me results quickly. No delays, clear dashboard, and I hit Level 3 within two months.",
    tags: ["#StartWithNoRisk", "#AffiliateDashboard", "#EasyLevelUp"],
  },
];

export default function PartnerReviews() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  const prev = () => setI((v) => (v - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setI((v) => (v + 1) % REVIEWS.length);

  return (
    <section className="relative overflow-hidden">
      <img
        src="/partner/reviews_left.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 hidden w-28 opacity-70 lg:block"
      />
      <img
        src="/partner/reviews_right.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-16 hidden w-28 opacity-70 lg:block"
      />

      <div className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          Partner reviews
        </h2>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5 sm:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <article className={`flex-1 rounded-2xl p-6 text-[#0B1220] ${r.tint}`}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold">
                {r.name[0]}
              </span>
              <div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  {r.name}
                  <img src={r.flag} alt={r.country} className="h-3.5 w-auto" />
                </div>
                <div className="text-xs text-[#5c6577]">{r.country}</div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed">{r.text}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {r.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-[#2E7DF6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>

          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5 sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to review ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-[#2E7DF6]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
