/* ────────── QX PROFIT — FAQ Section ────────── */

"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How do I know how to trade?",
    a: "Trading on our platform is simple. You predict whether an asset's price will go higher or lower within a selected time frame. We also offer free demo accounts with $10,000 virtual funds so you can practice without risk.",
  },
  {
    q: "How long does it take to withdraw funds?",
    a: "Withdrawals are processed quickly — usually within 1–3 business days depending on your payment method. Many e-wallet withdrawals are processed within minutes.",
  },
  {
    q: "What is trading platform and what is it for?",
    a: "A trading platform is software that allows you to buy and sell financial instruments like currencies, commodities, indices, and crypto. Our platform offers an intuitive interface with built-in signals and indicators.",
  },
  {
    q: "Can I trade using a phone / mobile device?",
    a: "Absolutely! Our platform is fully optimized for mobile. Download the app from Google Play or use the mobile-responsive web version from any browser on your phone or tablet.",
  },
  {
    q: "What is the minimum deposit amount?",
    a: "The minimum deposit amount is just $10 USD, making it accessible for traders at every level. You can start with a demo account for free before committing any real funds.",
  },
  {
    q: "Are there any deposit or withdrawal fees?",
    a: "We do not charge deposit fees. Withdrawal fees may vary based on the payment method selected. Please review the payment page for the latest fee schedule.",
  },
];

const QxFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0f1923] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            Here the most common questions of new traders answered here.
          </p>
        </div>

        {/* ── Accordion items ── */}
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl overflow-hidden transition-all ${
                  isOpen
                    ? "border-[#00c97a]/30 bg-[#161f2c]"
                    : "border-white/5 bg-[#161f2c] hover:border-white/10"
                }`}
              >
                {/* ── Question row ── */}
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <span className="shrink-0 text-[#00c97a]">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {/* ── Answer panel ── */}
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Corner mascot decoration ── */}
        <div className="mt-8 flex justify-end">
          <div className="text-5xl opacity-20 select-none">🤑</div>
        </div>
      </div>
    </section>
  );
};

export default QxFAQ;
