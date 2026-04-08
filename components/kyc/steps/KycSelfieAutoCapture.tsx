/* ─────────────────────────────────────────────────────────────
  KycSelfieAutoCapture
  - face-api.js → works on ALL browsers (iOS Safari, Firefox, Chrome)
  - Oval guide frame, animated border color (yellow→green on align)
  - Auto capture when face is stable in frame for 3 ticks
  - Auto compress selfie before saving
  - Manual capture button as fallback / override
───────────────────────────────────────────────────────────── */
"use client";

import {
  doneUploadSelfie,
  removeSelfie,
  startUploadSelfie,
} from "@/redux/features/kyc/kycSlice";
import { RootState } from "@/redux/store";
import {
  Camera,
  CheckCircle,
  RefreshCw,
  Trash2,
  UserCircle2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";

/* ── compress selfie ─────────────────────────────────────── */
async function compressSelfie(dataUrl: string, maxPx = 800): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width > height) {
          height = Math.round((height * maxPx) / width);
          width = maxPx;
        } else {
          width = Math.round((width * maxPx) / height);
          height = maxPx;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            const [, b64] = dataUrl.split(",");
            const bytes = atob(b64);
            const arr = new Uint8Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
            resolve(
              new File([arr], `selfie-${Date.now()}.jpg`, {
                type: "image/jpeg",
              }),
            );
            return;
          }
          resolve(
            new File([blob], `selfie-${Date.now()}.jpg`, {
              type: "image/jpeg",
            }),
          );
        },
        "image/jpeg",
        0.82,
      );
    };
    img.src = dataUrl;
  });
}

/* ─────────────────────────────────────────────────────────── */
export default function KycSelfieAutoCapture({
  stepNumber = 3,
}: {
  stepNumber?: number;
}) {
  const d = useDispatch();
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stableRef = useRef(0);
  const capturingRef = useRef(false);

  const { selfieFile, uploadingSelfie } = useSelector((s: RootState) => s.kyc);

  const [cameraReady, setCameraReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [detecting, setDetecting] = useState(true);
  const [faceAligned, setFaceAligned] = useState(false);
  const [stableCount, setStableCount] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Initializing camera...");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);

  /* preview url */
  useEffect(() => {
    if (!selfieFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selfieFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selfieFile]);

  /* ── load face-api.js models lazily ─────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const loadModels = async () => {
      try {
        // dynamic import — face-api.js is large, load only when needed
        const faceapi = await import("@vladmandic/face-api");

        // use jsdelivr CDN for model weights (no need to host locally)
        const MODEL_URL =
          "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        ]);

        if (!cancelled) {
          setModelLoaded(true);
          setStatusMsg("Position your face in the oval");
        }
      } catch (err) {
        console.warn("face-api load failed:", err);
        if (!cancelled) {
          setModelError(true);
          setStatusMsg("Position your face and tap capture");
        }
      }
    };

    loadModels();
    return () => {
      cancelled = true;
    };
  }, []);

  const videoConstraints = useMemo(
    () => ({ facingMode: "user", width: 640, height: 640 }),
    [],
  );

  /* ── helper: is face inside oval zone ───────────────────── */
  const isFaceInOval = (
    box: { x: number; y: number; width: number; height: number },
    vw: number,
    vh: number,
  ): boolean => {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const dx = Math.abs(cx - vw / 2);
    const dy = Math.abs(cy - vh / 2);
    const minW = vw * 0.18;
    const maxW = vw * 0.62;
    return (
      dx < vw * 0.16 && dy < vh * 0.2 && box.width >= minW && box.width <= maxW
    );
  };

  /* ── capture ─────────────────────────────────────────────── */
  const captureSelfie = async () => {
    if (capturingRef.current) return;
    capturingRef.current = true;
    setCapturing(true);
    setStatusMsg("Capturing...");

    if (timerRef.current) clearInterval(timerRef.current);

    const shot = webcamRef.current?.getScreenshot();
    if (!shot) {
      toast.error("Could not capture — try again");
      capturingRef.current = false;
      setCapturing(false);
      return;
    }

    d(startUploadSelfie());
    const file = await compressSelfie(shot);
    setTimeout(() => {
      d(doneUploadSelfie(file));
      setCapturing(false);
      setDetecting(false);
      toast.success("Selfie captured ✓");
    }, 250);
  };

  /* ── detection loop ──────────────────────────────────────── */
  useEffect(() => {
    if (
      !cameraReady ||
      !modelLoaded ||
      selfieFile ||
      !detecting ||
      modelError
    ) {
      if (cameraReady && !modelError && !modelLoaded)
        setStatusMsg("Loading face model...");
      if (cameraReady && (modelLoaded || modelError) && !selfieFile)
        setStatusMsg(
          modelError
            ? "Position your face and tap capture"
            : "Position your face in the oval",
        );
      return;
    }

    const run = async () => {
      try {
        const faceapi = await import("@vladmandic/face-api");
        const video = webcamRef.current?.video as HTMLVideoElement | undefined;
        if (!video || video.readyState < 2) return;

        const detection = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.4,
          }),
        );

        if (!detection) {
          stableRef.current = 0;
          setStableCount(0);
          setFaceAligned(false);
          setStatusMsg("No face detected — look at camera");
          return;
        }

        const { x, y, width, height } = detection.box;
        const ok = isFaceInOval(
          { x, y, width, height },
          video.videoWidth,
          video.videoHeight,
        );

        if (!ok) {
          stableRef.current = 0;
          setStableCount(0);
          setFaceAligned(false);
          setStatusMsg("Move face to center of oval");
          return;
        }

        stableRef.current += 1;
        const n = stableRef.current;
        setStableCount(n);
        setFaceAligned(true);
        setStatusMsg(n >= 3 ? "Capturing..." : `Hold still… ${n}/3`);

        if (n >= 3 && !capturingRef.current) {
          captureSelfie();
        }
      } catch {
        // silent — model may still be initializing
      }
    };

    timerRef.current = setInterval(run, 700);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cameraReady, modelLoaded, selfieFile, detecting, modelError]);

  /* ── retake ─────────────────────────────────────────────── */
  const retake = () => {
    d(removeSelfie());
    stableRef.current = 0;
    capturingRef.current = false;
    setStableCount(0);
    setFaceAligned(false);
    setDetecting(true);
    setCapturing(false);
    setStatusMsg("Position your face in the oval");
  };

  /* progress arc degrees */
  const progressDeg = Math.min((stableCount / 3) * 360, 360);
  const ovalBorderColor = faceAligned ? "#22c55e" : "#facc15";
  const ovalShadow = faceAligned
    ? "0 0 0 4px rgba(34,197,94,0.2), 0 0 24px rgba(34,197,94,0.15)"
    : "0 0 0 4px rgba(250,204,21,0.12)";

  /* ── render ─────────────────────────────────────────────── */
  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-900 overflow-hidden">
      {/* header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-neutral-800">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selfieFile ? "bg-emerald-500 text-white" : "bg-neutral-800 text-neutral-400"}`}
        >
          {selfieFile ? <CheckCircle className="h-4 w-4" /> : stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white text-sm">
            Selfie verification
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">
            {selfieFile
              ? "Captured successfully"
              : modelError
                ? "Manual capture mode"
                : "Auto face detection"}
          </div>
        </div>
        {/* model loading indicator */}
        {!modelLoaded && !modelError && (
          <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
            <span className="text-[10px] text-yellow-400">Loading AI</span>
          </div>
        )}
        {modelLoaded && !selfieFile && (
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">AI Ready</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {!previewUrl ? (
          <div className="space-y-3">
            {/* ── camera view ─────────────────────────────── */}
            <div
              className="relative overflow-hidden rounded-2xl bg-black"
              style={{ aspectRatio: "1 / 1" }}
            >
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={() => {
                  setCameraReady(true);
                  setStatusMsg(
                    modelLoaded
                      ? "Position your face in the oval"
                      : "Loading face model...",
                  );
                }}
                onUserMediaError={() => setStatusMsg("Camera access denied")}
                className="h-full w-full object-cover"
              />

              {/* dark vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 54% 62% at 50% 47%, transparent 55%, rgba(0,0,0,0.72) 100%)",
                }}
              />

              {/* oval face guide */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{ paddingTop: "4%" }}
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    width: "54%",
                    aspectRatio: "3 / 4",
                    borderRadius: "50%",
                    border: `2.5px solid ${ovalBorderColor}`,
                    boxShadow: ovalShadow,
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                />
              </div>

              {/* capture flash animation */}
              {faceAligned && stableCount >= 3 && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-30" />
              )}

              {/* camera not ready */}
              {!cameraReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950">
                  <UserCircle2 className="h-14 w-14 text-neutral-700" />
                  <span className="text-sm text-neutral-500">
                    Starting camera…
                  </span>
                </div>
              )}

              {/* status pill — top center */}
              {cameraReady && (
                <div
                  className={`absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors ${faceAligned ? "bg-emerald-600/80 text-white" : "bg-black/60 text-neutral-200"}`}
                >
                  {statusMsg}
                </div>
              )}

              {/* stable progress bar — bottom of camera */}
              {faceAligned && stableCount > 0 && stableCount < 3 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${(stableCount / 3) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* ── manual capture button ────────────────────── */}
            <button
              type="button"
              onClick={captureSelfie}
              disabled={!cameraReady || capturing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-3.5 font-bold text-neutral-900 transition-all hover:bg-yellow-300 active:scale-[0.97] disabled:opacity-50"
            >
              {capturing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                  Capturing…
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  Capture Selfie
                </>
              )}
            </button>
          </div>
        ) : (
          /* ── preview ──────────────────────────────────────── */
          <div className="space-y-3">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selfie"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur whitespace-nowrap">
                <CheckCircle className="h-3.5 w-3.5" />
                Selfie captured
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={retake}
                className="flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-700 active:scale-[0.97]"
              >
                <RefreshCw className="h-4 w-4" />
                Retake
              </button>
              <button
                type="button"
                onClick={() => d(removeSelfie())}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500 active:scale-[0.97]"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
