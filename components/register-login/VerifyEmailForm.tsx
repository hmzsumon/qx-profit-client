"use client";

import { AtSign, Info, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import OtpBoxes from "./OtpBoxes";
import { Button, Field } from "./UI";

/* ── helper: read email from query ─────────────────────────── */
function useEmailFromQuery() {
  const qp = useSearchParams();
  const raw = qp.get("email") ?? qp.get("eamil") ?? "";
  return useMemo(() => {
    try {
      const dec = decodeURIComponent(raw);
      const trimmed = dec.replace(/^"+|"+$/g, "").trim().toLowerCase();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      return ok ? trimmed : "";
    } catch {
      return "";
    }
  }, [raw]);
}

/* ── helper: mask email like z****m@gmail.com ─────────────── */
function maskEmail(email: string) {
  const [name, domain] = (email || "").split("@");
  if (!domain) return email;
  if (name.length <= 2) return `${name[0] ?? ""}****@${domain}`;
  return `${name[0]}****${name.slice(-1)}@${domain}`;
}

const VerifyEmailForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const router = useRouter();
  const email = useEmailFromQuery();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendEmail, { isLoading: isResending }] =
    useResendVerificationEmailMutation();

  const [code, setCode] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const canSubmit = /^\d{6}$/.test(code) && !!email;
  const showError = triedSubmit && !canSubmit;

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setTriedSubmit(true);
    if (!canSubmit) return;
    const tId = toast.loading("Verifying email...");
    try {
      const res = await verifyEmail({ email, code }).unwrap();
      toast.success(res?.message || "Email verified", { id: tId });
      onSuccess?.();
      router.push("/register-login?tab=signin");
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || "Verification failed", {
        id: tId,
      });
    }
  };

  const resend = async () => {
    if (!email) return toast.error("Email missing");
    try {
      await resendEmail({ email }).unwrap();
      toast.success("Verification code sent");
      setCooldown(30);
      setCode("");
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || "Failed to resend");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* email preview */}
      <div className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2">
        <Mail size={16} className="text-neutral-400" />
        <span className="text-sm">{email ? email : "No email found in URL"}</span>
      </div>

      {email && (
        <div className="flex items-start gap-2 rounded-md border border-emerald-700/40 bg-emerald-500/10 px-2 py-2 text-sm text-emerald-300">
          <Info size={16} className="mt-0.5 opacity-90" />
          <p className="text-xs">
            We&apos;ve sent a verification code to{" "}
            <span className="font-medium">{maskEmail(email)}</span>. Please check
            your inbox (and spam folder) and enter the code below.
          </p>
        </div>
      )}

      <Field
        label="Verification code"
        error={showError ? "Enter the 6-digit code" : undefined}
      >
        <div className="mx-auto max-w-[520px] text-center">
          <div className="mb-2 inline-flex items-center gap-2 text-[13px] text-neutral-400">
            <AtSign size={14} />
            <span>
              Enter the code we sent to:{" "}
              <span className="ml-1 font-medium text-neutral-200">
                {maskEmail(email)}
              </span>
            </span>
          </div>

          <div className="mt-1">
            <OtpBoxes
              value={code}
              onChange={setCode}
              error={showError}
              autoFocus={!!email}
              onComplete={() => submit()}
            />
          </div>

          <button
            type="button"
            onClick={resend}
            disabled={isResending || cooldown > 0}
            className="mt-3 inline-block text-sm font-medium text-yellow-400 underline decoration-yellow-400/60 underline-offset-2 hover:text-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cooldown > 0 ? `Get a new code in ${cooldown}s` : "Get a new code"}
          </button>
        </div>
      </Field>

      <Button type="submit" disabled={isLoading || !canSubmit} className="w-full">
        {isLoading ? "Verifying..." : "Verify Email"}
      </Button>

      {!email && (
        <p className="text-xs text-amber-400">
          Add ?email=you@example.com to the URL to verify.
        </p>
      )}
    </form>
  );
};

export default VerifyEmailForm;
