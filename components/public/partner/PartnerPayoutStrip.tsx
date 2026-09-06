/* ────────── Partner home — Weekly payouts strip ────────── */

const PAYOUTS = [
  { src: "/partner/payout-tether.svg", label: "Tether" },
  { src: "/partner/payout-pm.svg", label: "Perfect Money" },
  { src: "/partner/payout-pix.svg", label: "PIX" },
  { src: "/partner/payout-visa_mc.svg", label: "Visa / Mastercard" },
  { src: "/partner/payout-more.svg", label: "And more" },
];

export default function PartnerPayoutStrip() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-white/[0.06] bg-[#111C30] px-6 py-6 sm:flex-row sm:justify-between">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#8b93a7] sm:text-left">
          Weekly payouts with convenient methods
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          {PAYOUTS.map((p) => (
            <img
              key={p.label}
              src={p.src}
              alt={p.label}
              title={p.label}
              className="h-6 w-auto opacity-90"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
