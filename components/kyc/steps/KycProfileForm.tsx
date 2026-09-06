"use client";

import QxCountrySelect from "@/components/register-login/QxCountrySelect";
import { useSaveKycProfileMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import DateOfBirthPicker from "./DateOfBirthPicker";

export type KycProfile = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  country_of_birth: string;
  gender: string;
  residential_address: string;
};

type FieldKey = keyof KycProfile | "agree";

const LABELS: Record<keyof KycProfile, string> = {
  first_name: "First name",
  last_name: "Last name",
  date_of_birth: "Date of birth",
  country_of_birth: "Country of birth",
  gender: "Gender",
  residential_address: "Residential address",
};

const baseField =
  "w-full rounded-lg border bg-neutral-950 px-3 py-2 text-sm text-white outline-none transition-colors";
const okBorder = "border-neutral-800 focus:border-neutral-600";
const errBorder = "border-red-500 focus:border-red-500";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs font-medium text-red-500">{msg}</p>;
}

export default function KycProfileForm({
  initial,
  onDone,
}: {
  initial?: Partial<KycProfile>;
  onDone: () => void;
}) {
  const [save, { isLoading }] = useSaveKycProfileMutation();
  const [form, setForm] = useState<KycProfile>({
    first_name: initial?.first_name || "",
    last_name: initial?.last_name || "",
    date_of_birth: initial?.date_of_birth || "",
    country_of_birth: initial?.country_of_birth || "",
    gender: initial?.gender || "",
    residential_address: initial?.residential_address || "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const set = (k: keyof KycProfile, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {};
    (Object.keys(LABELS) as (keyof KycProfile)[]).forEach((k) => {
      if (!String(form[k]).trim()) next[k] = `${LABELS[k]} is required`;
    });
    if (!agree)
      next.agree = "Please accept the data-use agreement to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      toast.error("Please fill in the highlighted fields");
      return;
    }
    try {
      // Backend expects camelCase keys.
      await save({
        firstName: form.first_name,
        lastName: form.last_name,
        dateOfBirth: form.date_of_birth,
        countryOfBirth: form.country_of_birth,
        gender: form.gender,
        residentialAddress: form.residential_address,
      }).unwrap();
      onDone();
    } catch (e: any) {
      toast.error(e?.data?.error || e?.data?.message || "Could not save profile");
    }
  };

  const cx = (k: keyof KycProfile) =>
    `${baseField} ${errors[k] ? errBorder : okBorder}`;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Your details</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input
            className={cx("first_name")}
            placeholder="First name"
            value={form.first_name}
            onChange={(e) => set("first_name", e.target.value)}
          />
          <FieldError msg={errors.first_name} />
        </div>
        <div>
          <input
            className={cx("last_name")}
            placeholder="Last name"
            value={form.last_name}
            onChange={(e) => set("last_name", e.target.value)}
          />
          <FieldError msg={errors.last_name} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-neutral-400">
            Date of birth
          </label>
          <div
            className={
              errors.date_of_birth
                ? "rounded-lg border border-red-500 p-px"
                : undefined
            }
          >
            <DateOfBirthPicker
              value={form.date_of_birth}
              onChange={(v) => set("date_of_birth", v)}
            />
          </div>
          <FieldError msg={errors.date_of_birth} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-neutral-400">
            Country of birth
          </label>
          <div
            className={`rounded-lg border bg-neutral-950 ${
              errors.country_of_birth ? "border-red-500" : "border-neutral-800"
            }`}
          >
            <QxCountrySelect
              value={form.country_of_birth}
              onChange={(v) => set("country_of_birth", v)}
            />
          </div>
          <FieldError msg={errors.country_of_birth} />
        </div>

        <div>
          <select
            className={cx("gender")}
            value={form.gender}
            onChange={(e) => set("gender", e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <FieldError msg={errors.gender} />
        </div>
        <div className="sm:col-span-2">
          <input
            className={cx("residential_address")}
            placeholder="Residential address"
            value={form.residential_address}
            onChange={(e) => set("residential_address", e.target.value)}
          />
          <FieldError msg={errors.residential_address} />
        </div>
      </div>

      <div>
        <label className="flex items-start gap-2 text-xs text-neutral-400">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked);
              setErrors((er) => ({ ...er, agree: undefined }));
            }}
            className="mt-0.5"
          />
          I agree that my personal data and documents may be processed for
          identity verification.
        </label>
        <FieldError msg={errors.agree} />
      </div>

      <button
        onClick={submit}
        disabled={isLoading}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50"
      >
        {isLoading ? "Saving…" : "Continue"}
      </button>
    </div>
  );
}
