"use client";

import { CreditCard, IdCard, BookUser } from "lucide-react";
import { useState } from "react";

export type DocType = "nid" | "driving_license" | "passport";

const DOCS: { key: DocType; label: string; icon: any; hint: string }[] = [
  { key: "nid", label: "National ID", icon: IdCard, hint: "Front & back" },
  {
    key: "driving_license",
    label: "Driving licence",
    icon: CreditCard,
    hint: "Front & back",
  },
  { key: "passport", label: "Passport", icon: BookUser, hint: "Photo page" },
];

export default function KycDocPicker({
  onDone,
}: {
  onDone: (docType: DocType, issuingCountry: string) => void;
}) {
  const [docType, setDocType] = useState<DocType | null>(null);
  const [country, setCountry] = useState("Bangladesh");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Choose a document</h2>

      <label className="block text-xs text-neutral-400">
        Issuing country
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-neutral-600"
        />
      </label>

      <div className="grid gap-3">
        {DOCS.map((d) => {
          const Icon = d.icon;
          const active = docType === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setDocType(d.key)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left ${
                active
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-neutral-800 bg-neutral-900/60 hover:border-neutral-700"
              }`}
            >
              <Icon size={22} className="text-neutral-300" />
              <div>
                <p className="text-sm font-medium text-white">{d.label}</p>
                <p className="text-xs text-neutral-500">{d.hint}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => docType && country.trim() && onDone(docType, country.trim())}
        disabled={!docType || !country.trim()}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}
