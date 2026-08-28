/* ────────── QX PROFIT — FAQ teaser (home) ──────────
   Six of the most common questions in an accordion, plus a
   "still have questions?" prompt linking to the full /faq page.
   ────────────────────────────────────────────────── */

import Link from "next/link";
import React from "react";
import { Armchair } from "lucide-react";
import QxAccordion, { type QxAccordionItem } from "./QxAccordion";

/* ────────── Data: teaser questions ────────── */
const FAQS: QxAccordionItem[] = [
  {
    q: "How do I learn how to trade?",
    a: "Open a free demo account with 10,000 USD in virtual funds. Practise placing up/down trades with zero risk, then switch to a real account whenever you feel ready.",
  },
  {
    q: "How long does it take to withdraw funds?",
    a: "Most withdrawal requests are processed within a few minutes and up to 3 business days, depending on the payment method you choose.",
  },
  {
    q: "What is a trading platform and what is it for?",
    a: "A trading platform is the software you use to analyse price charts and place trades on assets such as currencies, commodities, indices and crypto. QX Profit runs in your browser and on mobile.",
  },
  {
    q: "Can I trade using a phone / mobile device?",
    a: "Yes. QX Profit is fully responsive and there is a dedicated mobile app, so you can trade from any phone or tablet with an internet connection.",
  },
  {
    q: "What is the minimum deposit amount?",
    a: "You can open a real account starting from just 10 USD.",
  },
  {
    q: "Are there any deposit or withdrawal fees?",
    a: "QX Profit does not charge a deposit fee. Withdrawal fees, if any, depend on the selected payment provider and are shown before you confirm.",
  },
];

const QxFAQ: React.FC = () => (
  <section className="bg-[#161b27] py-16 sm:py-20">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* ── Section header ── */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[32px]">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          See the most common questions of new traders answered here.
        </p>
      </div>

      {/* ── Accordion ── */}
      <QxAccordion items={FAQS} />

      {/* ── Still-have-questions prompt ── */}
      <div className="mt-10 flex items-center justify-between gap-4 rounded-2xl bg-[#1c2230] px-5 py-4">
        <p className="text-[13px] text-gray-300">
          Do you have some questions? Go to all questions in the{" "}
          <Link href="/faq" className="font-semibold text-[#4c9ffb]">
            FAQ section
          </Link>{" "}
          or{" "}
          <Link href="/faq" className="font-semibold text-[#4c9ffb]">
            contact us
          </Link>
          .
        </p>
        <Armchair size={40} className="hidden shrink-0 text-[#12b76a] sm:block" />
      </div>
    </div>
  </section>
);

export default QxFAQ;
