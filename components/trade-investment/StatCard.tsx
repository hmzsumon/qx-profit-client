"use client";

type Props = { label: string; value: string; tone?: "green" | "amber" | "blue" | "neutral" };

export default function StatCard({ label, value, tone = "neutral" }: Props) {
  const toneClass = tone === "green" ? "from-emerald-500/20 to-emerald-500/5 border-emerald-400/20" : tone === "amber" ? "from-amber-500/20 to-amber-500/5 border-amber-400/20" : tone === "blue" ? "from-sky-500/20 to-sky-500/5 border-sky-400/20" : "from-white/10 to-white/5 border-white/10";
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 ${toneClass}`}>
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
