import type { Metadata } from "next";
import { getQuoteRequests } from "@/lib/data/admin";
import { QuoteRespondButton } from "@/components/admin/QuoteRespondButton";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Quote Requests | ${SITE_NAME} Admin` };

export default async function AdminQuotesPage() {
  const quotes = await getQuoteRequests();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Quote Requests</h1>

      <div className="space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="rounded-lg border border-neutral-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">{q.name} &middot; {q.email}</p>
                <p className="mt-1 text-sm text-neutral-600">
                  {q.productType} &middot; {q.size} &middot; qty {q.quantity}
                </p>
                {q.message && <p className="mt-1 text-sm text-neutral-500">&ldquo;{q.message}&rdquo;</p>}
                <p className="mt-1 text-xs text-neutral-400">{q.createdAt.toLocaleString()}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    q.status === "NEW" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {q.status}
                </span>
                {q.status === "NEW" && <QuoteRespondButton quoteId={q.id} />}
              </div>
            </div>
          </div>
        ))}
        {quotes.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-500">No quote requests yet.</p>
        )}
      </div>
    </div>
  );
}
