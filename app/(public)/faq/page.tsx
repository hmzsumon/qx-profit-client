/* ────────── QX PROFIT — FAQ Page ──────────
   Full frequently-asked-questions page, grouped into three
   categories. Each category renders a shared <QxAccordion>.
   ─────────────────────────────────────────── */

import type { Metadata } from "next";
import React from "react";
import { FileText, LineChart, UserCheck } from "lucide-react";
import QxAccordion, {
  type QxAccordionItem,
} from "@/components/public/QxAccordion";

export const metadata: Metadata = {
  title: "FAQ — QX Profit",
  description:
    "Answers to the most frequently asked questions about trading, deposits, withdrawals and account verification on QX Profit.",
};

/* ────────── Data: General questions ────────── */
const GENERAL: QxAccordionItem[] = [
  {
    q: "What are digital options?",
    a: "A digital option is a contract with a fixed payout and a fixed expiry time. You predict whether the price of an asset will be higher or lower than the strike price when the contract expires — nothing more complex than that.",
  },
  {
    q: "What are the varieties of digital options?",
    a: "The most common type on QX Profit is the up/down (higher/lower) option. You choose an asset, an investment amount and an expiry time, then predict the direction of the price.",
  },
  {
    q: "What is the gist of digital options trading?",
    a: "You forecast the direction of a price move over a short period. If your forecast is correct at expiry, you receive the pre-agreed payout; if it is wrong, you lose the amount invested in that trade.",
  },
  {
    q: "How can I quickly learn how to trade?",
    a: "Open a free demo account. It comes with 10,000 USD in virtual funds so you can test strategies, indicators and expiry times without risking real money. Switch to a real account when you are confident.",
  },
  {
    q: "At what expense does the company pay profit in case of a successful trade?",
    a: "Payouts come from the overall trading flow on the platform. Because winning and losing trades are placed continuously across thousands of clients, the platform can pay a fixed percentage on every successful trade.",
  },
  {
    q: "Can I close my account, and how?",
    a: "Yes. Withdraw any remaining balance, then send a closure request from the Support section of your account. Your personal data is handled according to our privacy policy.",
  },
  {
    q: "What is the expiration period of a trade?",
    a: "Expiry times range from around 1 minute up to several hours. You select the expiry before placing each trade.",
  },
  {
    q: "What is a trading platform and why is it needed?",
    a: "It is the software that shows live price charts, indicators and the order panel you use to place trades. QX Profit runs in any modern browser and on mobile — no installation is required.",
  },
  {
    q: "What are the possible results of the placed trades?",
    a: "A trade can finish in profit (correct forecast), at a loss (incorrect forecast) or, more rarely, as a tie when the closing price equals the opening price — in which case the invested amount is returned.",
  },
  {
    q: "Is downloading a program to a computer or smartphone required?",
    a: "No. The web platform works straight from the browser. A mobile app is also available if you prefer a dedicated application.",
  },
  {
    q: "In what currency is my account opened? Can I change it?",
    a: "You choose the account currency during registration (for example USD). The base currency cannot be changed afterwards, so pick the one that suits you before you confirm.",
  },
];

/* ────────── Data: Financial questions ────────── */
const FINANCIAL: QxAccordionItem[] = [
  {
    q: "What determines the profit size?",
    a: "The payout percentage shown next to each asset, your investment amount and whether your forecast is correct at expiry. Payout percentages vary by asset and market conditions.",
  },
  {
    q: "How can I calculate the profit for a trade?",
    a: "Profit = investment amount × payout percentage. For example, a 20 USD trade at an 85% payout returns 17 USD profit (37 USD total) if the forecast is correct.",
  },
  {
    q: "What is the minimum deposit amount?",
    a: "You can fund a real account starting from 10 USD.",
  },
  {
    q: "How do I withdraw money from my account?",
    a: "Open the Withdraw section, choose the same method you used to deposit where possible, enter the amount and confirm. Funds are sent once the request is processed.",
  },
  {
    q: "Is there any fee for depositing or withdrawing funds?",
    a: "QX Profit does not charge a deposit fee. Any withdrawal fee depends on the payment provider and is displayed before you confirm the request.",
  },
  {
    q: "How often do I need to top up the account?",
    a: "There is no schedule. You add funds whenever you want to increase your trading balance; there is no recurring or maintenance charge.",
  },
  {
    q: "How long does it take to withdraw funds?",
    a: "Requests are usually processed within a few minutes and up to 3 business days, depending on the method and verification status.",
  },
  {
    q: "What is the minimum withdrawal amount?",
    a: "The minimum withdrawal is 10 USD, subject to the limits of the chosen payment method.",
  },
  {
    q: "Do I need to provide documents to make a withdrawal?",
    a: "For your first withdrawal, or above certain thresholds, identity verification (KYC) may be requested. Completing it once keeps future withdrawals fast.",
  },
];

/* ────────── Data: Registration & Verification ────────── */
const REGISTRATION: QxAccordionItem[] = [
  {
    q: "What data is required to register on the website?",
    a: "Your country of residence, account currency, a valid email address and a password. A promo code is optional.",
  },
  {
    q: "Is it possible to indicate other people's (fake) data when registering?",
    a: "No. Accounts must be registered with your own accurate details. Mismatched data will block verification and withdrawals.",
  },
  {
    q: "How do I know that I need to go through account verification?",
    a: "You will see a prompt in your account, and verification may be requested before your first withdrawal or when a security check is triggered.",
  },
  {
    q: "How long does the verification process take?",
    a: "Document review typically completes within a few hours and up to 1–2 business days.",
  },
  {
    q: "If I made a mistake entering data in my individual account, how can I fix it?",
    a: "Contact Support before verification is completed. Once an account is verified, some fields can only be changed by the Support team after an additional check.",
  },
  {
    q: "What is account verification?",
    a: "It is confirmation of your identity and payment details — usually a photo ID and, in some cases, proof of address or ownership of the payment method.",
  },
  {
    q: "How do I know that I successfully passed verification?",
    a: "Your account status updates to 'Verified' and you receive a confirmation by email.",
  },
];

/* ────────── Sub-component: one category block ────────── */
const Category: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: QxAccordionItem[];
}> = ({ icon, title, items }) => (
  <section className="mt-12 first:mt-0">
    <div className="mb-4 flex items-center gap-2.5">
      <span className="text-[#4c9ffb]">{icon}</span>
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
    <QxAccordion items={items} />
  </section>
);

export default function FaqPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      {/* ── Page header ── */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        FAQ
      </h1>
      <p className="mt-3 text-sm text-gray-400">
        Here you will find answers to frequently asked questions from traders.
      </p>

      {/* ── Categories (constrained column, like the reference) ── */}
      <div className="mt-10 max-w-3xl">
        <Category
          icon={<FileText size={18} />}
          title="General questions"
          items={GENERAL}
        />
        <Category
          icon={<LineChart size={18} />}
          title="Financial questions"
          items={FINANCIAL}
        />
        <Category
          icon={<UserCheck size={18} />}
          title="Registration and Verification"
          items={REGISTRATION}
        />
      </div>
    </div>
  );
}
