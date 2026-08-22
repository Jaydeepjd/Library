import "server-only";
import { prisma } from "@/lib/prisma";

export { parseImages } from "@/lib/images";

export function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true, materialOptions: true },
  });
}

export async function getRelatedProducts(categoryId: string, excludeProductId: string, limit = 4) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: excludeProductId } },
    include: { category: true },
    take: limit,
  });
}

export type ProductSort = "price-asc" | "price-desc" | "newest" | "popularity";

export function getProductsByCategoryIds(
  categoryIds: string[],
  sort: ProductSort = "popularity"
) {
  const orderBy =
    sort === "price-asc"
      ? { basePrice: "asc" as const }
      : sort === "price-desc"
        ? { basePrice: "desc" as const }
        : sort === "newest"
          ? { createdAt: "desc" as const }
          : { isFeatured: "desc" as const }; // "popularity" proxy: featured first

  return prisma.product.findMany({
    where: { categoryId: { in: categoryIds } },
    include: { category: true },
    orderBy,
  });
}

export async function getShowcaseCollections(limit = 3, productsPerCollection = 4) {
  const topLevel = await prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { name: "asc" },
    take: limit,
  });

  return Promise.all(
    topLevel.map(async (category) => {
      const categoryIds = [category.id, ...category.children.map((c) => c.id)];
      const products = await prisma.product.findMany({
        where: { categoryId: { in: categoryIds } },
        include: { category: true },
        take: productsPerCollection,
      });
      return { category, products };
    })
  );
}

export function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    },
    include: { category: true },
    take: 20,
  });
}
