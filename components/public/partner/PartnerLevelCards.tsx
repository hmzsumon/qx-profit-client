/* ────────── Partner home — Affiliate level cards (L1–L7) ────────── */

import Link from "next/link";

const SIGNUP_HREF = "/register-login?tab=create";

const LEVELS = [
  { n: 1, name: "Starter", deposits: "0–14", share: "2%" },
  { n: 2, name: "Advanced", deposits: "15–49", share: "3%" },
  { n: 3, name: "Professional", deposits: "50–99", share: "4%" },
  { n: 4, name: "Expert", deposits: "100–199", share: "4.5%" },
  { n: 5, name: "Master", deposits: "200–499", share: "5%" },
  { n: 6, name: "Guru", deposits: "500–699", share: "5.5%" },
  { n: 7, name: "Legend", deposits: "700+", share: "6%" },
];

export default function PartnerLevelCards() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/partner/level_left_img.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 hidden w-40 opacity-70 lg:block"
      />
      <img
        src="/partner/level_right_img.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-16 hidden w-40 opacity-70 lg:block"
      />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          Enhanced Affiliate Level Cards for QX Profit
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#8b93a7]">
          Levels unlock as your active referrals grow. Higher levels raise your
          turnover share and open extra partner benefits.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {LEVELS.map((l) => (
            <article
              key={l.n}
              className="rounded-2xl border border-white/[0.06] bg-white p-4 text-[#0B1220] shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8b93a7]">
                  Level {l.n}
                </span>
                <img src="/partner/percentage.svg" alt="" aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="mt-2 text-lg font-extrabold">{l.name}</h3>

              <dl className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-[#8b93a7]">Deposits required</dt>
                  <dd className="font-semibold">{l.deposits}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-2">
                  <dt className="text-[#8b93a7]">Turnover share</dt>
                  <dd className="font-bold text-[#2E7DF6]">{l.share}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={SIGNUP_HREF}
            className="inline-flex items-center justify-center rounded-lg bg-[#2E7DF6] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]"
          >
            Join now
          </Link>
        </div>
      </div>
    </section>
  );
}
