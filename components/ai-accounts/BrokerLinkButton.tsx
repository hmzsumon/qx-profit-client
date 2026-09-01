"use client";

import { useGetBrokerLinkQuery } from "@/redux/features/qx-broker/qxBrokerApi";
import { ArrowUpRight } from "lucide-react";

/*
  "Open QX Broker" button. The destination link is set by admin
  (QX Broker page -> Broker link). Renders nothing until a link is set.
*/
export default function BrokerLinkButton({
  className = "",
}: {
  className?: string;
}) {
  const { data } = useGetBrokerLinkQuery();
  const url = (data?.brokerUrl || "").trim();
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-lg shadow-emerald-500/20 transition-transform active:scale-[0.98] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">Open QX Broker</span>
      <ArrowUpRight
        size={18}
        className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
