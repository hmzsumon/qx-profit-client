/* ────────── QX PROFIT — Public Footer ──────────
   Mirrors the Quotex footer layout:
   rounded link/app panel on top, legal + regulations block below.
   ──────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import QxLogo from "./QxLogo";

/* ────────── Data: link columns ────────── */
const LINK_COLUMNS: {
  title: string;
  href: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "FAQ",
    href: "/faq",
    links: [
      { label: "General questions", href: "/faq" },
      { label: "Financial questions", href: "/faq" },
      { label: "Verification", href: "/faq" },
    ],
  },
  {
    title: "About us",
    href: "/about",
    links: [
      { label: "Reviews", href: "/about" },
      { label: "Contacts", href: "/about" },
    ],
  },
  {
    title: "More",
    href: "/demo",
    links: [
      { label: "Demo account", href: "/demo" },
      { label: "Affiliate program", href: "/blog", external: true },
    ],
  },
];

/* ────────── Data: regulations column ────────── */
const REGULATIONS = [
  "Privacy policy",
  "Service agreement",
  "Risk disclosure",
  "Rules of trading operations",
  "Non-trading operations regulations",
  "Payment policy",
];

/* ────────── Data: social links ────────── */
const SOCIALS = [
  { Icon: FaFacebookF, count: "32K+", href: "#" },
  { Icon: FaInstagram, count: "110K+", href: "#" },
  { Icon: FaTelegramPlane, count: "390K+", href: "#" },
];

/* ────────── Sub-component: store badge ────────── */
const StoreBadge: React.FC<{ top: string; bottom: string; glyph: string }> = ({
  top,
  bottom,
  glyph,
}) => (
  <Link
    href="#"
    className="flex w-40 items-center gap-2.5 rounded-lg border border-white/15 bg-black px-3 py-2 transition-colors hover:bg-white/5"
  >
    <span className="text-lg leading-none">{glyph}</span>
    <span className="flex flex-col leading-tight">
      <span className="text-[9px] uppercase tracking-wide text-gray-400">
        {top}
      </span>
      <span className="text-sm font-semibold text-white">{bottom}</span>
    </span>
  </Link>
);

const QxFooter: React.FC = () => (
  <footer className="bg-[#10141e] pb-10 pt-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ────────── 1. Link + app panel ────────── */}
      <div className="rounded-2xl bg-[#1c2230] p-6 sm:p-9">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr_260px]">
          {/* ── Brand ── */}
          <div>
            <QxLogo size={24} />
          </div>

          {/* ── Link columns ── */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title}>
                <Link
                  href={col.href}
                  className="mb-4 inline-flex items-center gap-1 text-[15px] font-bold text-white hover:text-[#12b76a]"
                >
                  {col.title}
                  <ChevronRight size={15} className="text-gray-500" />
                </Link>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-1 text-[13px] text-gray-400 transition-colors hover:text-white"
                      >
                        {l.label}
                        {l.external && (
                          <ExternalLink size={12} className="text-gray-500" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── App download + socials ── */}
          <div className="lg:text-right">
            <p className="mb-3 text-[13px] text-gray-400">Download the app</p>
            <div className="flex flex-col gap-2.5 lg:items-end">
              <StoreBadge top="Get it on" bottom="Google Play" glyph="▶" />
              <StoreBadge top="Progressive" bottom="Web App" glyph="" />
            </div>

            <p className="mb-3 mt-7 text-[13px] text-gray-400">
              Follow us on social media
            </p>
            <div className="flex flex-col gap-2.5 lg:items-end">
              {SOCIALS.map(({ Icon, count, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="flex w-40 items-center gap-3 rounded-lg bg-[#2e90fa]/10 px-4 py-2.5 text-[#4c9ffb] transition-colors hover:bg-[#2e90fa]/20"
                >
                  <Icon size={15} />
                  <span className="text-sm font-semibold">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ────────── 2. Regulations + legal ────────── */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        {/* ── Regulations column ── */}
        <div>
          <h5 className="mb-3 text-sm font-bold text-white">Regulations</h5>
          <ul className="space-y-2.5">
            {REGULATIONS.map((r) => (
              <li key={r}>
                <Link
                  href="#"
                  className="text-[13px] text-gray-500 transition-colors hover:text-white"
                >
                  {r}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Legal text ── */}
        <div className="space-y-4 text-[12px] leading-relaxed text-gray-500">
          <p>
            QX PROFIT LLC. Address: Main Street, P.O. Box 625, Charlestown, St.
            Kitts and Nevis.
          </p>
          <p>
            The website services are not available in a number of countries,
            including USA, Canada, Hong Kong, EEA countries, Israel, Russia as
            well as for persons under 18 years of age.
          </p>
          <p>
            <span className="text-gray-400">Risk Warning:</span> Trading Forex
            and Leveraged Financial Instruments involves significant risk and can
            result in the loss of your invested capital. You should not invest
            more than you can afford to lose and should ensure that you fully
            understand the risks involved. Trading leveraged products may not be
            suitable for all investors. Trading non-leveraged products such as
            stocks also involves risk as the value of a stock can fall as well as
            rise, which could mean getting back less than you originally put in.
            Past performance is no guarantee of future results. Before trading,
            please take into consideration your level of experience, investment
            objectives and seek independent financial advice if necessary. It is
            the responsibility of the Client to ascertain whether he/she is
            permitted to use the services of the QX Profit brand based on the
            legal requirements in his/her country of residence.
          </p>
          <p>QX PROFIT LLC is the owner of the qxprofit.com domain.</p>
          <p>Copyright © {new Date().getFullYear()} QX Profit. All rights reserved</p>
        </div>
      </div>
    </div>
  </footer>
);

export default QxFooter;
