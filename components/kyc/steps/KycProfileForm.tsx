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

const field =
  "w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-neutral-600";

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

  const set = (k: keyof KycProfile, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    for (const [k, v] of Object.entries(form)) {
      if (!String(v).trim())
        return toast.error(`Please fill in ${k.replace(/_/g, " ")}`);
    }
    if (!agree) return toast.error("Please accept the data-use agreement");
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

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Your details</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className={field}
          placeholder="First name"
          value={form.first_name}
          onChange={(e) => set("first_name", e.target.value)}
        />
        <input
          className={field}
          placeholder="Last name"
          value={form.last_name}
          onChange={(e) => set("last_name", e.target.value)}
        />

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-neutral-400">
            Date of birth
          </label>
          <DateOfBirthPicker
            value={form.date_of_birth}
            onChange={(v) => set("date_of_birth", v)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-neutral-400">
            Country of birth
          </label>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950">
            <QxCountrySelect
              value={form.country_of_birth}
              onChange={(v) => set("country_of_birth", v)}
            />
          </div>
        </div>

        <select
          className={field}
          value={form.gender}
          onChange={(e) => set("gender", e.target.value)}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          className={`${field} sm:col-span-2`}
          placeholder="Residential address"
          value={form.residential_address}
          onChange={(e) => set("residential_address", e.target.value)}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5"
        />
        I agree that my personal data and documents may be processed for identity
        verification.
      </label>

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
