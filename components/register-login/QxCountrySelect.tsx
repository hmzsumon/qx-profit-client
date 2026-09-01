/* ────────── QX PROFIT — Country / Region combobox ──────────
   Searchable dropdown (globe icon + "Search" + chevron) used in
   the registration form. Meant to sit inside <QxField>.
   ──────────────────────────────────────────────────────────── */

"use client";

import { Combobox } from "@headlessui/react";
import { ChevronDown, Globe } from "lucide-react";
import { useMemo, useState } from "react";
import countries from "world-countries";

/* ── flag + name + iso2, sorted A→Z ── */
const OPTIONS = countries
  .map((c) => ({
    value: c.name.common,
    flag: c.flag,
    iso2: (c.cca2 || "").toLowerCase(),
  }))
  .sort((a, b) => a.value.localeCompare(b.value));

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function QxCountrySelect({ value, onChange }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OPTIONS;
    return OPTIONS.filter(
      (o) => o.value.toLowerCase().includes(q) || o.iso2.includes(q),
    );
  }, [query]);

  return (
    <Combobox value={value || null} onChange={(v: string | null) => onChange(v ?? "")}>
      <div className="relative">
        {/* ── Trigger row ── */}
        <div className="flex items-center px-3.5 py-3">
          <Globe size={16} className="mr-2.5 shrink-0 text-gray-400" />
          <Combobox.Input
            displayValue={(v: string | null) => v ?? ""}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full appearance-none border-0 bg-transparent p-0 text-sm text-white shadow-none outline-none ring-0 focus:ring-0 placeholder:text-gray-500"
          />
          <Combobox.Button className="ml-2 text-gray-400">
            <ChevronDown size={16} />
          </Combobox.Button>
        </div>

        {/* ── Options ── */}
        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-white/10 bg-[#252c3d] py-1 shadow-2xl">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">No matches</div>
          ) : (
            filtered.slice(0, 60).map((o) => (
              <Combobox.Option
                key={o.iso2 || o.value}
                value={o.value}
                className={({ active }) =>
                  `cursor-pointer truncate px-3 py-2 text-sm ${
                    active ? "bg-[#2e90fa]/15 text-white" : "text-gray-200"
                  }`
                }
              >
                {o.value}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
