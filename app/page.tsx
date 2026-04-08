/* ────────── QX PROFIT — Home Page (modular assembly) ────────── */

import QxHero from "@/components/public/QxHero";
import QxFeaturesGrid from "@/components/public/QxFeaturesGrid";
import QxNoRegBanner from "@/components/public/QxNoRegBanner";
import QxHowToTrade from "@/components/public/QxHowToTrade";
import QxTestimonials from "@/components/public/QxTestimonials";
import QxMobileApp from "@/components/public/QxMobileApp";
import QxFAQ from "@/components/public/QxFAQ";
import PublicLayout from "./(public)/layout";

export default function QxProfitHome(): JSX.Element {
  return (
    <PublicLayout>
      {/* ── 1. Hero — headline + platform screenshot ── */}
      <QxHero />

      {/* ── 2. Features — 6-card platform features grid ── */}
      <QxFeaturesGrid />

      {/* ── 3. No-Registration Banner — try demo CTA bar ── */}
      <QxNoRegBanner />

      {/* ── 4. How To Trade — 4-step guide + chart ── */}
      <QxHowToTrade />

      {/* ── 5. Testimonials — 6-review grid with ratings ── */}
      <QxTestimonials />

      {/* ── 6. Mobile App — store badges + phone mockup ── */}
      <QxMobileApp />

      {/* ── 7. FAQ — accordion questions & answers ── */}
      <QxFAQ />
    </PublicLayout>
  );
}

