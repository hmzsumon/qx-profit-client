/* ────────── QX PROFIT — About: mission ──────────
   Platform screenshot with a "300+ assets" badge on the left,
   the "we want everyone to..." mission copy on the right.
   ─────────────────────────────────────────────── */

import Image from "next/image";
import React from "react";
import platformShot from "@/public/images/main-platform-3x.png";

const QxAboutMission: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* ── Screenshot + assets badge ── */}
        <div className="relative">
          <div className="absolute -left-3 -top-3 z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#2e90fa] text-white shadow-lg shadow-[#2e90fa]/30">
            <span className="text-lg font-black leading-none">300+</span>
            <span className="text-[10px] leading-none">assets</span>
          </div>
          <Image
            src={platformShot}
            alt="QX Profit trading terminal"
            placeholder="blur"
            className="w-full rounded-xl border border-white/10 shadow-2xl shadow-black/50"
          />
        </div>

        {/* ── Mission copy ── */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[30px]">
            We want everyone to be able to fulfil their goals and take their
            opportunities.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Our team did not build just another project for traders. First of
            all, we built a platform for the widest possible audience — for
            people who want to learn how to use modern financial instruments and
            grow their financial skills.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            When it comes to tools, QX Profit gives every client access to a
            large set of free instruments so you can trade the way that suits
            you. Choose any market: currency pairs, stocks, indices, metals, oil,
            gas — as well as the main trend of recent years, cryptocurrencies.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default QxAboutMission;
