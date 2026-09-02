"use client";

import { Download, Smartphone } from "lucide-react";

const APK = "/apk/qx-profit.apk";

const STEPS = [
  "Tap “Download APK” below.",
  "Open the downloaded file. If Android warns about “unknown sources”, allow it for your browser.",
  "Install the app and sign in with your account.",
];

export default function DownloadAppPage() {
  return (
    <main className="min-h-screen bg-[#0b0e11] text-white">
      <div className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-xl font-extrabold tracking-tight">QX Profit App</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Install the Android app for faster access to your account.
        </p>

        <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-neutral-950">
              <Smartphone size={22} />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">QX Profit for Android</p>
              <p className="text-xs text-neutral-400">APK • ~1.5 MB</p>
            </div>
          </div>

          <a
            href={APK}
            download="qx-profit.apk"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-3 text-sm font-semibold text-neutral-950"
          >
            <Download size={16} /> Download APK
          </a>
        </div>

        <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <p className="text-sm font-semibold text-neutral-200">
            How to install
          </p>
          <ol className="mt-3 space-y-2 text-sm text-neutral-300">
            {STEPS.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-[11px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
