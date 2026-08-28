/* ────────── QX PROFIT — Public (marketing) layout ──────────
   Shared chrome for Home, FAQ, About, Blog and Demo pages:
   fixed navbar on top, footer at the bottom, dark page canvas.
   ────────────────────────────────────────────────────────── */

import React from "react";
import QxNavbar from "@/components/public/QxNavbar";
import QxFooter from "@/components/public/QxFooter";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-[#161b27] text-white">
      {/* ── Global navbar (fixed, h-16) ── */}
      <QxNavbar />

      {/* ── Page content (offset for the fixed navbar) ── */}
      <main className="pt-16">{children}</main>

      {/* ── Global footer ── */}
      <QxFooter />
    </div>
  );
};

export default PublicLayout;
