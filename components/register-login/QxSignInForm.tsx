/* ────────── QX PROFIT — Sign in form ──────────
   Step 1: email + password. On success the server emails a one-time
   code and we switch to the OTP step (QxLoginOtp) without navigating.
   ───────────────────────────────────────────── */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import QxLoginOtp from "./QxLoginOtp";
import {
  QxCheckbox,
  QxField,
  QxInput,
  QxPasswordInput,
  QxSocialSignIn,
  QxSubmit,
} from "./QxUI";
import { qxSignInSchema, type QxSignInValues } from "./qxSchemas";

const QxSignInForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginUserMutation();
  const [otpEmail, setOtpEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QxSignInValues>({
    resolver: zodResolver(qxSignInSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: true },
  });

  /* ── step 1 submit ── */
  const submit = handleSubmit(async (values) => {
    const email = values.email.trim().toLowerCase();
    const tId = toast.loading("Checking your details...");
    try {
      const res = await login({ email, password: values.password }).unwrap();
      toast.dismiss(tId);
      if (res?.otpRequired) {
        toast.success("We emailed you a login code");
        setOtpEmail(res.email || email);
        onSuccess?.();
      }
    } catch (e: any) {
      if (e?.status === 420) {
        toast.dismiss(tId);
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        return;
      }
      toast.error(e?.data?.error || e?.data?.message || "Unable to sign in", {
        id: tId,
      });
    }
  });

  if (otpEmail) {
    return <QxLoginOtp email={otpEmail} onBack={() => setOtpEmail(null)} />;
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* ── Email ── */}
      <QxField label="Email" error={errors.email?.message}>
        <QxInput type="email" autoComplete="email" {...register("email")} />
      </QxField>

      {/* ── Password ── */}
      <QxField label="Password" error={errors.password?.message}>
        <QxPasswordInput
          autoComplete="current-password"
          {...register("password")}
        />
      </QxField>

      {/* ── Remember me + forgot password ── */}
      <div className="flex items-center justify-between">
        <QxCheckbox {...register("remember")}>Remember me</QxCheckbox>
        <Link
          href="/forgot-password"
          className="text-[13px] font-semibold text-[#5AA2FF] hover:text-[#8FBEFF]"
        >
          Forgot your password?
        </Link>
      </div>

      {/* ── Submit ── */}
      <QxSubmit
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Please wait..." : "Continue"}
      />

      {/* ── Google ── */}
      <QxSocialSignIn />
    </form>
  );
};

export default QxSignInForm;
