/* ────────── QX PROFIT — Registration form ──────────
   Country · Currency · Email · Password · Promo code, plus the two
   confirmation checkboxes, then the blue "Registration →" button.

   The visible fields mirror the Quotex sign-up form. On submit we
   map them onto the existing /register payload (name is derived
   from the email, promo code is passed through as the partner code)
   so the current backend keeps working.
   ────────────────────────────────────────────────── */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { ChevronDown } from "lucide-react";
import QxCountrySelect from "./QxCountrySelect";
import {
  QxCheckbox,
  QxField,
  QxInput,
  QxPasswordInput,
  QxSocialSignIn,
  QxSubmit,
} from "./QxUI";
import { qxRegisterSchema, type QxRegisterValues } from "./qxSchemas";

const FIXED_CURRENCY = "USDT";

const QxRegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<QxRegisterValues>({
    resolver: zodResolver(qxRegisterSchema),
    mode: "onTouched",
    defaultValues: {
      country: "",
      currency: FIXED_CURRENCY,
      email: "",
      password: "",
      confirmPassword: "",
      promoCode: "",
      ageAndAgreement: false,
      notUSTaxPayer: false,
    },
  });

  /* ── submit → map to /register payload ── */
  const submit = handleSubmit(async (values) => {
    const tId = toast.loading("Creating account...");
    try {
      const derivedName = values.email.split("@")[0] || "trader";
      await registerUser({
        name: derivedName,
        email: values.email.trim().toLowerCase(),
        password: values.password,
        confirmPassword: values.confirmPassword,
        country: values.country,
        currency: FIXED_CURRENCY,
        partnerCode: values.promoCode || "",
        promoCode: values.promoCode || "",
        notUSTaxPayer: values.notUSTaxPayer,
        acceptedAgreement: values.ageAndAgreement,
      }).unwrap();

      toast.success("Account created", { id: tId });
      onSuccess?.();
      const email = values.email.trim().toLowerCase();
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (e: any) {
      toast.error(e?.data?.error || "Registration failed", { id: tId });
    }
  });

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* ── Country / Region ── */}
      <QxField
        label="Country / Region of residence"
        error={errors.country?.message}
      >
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <QxCountrySelect value={field.value} onChange={field.onChange} />
          )}
        />
      </QxField>

      {/* ── Currency (fixed to USDT) ── */}
      <QxField label="Currency">
        <div className="flex w-full items-center justify-between px-3.5 py-3.5 text-sm text-white">
          <span>{FIXED_CURRENCY}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </QxField>

      {/* ── Email ── */}
      <QxField label="Email" error={errors.email?.message}>
        <QxInput type="email" autoComplete="email" {...register("email")} />
      </QxField>

      {/* ── Password ── */}
      <QxField label="Password" error={errors.password?.message}>
        <QxPasswordInput
          autoComplete="new-password"
          {...register("password")}
        />
      </QxField>

      {/* ── Confirm password ── */}
      <QxField
        label="Confirm password"
        error={errors.confirmPassword?.message}
      >
        <QxPasswordInput
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
      </QxField>

      {/* ── Promo code (optional) ── */}
      <QxField label="Promo code (optional)" error={errors.promoCode?.message}>
        <div className="flex items-center">
          <QxInput {...register("promoCode")} className="pr-2" />
          <span className="mr-3 shrink-0 border-l border-white/15 pl-3 text-[13px] font-semibold text-gray-500">
            Apply
          </span>
        </div>
      </QxField>

      {/* ── Confirmations ── */}
      <div className="space-y-3.5 pt-1">
        <QxCheckbox {...register("ageAndAgreement")}>
          I confirm that I am 18 years old or older and accept{" "}
          <Link href="#" className="text-[#4c9ffb]">
            Service Agreement
          </Link>
        </QxCheckbox>
        {errors.ageAndAgreement?.message ? (
          <p className="text-xs text-red-400">
            {errors.ageAndAgreement.message}
          </p>
        ) : null}

        <QxCheckbox {...register("notUSTaxPayer")}>
          I declare and confirm that I am not a citizen or resident of the US for
          tax purposes
        </QxCheckbox>
        {errors.notUSTaxPayer?.message ? (
          <p className="text-xs text-red-400">{errors.notUSTaxPayer.message}</p>
        ) : null}
      </div>

      {/* ── Submit ── */}
      <QxSubmit
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Creating account..." : "Registration"}
      />

      {/* ── Google ── */}
      <QxSocialSignIn />
    </form>
  );
};

export default QxRegisterForm;
