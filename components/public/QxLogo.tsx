/* ────────── QX PROFIT — Brand Logo (mark + wordmark) ────────── */

import Link from "next/link";
import React from "react";

type QxLogoProps = {
  /* ── overall height of the mark in px (wordmark scales with it) ── */
  size?: number;
  /* ── hide the "QX PROFIT" text, show only the cube mark ── */
  markOnly?: boolean;
  /* ── wrap in a <Link> to a given href (default "/") ── */
  href?: string | null;
  className?: string;
};

const QxLogo: React.FC<QxLogoProps> = ({
  size = 30,
  markOnly = false,
  href = "/",
  className = "",
}) => {
  /* ── The isometric hex-cube mark (stroke style, matches Quotex) ── */
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M16 2.5 28 9v14L16 29.5 4 23V9L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 2.5V16M16 16 4 9m12 7 12-7M16 16v13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );

  /* ── Mark + wordmark row ── */
  const content = (
    <span
      className={`inline-flex items-center gap-2 text-white ${className}`}
      style={{ lineHeight: 1 }}
    >
      {mark}
      {!markOnly && (
        <span
          className="font-extrabold tracking-[0.14em]"
          style={{ fontSize: size * 0.62 }}
        >
          QX&nbsp;PROFIT
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }
  return content;
};

export default QxLogo;
