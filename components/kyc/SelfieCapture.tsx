"use client";

/*
  Selfie capture with face-detection auto-capture.
  - Loads the TinyFaceDetector weights from /models (bundled in public/).
  - Auto-captures once a single face is centered and steady for ~1.2s.
  - Manual "Capture", "Retake", and "Upload a photo instead" fallbacks.
  - If the camera or the model fails to load, shows the upload fallback.
*/

import { Camera, RefreshCw, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { dataUrlToFile } from "./CameraCapture";

type Props = {
  value?: File | null;
  onCapture: (file: File) => void;
  onClear?: () => void;
};

export default function SelfieCapture({ value, onCapture, onClear }: Props) {
  const camRef = useRef<Webcam>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const steadyRef = useRef(0);
  const doneRef = useRef(false);

  const [camError, setCamError] = useState(false);
  const [useUpload, setUseUpload] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [hint, setHint] = useState("Position your face in the circle");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      doneRef.current = false;
      steadyRef.current = 0;
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const capture = useCallback(() => {
    if (doneRef.current) return;
    const shot = camRef.current?.getScreenshot();
    if (!shot) return;
    doneRef.current = true;
    onCapture(dataUrlToFile(shot, `selfie-${Date.now()}.jpg`));
  }, [onCapture]);

  // Load model weights once.
  useEffect(() => {
    if (preview || camError || useUpload) return;
    let cancelled = false;
    (async () => {
      try {
        const faceapi = await import("@vladmandic/face-api");
        if (!faceapi.nets.tinyFaceDetector.isLoaded) {
          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        }
        if (!cancelled) setModelReady(true);
      } catch {
        if (!cancelled) {
          setUseUpload(true);
          setHint("Auto-capture unavailable — please upload a selfie");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [preview, camError, useUpload]);

  // Detection loop.
  useEffect(() => {
    if (!modelReady || preview || camError || useUpload) return;
    let stopped = false;

    const tick = async () => {
      const video = camRef.current?.video as HTMLVideoElement | undefined;
      if (!video || video.readyState !== 4 || stopped) return;
      try {
        const faceapi = await import("@vladmandic/face-api");
        const res = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }),
        );
        if (stopped) return;
        if (!res) {
          steadyRef.current = 0;
          setHint("Position your face in the circle");
          return;
        }
        const { x, width, height } = res.box;
        const cx = (x + width / 2) / video.videoWidth;
        const wr = width / video.videoWidth;
        const centered = cx > 0.32 && cx < 0.68;
        const sized = wr > 0.28 && wr < 0.72;
        if (centered && sized) {
          steadyRef.current += 1;
          setHint(steadyRef.current >= 2 ? "Hold still…" : "Almost there…");
          if (steadyRef.current >= 3) capture();
        } else {
          steadyRef.current = 0;
          setHint(
            !sized
              ? wr <= 0.28
                ? "Move a little closer"
                : "Move a little back"
              : "Center your face",
          );
        }
      } catch {
        /* transient */
      }
    };

    timerRef.current = setInterval(tick, 450);
    return () => {
      stopped = true;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [modelReady, preview, camError, useUpload, capture]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onCapture(f);
    e.target.value = "";
  };

  const showFallback = camError || useUpload;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3">
      <p className="mb-2 text-sm font-medium text-neutral-200">Selfie</p>

      {preview ? (
        <div className="space-y-2">
          <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="selfie" className="h-full w-full object-cover" />
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
        <label className="flex aspect-[3/4] w-full max-w-xs cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 text-neutral-400">
          <Upload size={22} />
          <span className="px-4 text-center text-xs">{hint}</span>
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={onFile}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-2">
          <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-black">
            <Webcam
              ref={camRef}
              audio={false}
              mirrored
              screenshotFormat="image/jpeg"
              screenshotQuality={0.92}
              videoConstraints={{ facingMode: "user" }}
              onUserMediaError={() => setCamError(true)}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[72%] w-[62%] rounded-[50%] border-2 border-white/70" />
            </div>
            <div className="absolute inset-x-0 bottom-1 text-center text-[11px] text-white/90">
              {modelReady ? hint : "Starting camera…"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={capture}
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
