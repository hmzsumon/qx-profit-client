/* ────────── QX PROFIT — Sign in form ──────────
   Email + password + "remember me" + "forgot password", then the
   blue "Sign in →" button and the Google option.
   Wiring (RTK Query login mutation) is kept from the original form.
   ───────────────────────────────────────────── */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useLoginUserMutation } from "@/redux/features/auth/authApi";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QxSignInValues>({
    resolver: zodResolver(qxSignInSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "", remember: true },
  });

  /* ── submit ── */
  const submit = handleSubmit(async (values) => {
    const tId = toast.loading("Signing in...");
    try {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      toast.success("Signed in", { id: tId });
      onSuccess?.();
      router.push("/dashboard");
    } catch (e: any) {
      if (e?.status === 420) {
        const email = values.email.trim().toLowerCase();
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      }
      toast.error(e?.data?.error || "Unable to sign in", { id: tId });
    }
  });

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* ── Email ── */}
      <QxField label="Email" error={errors.email?.message}>
        <QxInput
          type="email"
          autoComplete="email"
          {...register("email")}
        />
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
          className="text-[13px] font-semibold text-[#4c9ffb] hover:text-[#7bb8fc]"
        >
          Forgot your password?
        </Link>
      </div>

      {/* ── Submit ── */}
      <QxSubmit
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Signing in..." : "Sign in"}
      />

      {/* ── Google ── */}
      <QxSocialSignIn />
    </form>
  );
};

export default QxSignInForm;
