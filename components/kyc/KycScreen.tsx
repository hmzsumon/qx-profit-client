"use client";

import { useGetMyKycQuery } from "@/redux/features/auth/authApi";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import KycDocCapture from "./steps/KycDocCapture";
import KycDocPicker, { type DocType } from "./steps/KycDocPicker";
import KycProfileForm from "./steps/KycProfileForm";
import { KycApproved, KycRejected } from "./steps/KycResult";
import KycUnderReview from "./steps/KycUnderReview";

type Step = "profile" | "document" | "capture";
const ORDER: Step[] = ["profile", "document", "capture"];

export default function KycScreen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetMyKycQuery();
  const kyc = data?.kyc ?? data?.data ?? data;

  const status: string = kyc?.status || "draft";
  const [step, setStep] = useState<Step>("profile");
  const [doc, setDoc] = useState<{ type: DocType; country: string } | null>(null);
  const [resubmitting, setResubmitting] = useState(false);

  const hasProfile = useMemo(
    () =>
      Boolean(
        kyc?.first_name &&
          kyc?.last_name &&
          kyc?.date_of_birth &&
          kyc?.country_of_birth &&
          kyc?.gender &&
          kyc?.residential_address,
      ),
    [kyc],
  );

  useEffect(() => {
    if ((status === "draft" || resubmitting) && hasProfile && step === "profile")
      setStep("document");
  }, [status, resubmitting, hasProfile, step]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-neutral-400">Loading…</div>
    );
  }

  const wizard = status === "draft" || resubmitting;
  const stepIndex = ORDER.indexOf(step) + 1;

  return (
    <div className="mx-auto min-h-[calc(100dvh-4rem)] max-w-md px-4 py-6">
      <div className="mb-5 flex items-center gap-2">
        <button
          onClick={() =>
            wizard && step !== "profile"
              ? setStep(ORDER[ORDER.indexOf(step) - 1])
              : router.back()
          }
          className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-900"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-base font-semibold text-white">Identity verification</h1>
        {wizard && (
          <span className="ml-auto text-xs text-neutral-500">
            {stepIndex}/{ORDER.length}
          </span>
        )}
      </div>

      {status === "pending" && <KycUnderReview />}
      {status === "approved" && <KycApproved />}
      {status === "rejected" && !resubmitting && (
        <KycRejected
          reason={kyc?.reject_reason}
          onResubmit={() => {
            setResubmitting(true);
            setStep(hasProfile ? "document" : "profile");
          }}
        />
      )}

      {wizard && step === "profile" && (
        <KycProfileForm initial={kyc} onDone={() => setStep("document")} />
      )}
      {wizard && step === "document" && (
        <KycDocPicker
          onDone={(type, country) => {
            setDoc({ type, country });
            setStep("capture");
          }}
        />
      )}
      {wizard && step === "capture" && doc && (
        <KycDocCapture
          docType={doc.type}
          issuingCountry={doc.country}
          onSubmitted={() => {
            setResubmitting(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
