"use client";

import CameraCapture from "@/components/kyc/CameraCapture";
import SelfieCapture from "@/components/kyc/SelfieCapture";
import { useSubmitKycDocumentsMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import type { DocType } from "./KycDocPicker";

export default function KycDocCapture({
  docType,
  issuingCountry,
  onSubmitted,
}: {
  docType: DocType;
  issuingCountry: string;
  onSubmitted: () => void;
}) {
  const needsBack = docType !== "passport";
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [submit, { isLoading }] = useSubmitKycDocumentsMutation();

  const ready = !!front && (!needsBack || !!back) && !!selfie;

  const send = async () => {
    if (!ready) return toast.error("Please capture all required photos");
    const fd = new FormData();
    fd.append("docType", docType);
    fd.append("issuingCountry", issuingCountry);
    fd.append("frontImage", front as File);
    if (needsBack && back) fd.append("backImage", back);
    fd.append("selfieImage", selfie as File);
    try {
      await submit(fd).unwrap();
      toast.success("Submitted for review");
      onSubmitted();
    } catch (e: any) {
      toast.error(e?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Capture your {docType === "passport" ? "passport" : "document"}
      </h2>

      <CameraCapture
        label={needsBack ? "Front side" : "Photo page"}
        facingMode="environment"
        guide="rect"
        value={front}
        onCapture={setFront}
        onClear={() => setFront(null)}
      />

      {needsBack && (
        <CameraCapture
          label="Back side"
          facingMode="environment"
          guide="rect"
          value={back}
          onCapture={setBack}
          onClear={() => setBack(null)}
        />
      )}

      <SelfieCapture
        value={selfie}
        onCapture={setSelfie}
        onClear={() => setSelfie(null)}
      />

      <button
        onClick={send}
        disabled={!ready || isLoading}
        className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-50"
      >
        {isLoading ? "Submitting…" : "Submit for review"}
      </button>
    </div>
  );
}
