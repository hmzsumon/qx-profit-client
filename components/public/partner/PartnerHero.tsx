/* ────────── Partner home — Hero ──────────
   Headline + sub-copy + "Try now" CTA, the curved wave graphic, then
   the partner stat trio.
   ──────────────────────────────────────── */

import Link from "next/link";

const SIGNUP_HREF = "/register-login?tab=create";

const STATS = [
  { value: "73 220 422", label: "Active traders" },
  { value: "414 808", label: "Thriving partners" },
  {
    value: "4 525 518 $",
    label: "Earned by our partners over the past week",
    accent: true,
  },
];

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24">
      {/* ── decorative glow + coins ── */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div className="absolute left-1/2 top-4 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#2E7DF6]/15 blur-[130px]" />
        <img
          src="/partner/header-left.svg"
          alt=""
          aria-hidden
          className="absolute left-[6%] top-24 hidden w-16 opacity-90 lg:block xl:left-[12%]"
        />
        <img
          src="/partner/header-right.svg"
          alt=""
          aria-hidden
          className="absolute right-[6%] top-40 hidden w-12 opacity-90 lg:block xl:right-[12%]"
        />
      </div>

      {/* ── headline + CTA ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-[42px]">
          QX Profit presents a lucrative and transparent affiliate program
          designed to boost your profitability
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-[#8b93a7] sm:text-base">
          Lightweight, fast, and intuitive platform. Partner&apos;s commission is
          up to 5% on turnover. Weekly payouts. Loyal and responsive support
          service.
        </p>

        <Link
          href={SIGNUP_HREF}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2E7DF6] px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#2E7DF6]/30 transition-colors hover:bg-[#1E6FE0]"
        >
          Try now
        </Link>
      </div>

      {/* ── curved wave graphic (full-bleed, sits above the stats) ── */}
      <div className="relative z-0 -mt-4 flex w-full justify-center overflow-hidden sm:-mt-8">
        <img
          src="/partner/header-background.svg"
          alt=""
          aria-hidden
          className="pointer-events-none block h-auto w-full min-w-[680px] max-w-[1600px] shrink-0 select-none opacity-90"
        />
      </div>

      {/* ── stat trio ── */}
      <div className="relative z-10 mx-auto -mt-8 grid max-w-4xl grid-cols-1 gap-6 px-4 pb-16 sm:-mt-12 sm:grid-cols-3 sm:gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className={`text-2xl font-extrabold tracking-tight sm:text-[28px] ${
                s.accent ? "text-[#12b76a]" : "text-white"
              }`}
            >
              {s.value}
            </div>
            <div className="mt-1 text-xs text-[#8b93a7]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
