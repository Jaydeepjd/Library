"use client";

import { useState } from "react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  children: { id: string; name: string; slug: string }[];
};

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="block flex-1 py-2 text-sm font-medium text-neutral-900"
                    >
                      {category.name}
                    </Link>
                    {category.children.length > 0 && (
                      <button
                        aria-label={`Toggle ${category.name} subcategories`}
                        onClick={() =>
                          setExpandedId(expandedId === category.id ? null : category.id)
                        }
                        className="p-2 text-neutral-500"
                      >
                        {expandedId === category.id ? "-" : "+"}
                      </button>
                    )}
                  </div>
                  {expandedId === category.id && (
                    <ul className="ml-3 space-y-1 border-l border-neutral-200 pl-3">
                      {category.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/category/${child.slug}`}
                            onClick={() => setOpen(false)}
                            className="block py-1.5 text-sm text-neutral-600"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-neutral-200 pt-4">
              <Link href="/quote" onClick={() => setOpen(false)} className="block py-2 text-sm text-neutral-700">
                Request a Quote
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className="block py-2 text-sm text-neutral-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
