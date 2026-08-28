/* ────────── QX PROFIT — About Page (modular assembly) ────────── */

import type { Metadata } from "next";
import QxAboutIntro from "@/components/public/QxAboutIntro";
import QxAboutMission from "@/components/public/QxAboutMission";
import QxAboutValues from "@/components/public/QxAboutValues";
import QxAboutSteps from "@/components/public/QxAboutSteps";
import QxAboutQuote from "@/components/public/QxAboutQuote";
import QxAboutDemoCta from "@/components/public/QxAboutDemoCta";
import QxAboutInnovation from "@/components/public/QxAboutInnovation";

export const metadata: Metadata = {
  title: "About us — QX Profit",
  description:
    "QX Profit is a new-level trading platform built for everyone — fast, transparent digital asset trading with 300+ assets and a free demo account.",
};

export default function AboutPage(): JSX.Element {
  return (
    <>
      {/* ── 1. Intro — heading + founding story + timeline ── */}
      <QxAboutIntro />

      {/* ── 2. Mission — screenshot + "platform for everyone" ── */}
      <QxAboutMission />

      {/* ── 3. Values — 4-card "modern platform for modern people" ── */}
      <QxAboutValues />

      {/* ── 4. Steps — how the platform works in 4 steps ── */}
      <QxAboutSteps />

      {/* ── 5. Quote — the manifesto pull-quote ── */}
      <QxAboutQuote />

      {/* ── 6. Demo CTA — "any doubts? practice risk-free" ── */}
      <QxAboutDemoCta />

      {/* ── 7. Innovation — closing banner + account CTAs ── */}
      <QxAboutInnovation />
    </>
  );
}
