import { z } from "zod";

// 10-digit Canadian number (no country code prefix)
export const phoneSchema = z.string().refine(
  (val) => val.replace(/\D/g, "").length === 10,
  { message: "Enter a valid 10-digit phone number" }
);

// Format digits into (XXX) XXX-XXXX as the user types
export function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (!d) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// Raw 10-digit string from any formatted value
export function normalizePhone(val: string): string {
  return val.replace(/\D/g, "");
}
