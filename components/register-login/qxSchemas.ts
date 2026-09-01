/* ────────── QX PROFIT — Auth form schemas ──────────
   Zod schemas for the Quotex-style Login / Registration forms.
   ─────────────────────────────────────────────────── */

import { z } from "zod";

/* ────────── Password rules (shared) ────────── */
export const qxPasswordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(64, "Password is too long");

/* ────────── Sign in ────────── */
export const qxSignInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});
export type QxSignInValues = z.infer<typeof qxSignInSchema>;

/* ────────── Registration ────────── */
export const qxRegisterSchema = z
  .object({
    country: z.string().trim().min(1, "Select your country / region"),
    currency: z.string().trim().min(1, "Select a currency"),
    email: z.string().trim().email("Enter a valid email address"),
    password: qxPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    promoCode: z.string().trim().optional().or(z.literal("")),
    ageAndAgreement: z.boolean().refine((v) => v === true, {
      message: "You must confirm your age and accept the Service Agreement",
    }),
    notUSTaxPayer: z.boolean().refine((v) => v === true, {
      message: "You must confirm this declaration",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type QxRegisterValues = z.infer<typeof qxRegisterSchema>;

/* ────────── Currency options ────────── */
export const QX_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "BDT",
  "PKR",
  "NGN",
  "BRL",
  "IDR",
  "PHP",
] as const;
