/* ────────── QX PROFIT — Footer ────────── */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/public/logo/logo_01.png";

const footerLinks = {
  Help: ["Support", "About us", "Community"],
  Trade: ["Trading conditions", "Accounts", "Demo account"],
  Legal: ["Privacy Policy", "Terms of Service", "AML Policy"],
  More: ["Blog", "Contact", "Careers"],
};

const QxFooter: React.FC = () => (
  <footer className="bg-[#0a1017] border-t border-white/5 text-gray-400">

    {/* ── Main footer grid ── */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">

        {/* ── Brand column ── */}
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <Image
            src={LogoImg}
            alt="QX Profit"
            width={110}
            height={36}
            className="object-contain mb-4"
          />
          <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
            QX Profit is an innovative platform for smart investments. Trade
            forex, crypto, indices and commodities with confidence.
          </p>
        </div>

        {/* ── Link columns ── */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h5 className="text-white text-sm font-semibold mb-3">{heading}</h5>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* ── Risk warning & bottom bar ── */}
    <div className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-[10px] text-gray-600 leading-relaxed mb-4">
          <strong className="text-gray-500">Risk Warning:</strong> Trading
          digital options involves significant risk of loss and is not suitable
          for all investors. The high degree of leverage can work against you as
          well as for you. Before deciding to trade, you should carefully
          consider your investment objectives, level of experience, and risk
          appetite. Past performance is not indicative of future results.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} QX Profit. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default QxFooter;
