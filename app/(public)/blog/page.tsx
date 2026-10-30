/* ────────── QX PROFIT — Blog Page (modular assembly) ────────── */

import type { Metadata } from "next";
import QxBlogHero from "@/components/public/QxBlogHero";
import QxBlogFeatured from "@/components/public/QxBlogFeatured";
import QxBlogList from "@/components/public/QxBlogList";

export const metadata: Metadata = {
  title: "Blog — QX Profit",
  description:
    "Guides and explainers about the QX Profit trading platform: how digital options work, placing your first trade, deposits and withdrawals, signals, the demo account and bonuses.",
};

export default function BlogPage(): JSX.Element {
  return (
    <>
      {/* ── 1. Hero — heading + category chips ── */}
      <QxBlogHero />

      {/* ── 2. Featured — full lead article about the platform ── */}
      <QxBlogFeatured />

      {/* ── 3. List — grid of article cards ── */}
      <QxBlogList />
    </>
  );
}
