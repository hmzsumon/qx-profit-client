/* ────────── QX PROFIT — Login OTP step ──────────
   Shown after email + password succeed: enter the 6-digit code that
   was emailed, then the session is issued.
   ─────────────────────────────────────────────── */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  useLoginResendOtpMutation,
  useLoginVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import OtpBoxes from "./OtpBoxes";
import { QxSubmit } from "./QxUI";

function maskEmail(email: string) {
  const [name, domain] = (email || "").split("@");
  if (!domain) return email;
  if (name.length <= 2) return `${name[0] ?? ""}****@${domain}`;
  return `${name[0]}****${name.slice(-1)}@${domain}`;
}

const QxLoginOtp: React.FC<{ email: string; onBack: () => void }> = ({
  email,
  onBack,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [verifyOtp, { isLoading }] = useLoginVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useLoginResendOtpMutation();

  const [code, setCode] = useState("");
  const [tried, setTried] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  const canSubmit = /^\d{6}$/.test(code);
  const showError = tried && !canSubmit;

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setTried(true);
    if (!canSubmit) return;
    const tId = toast.loading("Verifying code...");
    try {
      await verifyOtp({ email, otp: code }).unwrap();
      toast.success("Signed in", { id: tId });
      router.push(next);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.data?.error || "Invalid code", {
        id: tId,
      });
    }
  };

  const resend = async () => {
    const tId = toast.loading("Sending a new code...");
    try {
      await resendOtp({ email }).unwrap();
      toast.success("A new code has been sent", { id: tId });
      setCode("");
      setCooldown(30);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend", { id: tId });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <p className="text-center text-sm text-gray-400">
        Enter the 6-digit code we emailed to{" "}
        <span className="font-medium text-gray-200">{maskEmail(email)}</span>
      </p>

      <div>
        <OtpBoxes
          value={code}
          onChange={setCode}
          error={showError}
          autoFocus
          onComplete={() => submit()}
        />
        {showError && (
          <p className="mt-2 text-center text-xs text-red-400">
            Enter the 6-digit code
          </p>
        )}
      </div>

      <QxSubmit
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Verifying..." : "Verify & sign in"}
      />

      <div className="flex items-center justify-between text-[13px]">
        <button
          type="button"
          onClick={onBack}
          className="font-semibold text-gray-400 hover:text-gray-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={resend}
          disabled={isResending || cooldown > 0}
          className="font-semibold text-[#5AA2FF] hover:text-[#8FBEFF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </form>
  );
};

export default QxLoginOtp;
