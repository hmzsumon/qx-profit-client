/* ──────────────────────────────────────────────────────────────
   QX PROFIT — Public site design tokens
   ------------------------------------------------------------------
   Single source of truth for the colours / spacing used across the
   public marketing pages (Home, FAQ, Login, Registration, footer…).
   JS-side values live here so SVGs + inline styles stay in sync with
   the Tailwind arbitrary classes used in the components.
   ────────────────────────────────────────────────────────────── */

export const QX = {
  /* ── Surfaces ── */
  bg: "#161b27", // page background
  bgDeep: "#10141e", // deepest layer (footer outer, hero base)
  panel: "#1c2230", // cards / feature tiles
  panelRaised: "#252c3d", // auth card, hovered tiles, footer panel
  line: "rgba(255,255,255,0.06)", // hairline borders

  /* ── Brand accents ── */
  green: "#12b76a", // primary CTA (Sign up / Create account)
  greenHover: "#0fa762",
  blue: "#2e90fa", // auth submit (Sign in / Registration)
  blueHover: "#1a7ff0",
  link: "#4c9ffb", // inline text links ("Read more →")

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
  btnGreen:
    "inline-flex items-center justify-center rounded-lg bg-[#12b76a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0fa762]",
  btnGhost:
    "inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5",
} as const;
