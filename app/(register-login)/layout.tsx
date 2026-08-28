/* ────────── QX PROFIT — Auth layout (Login / Registration) ──────────
   Same navbar + footer as the marketing site, with a faint line-chart
   wash behind the auth card.
   ─────────────────────────────────────────────────────────────────── */

import React from "react";
import QxNavbar from "@/components/public/QxNavbar";
import QxFooter from "@/components/public/QxFooter";

const RegisterLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-[#161b27] text-white">
      {/* ── Navbar (fixed, h-16) ── */}
      <QxNavbar />

      {/* ── Content ── */}
      <main className="relative overflow-hidden pt-16">
        {/* ── Background: faint chart silhouette ── */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-64 w-full -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,180 120,150 240,170 360,110 480,140 600,80 720,120 840,60 960,100 1080,50 1200,90 1320,40 1440,70"
            fill="none"
            stroke="#4c9ffb"
            strokeWidth="3"
          />
        </svg>

        <div className="relative">{children}</div>
      </main>

      {/* ── Footer ── */}
      <QxFooter />
    </div>
  );
};

export default RegisterLoginLayout;
