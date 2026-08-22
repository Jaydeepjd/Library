"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-neutral-200 rounded-lg border border-neutral-200">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-brand-navy-950"
              aria-expanded={open}
            >
              {item.question}
              <span className="ml-4 shrink-0 text-lg text-neutral-400">{open ? "−" : "+"}</span>
            </button>
            {open && <p className="px-5 pb-4 text-sm text-neutral-600">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
