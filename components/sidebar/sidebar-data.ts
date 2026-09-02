// Central place to edit menu items
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Clock4,
  Download,
  FileText,
  Grid2x2,
  LifeBuoy,
  Megaphone,
  Network,
  Settings,
  ShieldHalf,
  Smartphone,
  SquareGanttChart,
  TrendingUp,
  Upload,
  Wallet,
} from "lucide-react";

export type NavChild = { label: string; sublabel?: string; href: string };
export type NavItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: "new" | number;
  children?: NavChild[];
  section?: "default" | "bottom";
};

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: Grid2x2, href: "/dashboard" },
  {
    key: "announcements",
    label: "Announcements",
    icon: Megaphone,
    href: "/announcements",
  },
  {
    key: "ai-accounts",
    label: "QX Broker",
    icon: Bot,
    href: "/ai-accounts",
  },
  { key: "deposit", label: "Deposit", icon: Download, href: "/deposit" },
  { key: "withdraw", label: "Withdraw", icon: Upload, href: "/withdraw" },
  {
    key: "trade-investment",
    label: "QX Investment",
    icon: TrendingUp,
    href: "/trade-investment",
    badge: "new",
  },
  {
    key: "rank-reward",
    label: "Rank Reward",
    icon: ShieldHalf,
    href: "/rank-reward",
  },
  {
    key: "wallet",
    label: "Wallet",
    icon: Wallet,

    href: "/wallet/p2p",
  },
  {
    key: "history",
    label: "Transactions",
    icon: Clock4,
    href: "/transactions",
  },
  {
    key: "business-plan",
    label: "Business Plan",
    icon: FileText,
    href: "/business-plan",
  },
  {
    key: "download-app",
    label: "Download App",
    icon: Smartphone,
    href: "/download-app",
  },

  {
    key: "agent-zone",
    label: "Agent zone",
    icon: Network,

    children: [
      { label: "My referral", href: "/agent-zone/referral" },
      {
        label: "My clients",
        href: "/agent-zone/clients",
      },
    ],
  },

  {
    key: "settings",
    label: "Settings",
    icon: Settings,

    children: [
      { label: "Profile", href: "/settings/profile" },
      {
        label: "Security",
        href: "/settings/security",
      },
    ],
  },

  // {
  //   key: "chat",
  //   label: "Live Chat",
  //   icon: MessageSquare,
  //   href: "/dashboard/chat",
  //   section: "bottom",
  // },
  {
    key: "support",
    label: "Support",
    icon: LifeBuoy,
    href: "/support",
  },
];

export const INVITE_CARD = {
  title: "Invite friends and earn money",
  icon: SquareGanttChart,
  href: "/agent-zone/referral",
};
