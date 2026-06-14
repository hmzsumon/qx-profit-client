"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Dice3D = dynamic(() => import("@/components/model-3d/Dice3D"), {
  ssr: false,
});

export default function ModelTestPage() {
  const [result, setResult] = useState(1);
  const [rolling, setRolling] = useState(false);

  const handleRollDice = () => {
    if (rolling) return;

    const randomNumber = Math.floor(Math.random() * 6) + 1;

    setRolling(true);
    setResult(randomNumber);

    setTimeout(() => {
      setRolling(false);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#12002b] px-4 py-8 text-white">
      <div className="mx-auto flex min-h-screen max-w-[420px] items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-black text-yellow-300">
              Simple Dice Game
            </h1>

            <p className="mt-2 text-sm text-white/70">
              Roll button চাপলে ১ থেকে ৬ random number উঠবে
            </p>
          </div>

          <Dice3D result={result} rolling={rolling} />

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-center">
            <p className="text-sm font-bold text-white/60">Result</p>

            <p className="mt-1 text-5xl font-black text-yellow-300">
              {rolling ? "..." : result}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRollDice}
            disabled={rolling}
            className="mt-5 w-full rounded-2xl bg-gradient-to-b from-yellow-300 to-orange-500 px-6 py-4 text-lg font-black text-black shadow-[0_6px_0_rgba(120,53,15,0.9)] transition active:translate-y-[3px] active:shadow-[0_3px_0_rgba(120,53,15,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {rolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>
      </div>
    </main>
  );
}
