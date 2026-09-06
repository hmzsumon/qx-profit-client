/* ────────── Partner home — "How collaboration with us works" ────────── */

import Link from "next/link";

const SIGNUP_HREF = "/register-login?tab=create";

const STEPS = [
  {
    title: "Acquire your affiliate link",
    body: "Register an account and generate a unique link through which you get your commission.",
  },
  {
    title: "Invite new traders",
    body: "Place advertisements to attract maximum traffic to the platform.",
  },
  {
    title: "Earn a percentage of the profits!",
    body: "Get a stable income from the turnover of every trader you bring in.",
  },
];

export default function PartnerCollaboration() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0A0F1C]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <img
            src="/partner/collaboration.svg"
            alt="How collaboration with QX Profit works"
            className="mx-auto w-full max-w-md"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
            How collaboration with us works:
          </h2>

          <ol className="mt-8 space-y-6">
            {STEPS.map((s, idx) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2E7DF6] text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#8b93a7]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href={SIGNUP_HREF}
            className="mt-9 inline-flex items-center justify-center rounded-lg bg-[#2E7DF6] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]"
          >
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  );
}
