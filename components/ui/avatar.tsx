/* ────────── Avatar with default fallback ────────── */
"use client";

import { useState } from "react";

const DEFAULT_SRC = "/images/default-avatar.png";

type Props = {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
};

export default function Avatar({ src, name, size = 40, className = "" }: Props) {
  const [errored, setErrored] = useState(false);
  const url = !src || errored ? DEFAULT_SRC : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name ? `${name} avatar` : "avatar"}
      width={size}
      height={size}
      onError={() => setErrored(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
