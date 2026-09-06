/* ────────── Partner home — "Exclusive Opportunities for Our Partners" ────────── */

import Link from "next/link";

const SIGNUP_HREF = "/register-login?tab=create";

const ITEMS = [
  {
    icon: "/partner/personalized.svg",
    title: "Personalized Offers",
    body: "Tailored deals for traffic arbitrage teams and market influencers to maximize your earnings.",
  },
  {
    icon: "/partner/compensation.svg",
    title: "Traffic Spend Compensation",
    body: "Eligible top performers can recover up to 100% reimbursement of their traffic spend, unlocking higher ROI and growth.",
  },
  {
    icon: "/partner/competitions.svg",
    title: "Lucrative Competitions",
    body: "Participate in contests with cash prizes up to $500,000, rewarding top-performing affiliates.",
  },
  {
    icon: "/partner/record.svg",
    title: "Proven Track Record",
    body: "Join a network with over 230,000 affiliates generating more than $5.35 million in weekly commissions.",
  },
];

export default function PartnerOpportunities() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0F1C]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          Exclusive Opportunities for Our Partners
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#8b93a7]">
          At QX Profit, we go beyond standard affiliate programs by offering
          unique benefits to our partners.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className="rounded-2xl border border-white/[0.06] bg-[#111C30] p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2E7DF6]/12">
                <img src={it.icon} alt="" aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#8b93a7]">
                {it.body}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-[#8b93a7]">
          These exclusive opportunities are designed to provide our partners with
          unparalleled support and incentives. By joining QX Profit, you&apos;re
          aligning with a program that values and rewards your efforts.
        </p>

        <div className="mt-8 text-center">
          <Link
            href={SIGNUP_HREF}
            className="inline-flex items-center justify-center rounded-lg bg-[#2E7DF6] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  );
}
