/* ────────── QX PROFIT — Auth form primitives ──────────
   Material-style "outlined" fields (notched floating label),
   password field with visibility toggle, the blue submit button
   with a trailing arrow, the segmented Login/Registration tabs,
   a checkbox and the "Sign in via Google" button.

   Card background colour = #252c3d — the floating labels paint
   that same colour so they "notch" the field border.
   ─────────────────────────────────────────────────────── */

"use client";

import React from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

/* ────────── Field: outlined wrapper with floating label ────────── */
export const QxField: React.FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div>
    <div
      className={`relative rounded-[4px] border bg-transparent transition-colors ${
        error ? "border-red-500" : "border-white/20 focus-within:border-[#2e90fa]"
      }`}
    >
      <label className="pointer-events-none absolute -top-2 left-2.5 bg-[#252c3d] px-1.5 text-[11px] text-gray-400">
        {label}
      </label>
      {children}
    </div>
    {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
  </div>
);

/* ────────── Input: bare text input (forwardRef for RHF) ────────── */
export const QxInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full bg-transparent px-3.5 py-3.5 text-sm text-white outline-none placeholder:text-gray-500 ${className}`}
  />
));
QxInput.displayName = "QxInput";

/* ────────── Password input: text/password toggle ────────── */
export const QxPasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <input
        ref={ref}
        {...props}
        type={show ? "text" : "password"}
        className={`w-full bg-transparent px-3.5 py-3.5 pr-11 text-sm text-white outline-none placeholder:text-gray-500 ${className}`}
      />
      <button
        type="button"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-200"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
});
QxPasswordInput.displayName = "QxPasswordInput";

/* ────────── Submit: full-width blue button + circular arrow ────────── */
export const QxSubmit: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }
> = ({ label, className = "", disabled, ...props }) => (
  <button
    {...props}
    disabled={disabled}
    className={`flex w-full items-center justify-center gap-2 rounded-md bg-[#2e90fa] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1a7ff0] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
  >
    {label}
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
      <ArrowRight size={13} />
    </span>
  </button>
);

/* ────────── Tabs: segmented Login / Registration control ────────── */
export const QxAuthTabs: React.FC<{
  value: "signin" | "create";
  onChange: (v: "signin" | "create") => void;
}> = ({ value, onChange }) => {
  const Item: React.FC<{ id: "signin" | "create"; children: React.ReactNode }> = ({
    id,
    children,
  }) => (
    <button
      type="button"
      onClick={() => onChange(id)}
      className={`h-9 rounded-md px-6 text-sm font-bold transition-colors ${
        value === id
          ? "bg-[#39435a] text-white"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-[#1c2230] p-1">
      <Item id="signin">Login</Item>
      <Item id="create">Registration</Item>
    </div>
  );
};

/* ────────── Checkbox: square, blue when checked ────────── */
export const QxCheckbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { children: React.ReactNode }
>(({ children, className = "", ...props }, ref) => (
  <label className="flex items-start gap-3 text-[13px] leading-snug text-gray-300">
    <input
      ref={ref}
      type="checkbox"
      {...props}
      className={`mt-0.5 h-4 w-4 shrink-0 rounded-[3px] border border-white/25 bg-transparent accent-[#2e90fa] ${className}`}
    />
    <span>{children}</span>
  </label>
));
QxCheckbox.displayName = "QxCheckbox";

/* ────────── "Sign in via" divider + Google button ────────── */
export const QxSocialSignIn: React.FC = () => (
  <div className="mt-7">
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="h-px flex-1 bg-white/10" />
      Sign in via
      <span className="h-px flex-1 bg-white/10" />
    </div>
    <div className="mt-4 flex justify-center">
      <button
        type="button"
        aria-label="Sign in with Google"
        className="flex h-11 w-14 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-colors hover:bg-white/[0.07]"
      >
        {/* Google "G" */}
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.2 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C39.9 41 44 33.5 44 24c0-1.2-.1-2.3-.4-3.5z"
          />
        </svg>
      </button>
    </div>
  </div>
);
