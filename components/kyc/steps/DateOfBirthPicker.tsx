"use client";

import { useEffect, useMemo, useState } from "react";

/*
  Day / Month / Year select trio for date of birth.
  Keeps its own partial state so each field sticks while the user picks the
  other two; emits an ISO "YYYY-MM-DD" string via onChange only once all three
  are chosen (and "" if any is cleared).
*/

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const sel =
  "rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-neutral-600";

const pad = (n: number) => String(n).padStart(2, "0");

function daysInMonth(year: number, month1: number) {
  if (!year || !month1) return 31;
  return new Date(year, month1, 0).getDate();
}

function parse(value: string) {
  const [y, m, d] = (value || "").split("-").map((n) => Number(n) || 0);
  return { y: y || 0, m: m || 0, d: d || 0 };
}

export default function DateOfBirthPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [parts, setParts] = useState(() => parse(value));

  // Sync when a complete value is pushed in from outside (e.g. prefilled KYC).
  useEffect(() => {
    const p = parse(value);
    if (p.y && p.m && p.d) setParts(p);
  }, [value]);

  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 88 }, (_, i) => now - 13 - i); // ages 13..100
  }, []);

  const update = (next: { y: number; m: number; d: number }) => {
    const capped = { ...next };
    if (capped.y && capped.m) {
      capped.d = Math.min(capped.d || 0, daysInMonth(capped.y, capped.m));
    }
    setParts(capped);
    if (capped.y && capped.m && capped.d) {
      onChange(`${capped.y}-${pad(capped.m)}-${pad(capped.d)}`);
    } else {
      onChange("");
    }
  };

  const dayCount = daysInMonth(parts.y, parts.m);

  return (
    <div className="grid grid-cols-3 gap-2">
      <select
        className={sel}
        value={parts.d || ""}
        onChange={(e) => update({ ...parts, d: Number(e.target.value) })}
      >
        <option value="">Day</option>
        {Array.from({ length: dayCount }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <select
        className={sel}
        value={parts.m || ""}
        onChange={(e) => update({ ...parts, m: Number(e.target.value) })}
      >
        <option value="">Month</option>
        {MONTHS.map((name, i) => (
          <option key={name} value={i + 1}>
            {name}
          </option>
        ))}
      </select>

      <select
        className={sel}
        value={parts.y || ""}
        onChange={(e) => update({ ...parts, y: Number(e.target.value) })}
      >
        <option value="">Year</option>
        {years.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
