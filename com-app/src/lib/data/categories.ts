import "server-only";
import { prisma } from "@/lib/prisma";

export function getNavCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });
}

export function getAllTopLevelCategoriesWithProductCount() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryWithDescendantIds(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { children: true, parent: { include: { children: true } } },
  });
  if (!category) return null;

  const categoryIds = [category.id, ...category.children.map((c) => c.id)];
  return { category, categoryIds };
}
