"use client";

import { useActionState } from "react";
import { submitQuoteAction, type QuoteActionState } from "@/lib/actions/quote";

const initialState: QuoteActionState = {};

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuoteAction, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-green-900">Request received</h2>
        <p className="mt-1 text-sm text-green-800">
          Our team will get back to you within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Name</label>
          <input id="name" name="name" required className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label htmlFor="productType" className="block text-sm font-medium text-neutral-700">Product type</label>
        <input id="productType" name="productType" placeholder="e.g. Tension Fabric Backdrop" required className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-neutral-700">Size</label>
          <input id="size" name="size" placeholder="e.g. 10ft x 8ft" required className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700">Quantity</label>
          <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} required className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700">Message (optional)</label>
        <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
      >
        {pending ? "Sending..." : "Get My Free Quote"}
      </button>
    </form>
  );
}
