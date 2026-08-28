/* ────────── QX PROFIT — Coming soon placeholder ──────────
   Lightweight stand-in for pages that are linked in the navbar
   but not built yet (About us, Blog, Demo account).
   ──────────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";

type QxComingSoonProps = {
  title: string;
  note?: string;
};

const QxComingSoon: React.FC<QxComingSoonProps> = ({ title, note }) => (
  <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
    <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#12b76a]/10 text-2xl text-[#12b76a]">
      ●
    </span>
    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
      {title}
    </h1>
    <p className="mt-3 max-w-md text-sm text-gray-400">
      {note ?? "This section is coming soon."}
    </p>
    <Link
      href="/"
      className="mt-8 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
    >
      Back to home
    </Link>
  </div>
);

export default QxComingSoon;
