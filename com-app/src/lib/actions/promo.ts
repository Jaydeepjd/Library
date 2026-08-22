"use server";

import { prisma } from "@/lib/prisma";

export type PromoResult =
  | { valid: true; code: string; type: "PERCENT" | "FIXED"; value: number }
  | { valid: false; error: string };

export async function validatePromoCode(rawCode: string): Promise<PromoResult> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { valid: false, error: "Enter a promo code" };

  const promo = await prisma.promoCode.findUnique({ where: { code } });
  if (!promo || !promo.active) return { valid: false, error: "Invalid promo code" };
  if (promo.expiresAt && promo.expiresAt < new Date()) {
    return { valid: false, error: "This promo code has expired" };
  }

  return { valid: true, code: promo.code, type: promo.type, value: promo.value };
}
