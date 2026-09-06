/* ────────── QX PROFIT — OTP box input ──────────
   Controlled N-digit code input. Paste fills every box at once; typing
   advances one box at a time; Backspace / arrows move between boxes.
   ─────────────────────────────────────────────── */

"use client";

import React, { useMemo, useRef } from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  length?: number;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onComplete?: (code: string) => void;
};

export default function OtpBoxes({
  value,
  onChange,
  length = 6,
  error = false,
  disabled = false,
  autoFocus = false,
  onComplete,
}: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = useMemo(() => {
    const arr = value.replace(/\D/g, "").slice(0, length).split("");
    return Array.from({ length }, (_, i) => arr[i] ?? "");
  }, [value, length]);

  const emit = (arr: string[]) => {
    const next = arr.join("");
    onChange(next);
    if (next.length === length && !next.includes("")) onComplete?.(next);
  };

  const setAt = (idx: number, char: string) => {
    const next = [...digits];
    next[idx] = char;
    emit(next);
  };

  const handleChange = (idx: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(0, 1);
    setAt(idx, v);
    if (v && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        setAt(idx, "");
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus();
        setAt(idx - 1, "");
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) refs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1)
      refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const arr = pasted.split("");
    emit(Array.from({ length }, (_, i) => arr[i] ?? ""));
    setTimeout(() => {
      refs.current[Math.min(pasted.length, length) - 1]?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          className={`h-11 w-9 shrink-0 rounded-md bg-neutral-900 text-center text-lg font-semibold text-neutral-100 outline-none transition disabled:opacity-50 sm:w-11 ${
            error
              ? "border border-red-500 focus:ring-2 focus:ring-red-500/60"
              : "border border-neutral-700 focus:ring-2 focus:ring-[#2E7DF6]/40"
          }`}
        />
      ))}
    </div>
  );
}
