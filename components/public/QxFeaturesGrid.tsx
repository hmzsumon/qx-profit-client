/* ────────── QX PROFIT — Features of the platform ──────────
   3 × 2 grid of platform highlights. Each card = coloured icon
   tile + title + copy + blue call-to-action link.
   ───────────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Gift,
  Headphones,
  MonitorSmartphone,
  Radio,
  type LucideIcon,
} from "lucide-react";

/* ────────── Data: feature cards ────────── */
type Feature = {
  Icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
};

const FEATURES: Feature[] = [
  {
    Icon: MonitorSmartphone,
    color: "#8b5cf6",
    title: "User-friendly interface",
    desc: "You have access to all the trading instruments you need, and their speed is impressive.",
    cta: "Sign up",
    href: "/register-login?tab=create",
  },
  {
    Icon: Radio,
    color: "#f97066",
    title: "Integrated signals",
    desc: "Signals with 87% accuracy rate will help you to build a profitable strategy.",
    cta: "Try it",
    href: "/register-login?tab=create",
  },
  {
    Icon: BarChart3,
    color: "#2dd4bf",
    title: "Trading indicators",
    desc: "We have collected the most useful trading indicators for you. Test them on a demo account to see which ones best suit your trading style.",
    cta: "Explore",
    href: "/register-login?tab=create",
  },
  {
    Icon: Headphones,
    color: "#fbbf24",
    title: "Support 24/7",
    desc: "Our highly trained support staff is ready to assist you at any time.",
    cta: "Submit a request",
    href: "/faq",
  },
  {
    Icon: Gift,
    color: "#12b76a",
    title: "Bonus programs",
    desc: "Participate in tournaments and giveaways for traders to get bonuses.",
    cta: "Get a bonus",
    href: "/register-login?tab=create",
  },
  {
    Icon: ArrowLeftRight,
    color: "#60a5fa",
    title: "Deposits and withdrawals",
    desc: "Various deposit options and fast withdrawal of funds. The minimum deposit is only 10 USD.",
    cta: "Start trading",
    href: "/register-login?tab=create",
  },
];

const QxFeaturesGrid: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Section header ── */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          Features of the platform
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          We regularly improve our platform to make your trading comfortable and
          safe.
        </p>
      </div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ Icon, color, title, desc, cta, href }) => (
          <div
            key={title}
            className="flex flex-col rounded-2xl border border-white/[0.05] bg-[#1c2230] p-6 transition-colors hover:border-white/10"
          >
            {/* ── Icon tile ── */}
            <span
              className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}1f`, color }}
            >
              <Icon size={22} />
            </span>

            {/* ── Title + copy ── */}
            <h3 className="text-[15px] font-bold text-white">{title}</h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-gray-400">
              {desc}
            </p>

            {/* ── CTA ── */}
            <Link
              href={href}
              className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4c9ffb] hover:text-[#7bb8fc]"
            >
              {cta} <span aria-hidden>→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QxFeaturesGrid;
