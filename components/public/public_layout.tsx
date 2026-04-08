/* ────────── QX PROFIT — Public Layout ────────── */

import QxFooter from "@/components/public/QxFooter";
import QxNavbar from "@/components/public/QxNavbar";
import React from "react";

const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen bg-[#0f1923] text-white">
      <QxNavbar />
      <div>{children}</div>
      <QxFooter />
    </main>
  );
};

export default PublicLayout;
