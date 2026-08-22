"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { ProductSort } from "@/lib/data/products";

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortSelect({ activeSort }: { activeSort: ProductSort }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor="sort" className="text-neutral-600">Sort by</label>
      <select
        id="sort"
        defaultValue={activeSort}
        className="rounded-md border border-neutral-300 px-2 py-1.5 text-sm"
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("sort", e.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
