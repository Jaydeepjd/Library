"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"] as const;
type OrderStatus = (typeof VALID_STATUSES)[number];

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
  await requireAdmin();
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status");

  await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
}

export async function markQuoteRespondedAction(quoteId: string) {
  await requireAdmin();
  await prisma.quoteRequest.update({ where: { id: quoteId }, data: { status: "RESPONDED" } });
  revalidatePath("/admin/quotes");
}
