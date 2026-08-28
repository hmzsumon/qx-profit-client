/* ────────── QX PROFIT — About: intro + founding story ──────────
   Page heading, the "new level platform" statement, the team
   paragraph and a small founding-year timeline on the right.
   ──────────────────────────────────────────────────────────── */

import React from "react";
import QxLogo from "./QxLogo";

const QxAboutIntro: React.FC = () => (
  <section className="bg-[#161b27] pt-14 sm:pt-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* ── Page heading ── */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        About us
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* ── Story copy ── */}
        <div>
          <p className="text-lg font-bold text-white">
            QX Profit — it is a new level trading platform.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Our team launched the project in 2019, and it has already managed to
            establish itself. Each of our developers is a specialist of the
            highest level with many years of experience. Some of them have given
            more than 10 years of their careers to sharpening their engineering
            skills, and the team&apos;s combined experience adds up to more than
            200 years. That experience is what helped us find the right
            mechanisms to build a genuinely modern platform.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            QX Profit was built around one idea: fast, honest and transparent
            trading that anyone can start — whether you open your first trade
            today or you have been trading for years.
          </p>
        </div>

        {/* ── Founding timeline ── */}
        <div className="rounded-2xl border border-white/[0.05] bg-[#1c2230] p-6">
          <div className="flex items-center justify-between">
            {["2019", "2021", "2023", "2026"].map((year, i) => (
              <div key={year} className="flex flex-col items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === 0 ? "bg-[#12b76a]" : "bg-white/20"
                  }`}
                />
                <span
                  className={`text-xs ${
                    i === 0 ? "font-bold text-white" : "text-gray-500"
                  }`}
                >
                  {year}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-px w-full bg-white/10" />
          <div className="mt-5 flex items-center justify-center">
            <QxLogo size={22} href={null} />
          </div>
          <p className="mt-3 text-center text-xs text-gray-500">
            From a small dev team to a platform used by traders in 100+ countries.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default QxAboutIntro;
