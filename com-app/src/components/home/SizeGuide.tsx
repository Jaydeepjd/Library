"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SIZES = [
  { label: "8ft x 8ft", desc: "Compact backdrop for step-and-repeat and small booths." },
  { label: "10ft x 8ft", desc: "The most popular size for media walls and press events." },
  { label: "10ft x 10ft", desc: "Standard trade show booth backdrop." },
  { label: "13ft x 8ft", desc: "Wide format for larger exhibition spaces." },
  { label: "20ft x 8ft", desc: "Full media wall coverage for keynote stages." },
];

export function SizeGuide() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-brand-navy-950 py-14 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-2xl font-bold">Choose Your Backdrop Size</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-neutral-300">
          Every size is custom printed to order — pick a common preset to start, or enter your
          exact dimensions on any product page.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SIZES.map((size, i) => (
            <button
              key={size.label}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "border-white bg-white text-brand-navy-950"
                  : "border-white/30 text-white hover:border-white"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-white/5">
            <Image
              src={`https://picsum.photos/seed/size-${active}/700/400`}
              alt={`${SIZES[active].label} backdrop example`}
              fill
              sizes="500px"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-lg font-semibold">{SIZES[active].label}</p>
          <p className="mt-1 text-sm text-neutral-300">{SIZES[active].desc}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/category/backdrops-media-walls"
            className="rounded-md bg-brand-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-700"
          >
            Shop Backdrops
          </Link>
          <Link
            href="/quote"
            className="rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Talk to Experts
          </Link>
        </div>
      </div>
    </section>
  );
}
