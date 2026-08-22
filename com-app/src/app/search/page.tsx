import type { Metadata } from "next";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SITE_NAME } from "@/lib/constants";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: `Search${q ? `: ${q}` : ""} | ${SITE_NAME}` };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const products = q.trim() ? await searchProducts(q.trim()) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">{products.length} products found</p>

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : q ? (
        <p className="mt-8 text-sm text-neutral-500">No products matched your search.</p>
      ) : null}
    </div>
  );
}
