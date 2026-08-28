/* ────────── QX PROFIT — Accordion ──────────
   Shared collapsible list used by the home FAQ teaser and the
   full /faq page. One panel open at a time by default.
   ─────────────────────────────────────────── */

"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export type QxAccordionItem = {
  q: string;
  a: React.ReactNode;
};

type QxAccordionProps = {
  items: QxAccordionItem[];
  /* ── allow multiple panels open at once ── */
  multi?: boolean;
  className?: string;
};

const QxAccordion: React.FC<QxAccordionProps> = ({
  items,
  multi = false,
  className = "",
}) => {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) => {
      if (prev.includes(i)) return prev.filter((x) => x !== i);
      return multi ? [...prev, i] : [i];
    });

  return (
    <div className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-white/[0.05] bg-[#1c2230]"
          >
            {/* ── Question row ── */}
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-white">{item.q}</span>
              <Plus
                size={18}
                className={`shrink-0 text-[#4c9ffb] transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            {/* ── Answer panel ── */}
            {isOpen && (
              <div className="px-5 pb-4">
                <div className="border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-gray-400">
                  {item.a}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QxAccordion;
