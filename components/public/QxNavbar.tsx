/* ────────── QX PROFIT — Public Navbar ────────── */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoImg from "@/public/logo/logo_01.png";

const navLinks = [
  { label: "Demo account", href: "/demo" },
  { label: "Choose us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const QxNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1923]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={LogoImg}
              alt="QX Profit"
              width={110}
              height={36}
              priority
              className="object-contain"
            />
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Auth buttons ── */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white px-4 py-1.5 rounded transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-[#00c97a] hover:bg-[#00b36b] text-black px-4 py-1.5 rounded transition-colors"
            >
              Sign up
            </Link>
            <span className="text-xs text-gray-500 ml-2">EN</span>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div className="md:hidden bg-[#0f1923] border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block text-sm text-gray-300 hover:text-white py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              href="/login"
              className="flex-1 text-center text-sm border border-white/20 text-white py-2 rounded"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="flex-1 text-center text-sm bg-[#00c97a] text-black font-semibold py-2 rounded"
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
