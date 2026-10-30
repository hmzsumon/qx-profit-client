/* ────────── QX BROKER — Demo account (placeholder) ────────── */

import type { Metadata } from "next";
import QxComingSoon from "@/components/public/QxComingSoon";

export const metadata: Metadata = { title: "Demo account — Qx Broker" };

export default function DemoPage() {
  return (
    <QxComingSoon
      title="Demo account"
      note="The one-click demo experience is coming soon. For now, create a free account to get 10,000 USD in virtual funds."
    />
  );
}
