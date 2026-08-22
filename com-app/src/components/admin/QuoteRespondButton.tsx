"use client";

import { useTransition } from "react";
import { markQuoteRespondedAction } from "@/lib/actions/admin";

export function QuoteRespondButton({ quoteId }: { quoteId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => markQuoteRespondedAction(quoteId))}
      className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Mark responded"}
    </button>
  );
}
