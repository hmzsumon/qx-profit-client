"use client";

import {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
  useGetSupportInfoQuery,
  useReplyToMyTicketMutation,
  type Ticket,
} from "@/redux/features/support/supportApi";
import {
  BookOpen,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = [
  { v: "deposit", l: "Deposit" },
  { v: "withdraw", l: "Withdraw" },
  { v: "kyc", l: "KYC / verification" },
  { v: "investment", l: "QX Investment" },
  { v: "account", l: "Account" },
  { v: "other", l: "Other" },
];

const card =
  "rounded-xl border border-neutral-800 bg-neutral-900/60 p-4";
const statusCls: Record<string, string> = {
  open: "bg-blue-500/15 text-blue-300",
  pending: "bg-amber-500/15 text-amber-300",
  resolved: "bg-emerald-500/15 text-emerald-300",
  closed: "bg-neutral-700/40 text-neutral-300",
};

function waLink(v: string) {
  const digits = v.replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}
function tgLink(v: string) {
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return `https://t.me/${v.replace(/^@/, "")}`;
}

export default function SupportPage() {
  const { data: info } = useGetSupportInfoQuery();
  const { data: tickets = [], isLoading } = useGetMyTicketsQuery();

  const [createTicket, { isLoading: creating }] = useCreateTicketMutation();
  const [replyTicket, { isLoading: replying }] = useReplyToMyTicketMutation();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("other");
  const [message, setMessage] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim().length < 3) return toast.error("Add a short subject");
    if (message.trim().length < 5) return toast.error("Describe your issue");
    try {
      await createTicket({ subject, category, message }).unwrap();
      toast.success("Ticket submitted");
      setSubject("");
      setMessage("");
      setCategory("other");
    } catch (e: any) {
      toast.error(e?.data?.message || "Could not submit");
    }
  };

  const sendReply = async (id: string) => {
    if (reply.trim().length < 2) return;
    try {
      await replyTicket({ id, message: reply }).unwrap();
      setReply("");
      toast.success("Reply sent");
    } catch (e: any) {
      toast.error(e?.data?.message || "Could not send");
    }
  };

  const channels = [
    info?.email && {
      icon: MessageCircle,
      label: "Email",
      value: info.email,
      href: `mailto:${info.email}`,
    },
    info?.telegram && {
      icon: Send,
      label: "Telegram",
      value: info.telegram,
      href: tgLink(info.telegram),
    },
    info?.whatsapp && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: info.whatsapp,
      href: waLink(info.whatsapp),
    },
    info?.hotline && {
      icon: Phone,
      label: "Hotline",
      value: info.hotline,
      href: `tel:${info.hotline.replace(/\s/g, "")}`,
    },
  ].filter(Boolean) as {
    icon: any;
    label: string;
    value: string;
    href: string;
  }[];

  return (
    <main className="mx-auto max-w-4xl px-3 py-6 text-white">
      <h1 className="text-2xl font-extrabold tracking-tight">Need help?</h1>
      <p className="mt-1 text-sm text-neutral-400">
        Reach us through any channel below, or open a support ticket.
        {info?.workingHours ? ` We're available ${info.workingHours}.` : ""}
      </p>

      {/* contact channels */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`${card} flex items-center gap-3 hover:border-neutral-700`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2E7DF6]/15 text-[#5AA2FF]">
              <c.icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-xs text-neutral-400">{c.label}</div>
              <div className="truncate text-sm font-semibold">{c.value}</div>
            </div>
          </a>
        ))}
      </div>

      {/* quick links */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={info?.faqUrl || "/faq"}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-3 py-2 text-sm hover:bg-neutral-800"
        >
          <BookOpen className="h-4 w-4" /> FAQs
        </Link>
        {info?.apkUrl && (
          <a
            href={info.apkUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-3 py-2 text-sm hover:bg-neutral-800"
          >
            <Smartphone className="h-4 w-4" /> Download app
          </a>
        )}
        {info?.businessPlanPdfUrl && (
          <a
            href={info.businessPlanPdfUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 px-3 py-2 text-sm hover:bg-neutral-800"
          >
            <FileText className="h-4 w-4" /> Business plan
          </a>
        )}
      </div>

      {/* new ticket */}
      <form onSubmit={submit} className={`${card} mt-6`}>
        <h2 className="text-base font-bold">Open a ticket</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
          >
            {CATEGORIES.map((c) => (
              <option key={c.v} value={c.v}>
                {c.l}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue…"
          rows={4}
          className="mt-3 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
        />
        <button
          type="submit"
          disabled={creating}
          className="mt-3 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 disabled:opacity-50"
        >
          {creating ? "Submitting…" : "Submit ticket"}
        </button>
      </form>

      {/* my tickets */}
      <div className="mt-6">
        <h2 className="mb-2 text-base font-bold">My tickets</h2>
        {isLoading && <p className="text-sm text-neutral-400">Loading…</p>}
        {!isLoading && tickets.length === 0 && (
          <p className="text-sm text-neutral-400">No tickets yet.</p>
        )}
        <div className="space-y-2">
          {tickets.map((t: Ticket) => (
            <div key={t._id} className={card}>
              <button
                onClick={() => setOpenId(openId === t._id ? null : t._id)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {t.subject}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {new Date(t.createdAt).toLocaleString()} · {t.category}
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    statusCls[t.status] || ""
                  }`}
                >
                  {t.status}
                </span>
              </button>

              {openId === t._id && (
                <div className="mt-3 space-y-2 border-t border-neutral-800 pt-3">
                  <div className="rounded-lg bg-neutral-950 p-3 text-sm">
                    <div className="mb-1 text-[11px] text-neutral-500">You</div>
                    {t.message}
                  </div>
                  {t.replies.map((r, i) => (
                    <div
                      key={i}
                      className={`rounded-lg p-3 text-sm ${
                        r.from === "admin"
                          ? "bg-[#2E7DF6]/10"
                          : "bg-neutral-950"
                      }`}
                    >
                      <div className="mb-1 text-[11px] text-neutral-500">
                        {r.from === "admin" ? "Support" : "You"} ·{" "}
                        {new Date(r.createdAt).toLocaleString()}
                      </div>
                      {r.message}
                    </div>
                  ))}

                  {t.status !== "closed" && (
                    <div className="flex gap-2">
                      <input
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write a reply…"
                        className="flex-1 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-neutral-600"
                      />
                      <button
                        onClick={() => sendReply(t._id)}
                        disabled={replying}
                        className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-neutral-950 disabled:opacity-50"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
