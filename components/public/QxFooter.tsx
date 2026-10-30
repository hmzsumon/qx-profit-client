/* ────────── QX PROFIT — Public Footer ──────────
   Minimal partner-program footer: brand, one legal line, a few links.
   ──────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import QxLogo from "./QxLogo";

const LINKS = [
  { label: "Affiliate agreement", href: "/terms-conditions" },
  { label: "Registration", href: "/register-login?tab=create" },
  { label: "Sign in", href: "/register-login?tab=signin" },
];

const QxFooter: React.FC = () => (
  <footer className="border-t border-white/[0.06] bg-[#070C15] py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
      <QxLogo size={22} />

      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-[13px] text-gray-400 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="text-[12px] text-gray-500">
        © {new Date().getFullYear()} QX Profit. All rights reserved
      </p>
    </div>
  </footer>
);

export default QxFooter;
