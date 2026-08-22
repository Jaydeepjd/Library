"use client";

import { useState } from "react";

const FEATURES = [
  { title: "Dye-Sublimation Printing", desc: "Full-color CMYK print for rich, lasting graphics." },
  { title: "Machine Washable Fabric", desc: "260gsm wrinkle-resistant, fire-retardant polyester." },
  { title: "Lightweight Aluminum Frame", desc: "Tool-free, bungee-corded frame for fast setup." },
  { title: "Portable & Durable", desc: "Packs down small, built to withstand repeat events." },
];

export function ProductSpecsTabs({ description }: { description: string }) {
  const tabs = ["Overview & Details", "Key Features", "Shipping & Installation", "Artwork & File Setup"];
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h2 className="mb-6 text-center text-xl font-bold text-brand-navy-950">Product Specs</h2>

      <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-200 pb-3">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium ${
              i === active ? "bg-brand-navy-950 text-white" : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-neutral-200 p-6">
        {active === 0 && <p className="text-sm text-neutral-600">{description}</p>}

        {active === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <p className="text-sm font-semibold text-brand-navy-950">{f.title}</p>
                <p className="mt-1 text-sm text-neutral-500">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {active === 2 && (
          <p className="text-sm text-neutral-600">
            Orders ship within 3-5 business days of artwork approval via ground freight.
            Assembly requires no tools — the aluminum frame connects with bungee-corded joints
            and the fabric graphic stretches over it in minutes.
          </p>
        )}

        {active === 3 && (
          <p className="text-sm text-neutral-600">
            Upload print-ready PDF, PNG, or AI files (max 50MB) using the secure link sent after
            checkout. Recommend 150 DPI at full print size with a 0.5in bleed on all sides.
          </p>
        )}
      </div>
    </section>
  );
}
