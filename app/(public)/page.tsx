/* ────────── QX PROFIT — Home Page (modular assembly) ────────── */

import QxHero from "@/components/public/QxHero";
import QxFeaturesGrid from "@/components/public/QxFeaturesGrid";
import QxDemoBanner from "@/components/public/QxDemoBanner";
import QxPredictions from "@/components/public/QxPredictions";
import QxTestimonials from "@/components/public/QxTestimonials";
import QxMobileApp from "@/components/public/QxMobileApp";
import QxFAQ from "@/components/public/QxFAQ";

export default function QxProfitHome(): JSX.Element {
  return (
    <>
      {/* ── 1. Hero — headline + platform screenshot ── */}
      <QxHero />

      {/* ── 2. Features — 6-card platform features grid ── */}
      <QxFeaturesGrid />

      {/* ── 3. Demo banner — "no registration required" CTA strip ── */}
      <QxDemoBanner />

      {/* ── 4. Predictions — pitch + 4 trading steps ── */}
      <QxPredictions />

      {/* ── 5. Testimonials — 6-review grid with ratings ── */}
      <QxTestimonials />

      {/* ── 6. Mobile app — rating badge + store badges ── */}
      <QxMobileApp />

      {/* ── 7. FAQ — teaser accordion + link to full page ── */}
      <QxFAQ />
    </>
  );
}
