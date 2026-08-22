import "server-only";
import { prisma } from "@/lib/prisma";

export function getAllOrders() {
  return prisma.order.findMany({
    include: { user: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomersWithOrderCount() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: { _count: { select: { orders: true } }, orders: { select: { total: true } } },
    orderBy: { createdAt: "desc" },
  });

  return customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    orderCount: c._count.orders,
    totalSpent: c.orders.reduce((sum, o) => sum + o.total, 0),
    createdAt: c.createdAt,
  }));
}

export function getQuoteRequests() {
  return prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getRevenueStats() {
  const orders = await prisma.order.findMany({
    select: {
      total: true,
      createdAt: true,
      items: { select: { lineTotal: true, product: { select: { name: true } } } },
    },
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const monthlyMap = new Map<string, number>();
  for (const order of orders) {
    const key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + order.total);
  }
  const monthlyRevenue = [...monthlyMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue: Math.round(revenue * 100) / 100 }));

  const productRevenue = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items) {
      productRevenue.set(item.product.name, (productRevenue.get(item.product.name) ?? 0) + item.lineTotal);
    }
  }
  const topProducts = [...productRevenue.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, revenue]) => ({ name, revenue: Math.round(revenue * 100) / 100 }));

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    orderCount: orders.length,
    monthlyRevenue,
    topProducts,
  };
}
