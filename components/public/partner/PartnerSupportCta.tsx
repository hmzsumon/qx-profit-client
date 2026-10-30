/* ────────── Partner home — Support + quick registration card ──────────
   The email / password entered here are carried to the full sign-up
   form (which also needs country) via the query string.
   ──────────────────────────────────────────────────────────────────── */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PartnerSupportCta() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ tab: "create" });
    if (email.trim()) q.set("email", email.trim().toLowerCase());
    router.push(`/register-login?${q.toString()}`);
  };

  return (
    <section className="border-t border-white/[0.06] bg-[#0A0F1C]">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        {/* ── left: support copy ── */}
        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[32px]">
            Do you have any remaining questions? Contact our support service to
            get the answers you need!
          </h2>
          <a
            href="https://t.me/qxprofit_partner"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2E7DF6]/10 px-4 py-2.5 text-sm font-semibold text-[#5AA2FF] transition-colors hover:bg-[#2E7DF6]/20"
          >
            <img src="/partner/telegram.svg" alt="" aria-hidden className="h-5 w-5" />
            @qxprofit_partner
          </a>
        </div>

        {/* ── right: quick registration card ── */}
        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/[0.06] bg-white p-6 text-[#0B1220] shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <img src="/partner/form-logo.svg" alt="QX Profit" className="h-7 w-auto" />
          </div>
          <h3 className="mt-4 text-lg font-extrabold">Registration</h3>

          <label className="mt-4 block text-xs font-semibold text-[#5c6577]">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm text-[#0B1220] outline-none focus:border-[#2E7DF6]"
            />
          </label>

          <label className="mt-3 block text-xs font-semibold text-[#5c6577]">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm text-[#0B1220] outline-none focus:border-[#2E7DF6]"
            />
          </label>

          <label className="mt-4 flex items-start gap-2 text-xs text-[#5c6577]">
            <input
              type="checkbox"
              required
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#2E7DF6]"
            />
            <span>
              I accept the{" "}
              <a href="/terms-conditions" className="font-semibold text-[#2E7DF6]">
                Terms and Conditions
              </a>
            </span>
          </label>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-[#2E7DF6] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]"
          >
            Register
          </button>

          <p className="mt-3 text-center text-xs text-[#5c6577]">
            Already have an account?{" "}
            <a
              href="/register-login?tab=signin"
              className="font-semibold text-[#2E7DF6]"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
