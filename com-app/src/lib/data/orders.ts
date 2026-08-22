import "server-only";
import { prisma } from "@/lib/prisma";

const orderInclude = {
  items: { include: { product: true, materialOption: true, artworkUpload: true } },
  promoCode: true,
} as const;

export function getOrderForOwner(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: { id: orderId, userId },
    include: orderInclude,
  });
}

export function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: orderInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderForUploadToken(orderId: string, token: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: orderInclude,
  });

  if (!order || !order.uploadToken || order.uploadToken !== token) {
    return { order: null, expired: false } as const;
  }
  if (!order.uploadTokenExpiresAt || order.uploadTokenExpiresAt < new Date()) {
    return { order: null, expired: true } as const;
  }
  return { order, expired: false } as const;
}
