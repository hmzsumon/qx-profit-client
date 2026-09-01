/* Grid of rank tier cards from the live RankSummaryResponse. */
"use client";

import type { RankSummaryItem } from "@/types/rank";
import { RankCard } from "./RankCard";

export function RankGrid({ items }: { items: RankSummaryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((r) => (
        <RankCard key={r.key} item={r} />
      ))}
    </div>
  );
}
