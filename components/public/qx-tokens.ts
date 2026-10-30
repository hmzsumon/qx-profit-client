/* ──────────────────────────────────────────────────────────────
   QX PROFIT — Public site design tokens
   ------------------------------------------------------------------
   Single source of truth for the colours / spacing used across the
   public marketing pages (Home, FAQ, Login, Registration, footer…).
   Palette follows the partner-program reference: deep navy surfaces
   with a blue primary CTA. Green is reserved for positive money
   figures only.
   ────────────────────────────────────────────────────────── */

export const QX = {
  /* ── Surfaces ── */
  bg: "#0B1220", // page background
  bgDeep: "#070C15", // deepest layer (footer outer, hero base)
  panel: "#111C30", // cards / feature tiles
  panelRaised: "#16233B", // auth card, hovered tiles, footer panel
  line: "rgba(255,255,255,0.06)", // hairline borders

  /* ── Brand accents ── */
  blue: "#2E7DF6", // primary CTA (Try now / Sign up / Register)
  blueHover: "#1E6FE0",
  glow: "#3B82F6", // glows / decorative blue
  link: "#5AA2FF", // inline text links ("Read more →")

  /* ── Positive money figures only ── */
  green: "#12b76a",
  greenHover: "#0fa762",

  /* ── Text ── */
  text: "#ffffff",
  muted: "#8b93a7",
  faint: "#5c6577",

  /* ── Status ── */
  star: "#f5b544", // rating stars
} as const;

/* ── Reusable Tailwind class fragments (kept as strings for reuse) ── */
export const QX_CX = {
  section: "px-4 sm:px-6 lg:px-8",
  container: "mx-auto max-w-6xl",
  heading:
    "text-2xl sm:text-[32px] font-extrabold tracking-tight text-white leading-tight",
  subheading: "mt-3 text-sm text-[#8b93a7]",
  btnPrimary:
    "inline-flex items-center justify-center rounded-lg bg-[#2E7DF6] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1E6FE0]",
  btnGhost:
    "inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5",
} as const;
