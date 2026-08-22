"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  basePrice: number;
  images: string;
  category: { name: string };
};

type Collection = {
  category: { id: string; name: string; slug: string };
  products: Product[];
};

export function CollectionShowcase({ collections }: { collections: Collection[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = collections[activeIndex];
  if (!active) return null;

  return (
    <section className="bg-neutral-50 py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {collections.map((c, i) => (
            <button
              key={c.category.id}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === activeIndex
                  ? "border-brand-red-600 bg-brand-red-600 text-white"
                  : "border-neutral-300 text-neutral-700 hover:border-brand-red-600"
              }`}
            >
              {c.category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col justify-center rounded-lg bg-brand-navy-950 p-6 text-white lg:col-span-1">
            <h3 className="text-lg font-bold">{active.category.name}</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Custom sized, printed to order, ships ready to install.
            </p>
            <Link
              href={`/category/${active.category.slug}`}
              className="mt-5 inline-block rounded-md bg-white px-4 py-2 text-center text-sm font-semibold text-brand-navy-950 hover:bg-neutral-100"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
            {active.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
