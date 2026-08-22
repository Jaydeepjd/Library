import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Request a Quote | ${SITE_NAME}`,
  description: "Get a custom quote for bulk or large-format printing orders.",
};

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <h1 className="text-2xl font-bold text-neutral-900">Request a Quote</h1>
      <p className="mt-1 mb-8 text-sm text-neutral-600">
        Tell us about your bulk order and our team will follow up with pricing.
      </p>
      <QuoteForm />
    </div>
  );
}
