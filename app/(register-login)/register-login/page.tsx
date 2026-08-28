"use client";

/* ────────── QX PROFIT — Auth page (Login / Registration) ──────────
   One route, two tabs. The tab is mirrored to the URL (?tab=signin |
   ?tab=create) so the navbar "Log in" / "Sign up" links land on the
   right form.
   ──────────────────────────────────────────────────────────────── */

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import QxRegisterForm from "@/components/register-login/QxRegisterForm";
import QxSignInForm from "@/components/register-login/QxSignInForm";
import { QxAuthTabs } from "@/components/register-login/QxUI";

type Tab = "signin" | "create";

export default function AuthPage(): JSX.Element {
  /* ────────── URL <-> tab state ────────── */
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromUrl = useMemo<Tab>(
    () => (searchParams.get("tab") === "create" ? "create" : "signin"),
    [searchParams],
  );

  const [tab, setTab] = useState<Tab>(tabFromUrl);
  useEffect(() => setTab(tabFromUrl), [tabFromUrl]);

  const setTabAndUrl = (next: Tab) => {
    const sp = new URLSearchParams(Array.from(searchParams.entries()));
    sp.set("tab", next);
    router.replace(`?${sp.toString()}`, { scroll: false });
    setTab(next);
  };

  /* ────────── Render ────────── */
  return (
    <section className="mx-auto max-w-xl px-4 py-14 sm:py-20">
      {/* ── Heading ── */}
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {tab === "signin" ? "Sign In To Your Account" : "Sign Up"}
      </h1>

      {/* ── Card ── */}
      <div className="rounded-2xl bg-[#252c3d] shadow-2xl shadow-black/30">
        {/* Tabs */}
        <div className="flex justify-center border-b border-white/[0.06] px-6 py-6">
          <QxAuthTabs value={tab} onChange={setTabAndUrl} />
        </div>

        {/* Form */}
        <div className="px-6 py-8 sm:px-10">
          {tab === "signin" ? (
            <QxSignInForm />
          ) : (
            <QxRegisterForm onSuccess={() => setTabAndUrl("signin")} />
          )}
        </div>
      </div>
    </section>
  );
}
