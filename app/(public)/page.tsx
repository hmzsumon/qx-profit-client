/* ────────── QX PROFIT — Home Page (partner-program layout) ────────── */

import PartnerHero from "@/components/public/partner/PartnerHero";
import PartnerPayoutStrip from "@/components/public/partner/PartnerPayoutStrip";
import PartnerEarnWays from "@/components/public/partner/PartnerEarnWays";
import PartnerEasyProfitable from "@/components/public/partner/PartnerEasyProfitable";
import PartnerLevelCards from "@/components/public/partner/PartnerLevelCards";
import PartnerOpportunities from "@/components/public/partner/PartnerOpportunities";
import PartnerReviews from "@/components/public/partner/PartnerReviews";
import PartnerCollaboration from "@/components/public/partner/PartnerCollaboration";
import PartnerSupportCta from "@/components/public/partner/PartnerSupportCta";

export default function QxProfitHome(): JSX.Element {
  return (
    <>
      <PartnerHero />
      <PartnerPayoutStrip />
      <PartnerEarnWays />
      <PartnerEasyProfitable />
      <PartnerLevelCards />
      <PartnerOpportunities />
      <PartnerReviews />
      <PartnerCollaboration />
      <PartnerSupportCta />
    </>
  );
}
