/* QX Profit brand logo — thin wrapper kept for existing imports.
   All rendering lives in the single source of truth: components/branding/BrandLogo. */

import React from "react";
import BrandLogo from "@/components/branding/BrandLogo";

type QxLogoProps = {
  size?: number;
  markOnly?: boolean;
  href?: string | null;
  className?: string;
};

const QxLogo: React.FC<QxLogoProps> = ({
  size = 30,
  markOnly = false,
  href = "/",
  className = "",
}) => (
  <BrandLogo
    size={size}
    variant={markOnly ? "mark" : "full"}
    href={href}
    className={className}
  />
);

export default QxLogo;
