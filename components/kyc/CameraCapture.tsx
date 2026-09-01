"use client";

/*
  Reusable camera capture widget.
  - Live camera preview with a framing guide (rect for docs, oval for selfie).
  - "Capture" freezes a frame and returns it as a File (jpeg).
  - If the camera can't start (permission / no device / http), or the user taps
    "Upload instead", it falls back to a native file picker (with `capture` so
    mobiles still open the camera app).
*/

import { Camera, RefreshCw, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export type CameraGuide = "rect" | "oval";

export function dataUrlToFile(dataUrl: string, name: string): File {
  const [head, b64] = dataUrl.split(",");
  const mime = /:(.*?);/.exec(head)?.[1] || "image/jpeg";
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new File([arr], name, { type: mime });
}

type Props = {
  label: string;
  facingMode?: "environment" | "user";
  guide?: CameraGuide;
  value?: File | null;
  onCapture: (file: File) => void;
  onClear?: () => void;
};

export default function CameraCapture({
  label,
  facingMode = "environment",
  guide = "rect",
  value,
  onCapture,
  onClear,
}: Props) {
  const camRef = useRef<Webcam>(null);
  const [camError, setCamError] = useState(false);
  const [useUpload, setUseUpload] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const snap = useCallback(() => {
    const shot = camRef.current?.getScreenshot();
    if (!shot) return;
    onCapture(dataUrlToFile(shot, `${label.replace(/\s+/g, "-")}-${Date.now()}.jpg`));
  }, [label, onCapture]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onCapture(f);
    e.target.value = "";
  };

  const showFallback = camError || useUpload;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3">
      <p className="mb-2 text-sm font-medium text-neutral-200">{label}</p>

      {preview ? (
        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt={label} className="h-full w-full object-contain" />
          </div>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs text-neutral-200"
          >
            <RefreshCw size={14} /> Retake
          </button>
        </div>
      ) : showFallback ? (
        <label className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 text-neutral-400">
          <Upload size={22} />
          <span className="text-xs">Tap to upload a photo</span>
          <input
            type="file"
            accept="image/*"
            capture={facingMode === "user" ? "user" : "environment"}
            onChange={onFile}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
            <Webcam
              ref={camRef}
              audio={false}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.9}
              videoConstraints={{ facingMode }}
              onUserMediaError={() => setCamError(true)}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className={
                  guide === "oval"
                    ? "h-[78%] w-[58%] rounded-[50%] border-2 border-white/70"
                    : "h-[70%] w-[88%] rounded-lg border-2 border-white/70"
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={snap}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-neutral-950"
            >
              <Camera size={16} /> Capture
            </button>
            <button
              type="button"
              onClick={() => setUseUpload(true)}
              className="rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300"
            >
              Upload instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
