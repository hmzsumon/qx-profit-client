"use client";

import BrokerLinkButton from "@/components/ai-accounts/BrokerLinkButton";

export default function QxBrokerPage() {
  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <div className="mx-auto max-w-lg px-4 pb-24 pt-10">
        <h1 className="text-xl font-bold">QX Broker</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Trade on the QX Broker platform. Tap the button below to open it.
        </p>

        <div className="mt-8">
          <BrokerLinkButton className="w-full" />
        </div>
      </div>
    </div>
  );
}
