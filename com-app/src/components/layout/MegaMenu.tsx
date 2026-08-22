"use client";

import { useState } from "react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  children: { id: string; name: string; slug: string }[];
};

export function MegaMenu({ categories }: { categories: Category[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <nav
      className="relative hidden bg-brand-red-600 md:block"
      onMouseLeave={() => setOpenId(null)}
    >
      <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4">
        {categories.map((category) => (
          <li key={category.id} onMouseEnter={() => setOpenId(category.id)}>
            <Link
              href={`/category/${category.slug}`}
              className="block px-3 py-3 text-sm font-semibold text-white/95 hover:text-white"
            >
              {category.name}
            </Link>

            {openId === category.id && category.children.length > 0 && (
              <div className="absolute inset-x-0 top-full z-40 border-t-2 border-brand-red-600 bg-white shadow-xl">
                <div className="mx-auto max-w-7xl px-6 py-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-red-600">
                    {category.name}
                  </p>
                  <div className="grid grid-cols-4 gap-x-6 gap-y-2">
                    {category.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.slug}`}
                        className="text-sm text-brand-navy-900 hover:text-brand-red-600 hover:underline"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/category/${category.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-red-600 hover:underline"
                  >
                    View all
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
