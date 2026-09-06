/* ────────── Partner home — "It is easy and profitable to work with us!" ────────── */

import Link from "next/link";

const SIGNUP_HREF = "/register-login?tab=create";

const POINTS = [
  {
    icon: "/partner/statistics.svg",
    title: "Detailed statistics",
    body: "Featuring one of the best management panels among all affiliate programs, our platform offers deep campaign tracking and optimization.",
  },
  {
    icon: "/partner/conversion.svg",
    title: "High conversion rates",
    body: "Our advertising procurement team meticulously tests the effectiveness of our landing pages and marketing materials.",
  },
  {
    icon: "/partner/geographical.svg",
    title: "Wide geographical coverage",
    body: "Attract clients from anywhere in the world and work with the countries that suit your needs.",
  },
];

export default function PartnerEasyProfitable() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0F1C]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
        {/* ── left: points ── */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
            It is easy and profitable to work with us!
          </h2>

          <ul className="mt-8 space-y-6">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2E7DF6]/12">
                  <img src={p.icon} alt="" aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{p.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#8b93a7]">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href={SIGNUP_HREF}
            className="mt-9 inline-flex items-center justify-center rounded-lg bg-[#2E7DF6] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]"
          >
            Start earning
          </Link>
        </div>

        {/* ── right: floating collage ── */}
        <div className="relative mx-auto h-[340px] w-full max-w-md">
          <img
            src="/partner/statistics-detailed-1.png"
            alt=""
            aria-hidden
            className="absolute left-0 top-4 w-56 drop-shadow-2xl"
          />
          <img
            src="/partner/statistics-detailed-2.png"
            alt=""
            aria-hidden
            className="absolute right-0 top-0 w-40 drop-shadow-2xl"
          />
          <img
            src="/partner/statistics-detailed-3.png"
            alt=""
            aria-hidden
            className="absolute bottom-0 left-1/2 w-44 -translate-x-1/2 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
