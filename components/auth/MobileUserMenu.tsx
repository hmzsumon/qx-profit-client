/* ────────── Compact mobile profile menu (right of the bell) ────────── */
"use client";

import { getErrorMessage } from "@/lib/getErrorMessage";
import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import {
  Check,
  Copy,
  Grid2x2,
  Home,
  LogOut,
  Settings,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const LINKS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: Grid2x2 },
  { label: "Profit Ranking", href: "/profit-ranking", icon: Trophy },
  { label: "Settings", href: "/settings/profile", icon: Settings },
];

export default function MobileUserMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useSelector((s: any) => s.auth);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    if (!user?.customerId) return;
    try {
      await navigator.clipboard.writeText(user.customerId);
      setCopied(true);
      toast.success("ID copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(undefined).unwrap();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      window.location.assign("/register-login?tab=signin");
    }
  };

  return (
    <div
      className={`absolute right-0 top-12 w-64 rounded-xl border border-neutral-800 bg-neutral-950/95 p-2 shadow-xl backdrop-blur transition-all ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
      role="menu"
    >
      <div className="flex items-center gap-3 rounded-lg p-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white">
            {user?.name || "Trader"}
          </div>
          <div className="truncate text-xs text-neutral-400">{user?.email}</div>
        </div>
      </div>

      {user?.customerId && (
        <button
          onClick={copyId}
          className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-neutral-300 hover:bg-neutral-900"
        >
          <span>ID: {user.customerId}</span>
          {copied ? (
            <Check size={13} className="text-[#12b76a]" />
          ) : (
            <Copy size={13} />
          )}
        </button>
      )}

      <div className="my-1 border-t border-neutral-900" />

      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-neutral-200 hover:bg-neutral-900"
          role="menuitem"
        >
          <l.icon size={16} />
          {l.label}
        </Link>
      ))}

      <div className="my-1 border-t border-neutral-900" />

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-900 disabled:opacity-60"
        role="menuitem"
      >
        <LogOut size={16} />
        {isLoading ? "Signing out..." : "Log out"}
      </button>
    </div>
  );
}
