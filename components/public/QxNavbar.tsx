/* ────────── QX PROFIT — Public Navbar ──────────
   Matches the Quotex marketing header:
   logo · centred nav · "Log in" (grey) + "Sign up" (green).
   No language selector. Collapses to a hamburger sheet on mobile.
   ──────────────────────────────────────────────── */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import QxLogo from "./QxLogo";

/* ────────── Data: primary nav links ────────── */
const NAV_LINKS = [
  { label: "Demo account", href: "/demo" },
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

/* ────────── Auth destinations ────────── */
const LOGIN_HREF = "/register-login?tab=signin";
const SIGNUP_HREF = "/register-login?tab=create";

const QxNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* ── close the mobile sheet whenever the route changes ── */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* ── lock body scroll while the mobile sheet is open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#161b27]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <QxLogo size={26} />

        {/* ── Desktop nav links (centred) ── */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-[3px] left-0 h-[2px] w-full rounded bg-[#12b76a]" />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Desktop auth buttons ── */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href={LOGIN_HREF}
            className="rounded-lg bg-[#2a3344] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#333e52]"
          >
            Log in
          </Link>
          <Link
            href={SIGNUP_HREF}
            className="rounded-lg bg-[#12b76a] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]"
          >
            Sign up
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ────────── Mobile sheet ────────── */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#161b27] px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-white/[0.05] py-3.5 text-[15px] font-medium ${
                  isActive(l.href) ? "text-[#12b76a]" : "text-gray-200"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href={LOGIN_HREF}
              className="rounded-lg bg-[#2a3344] py-3 text-center text-sm font-semibold text-white"
            >
              Log in
            </Link>
            <Link
              href={SIGNUP_HREF}
              className="rounded-lg bg-[#12b76a] py-3 text-center text-sm font-bold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default QxNavbar;
