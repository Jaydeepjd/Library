import { RatingStars } from "@/components/product/RatingStars";

const BREAKDOWN = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 21 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 2 },
];

const SAMPLE_REVIEWS = [
  {
    title: "Great service, great product",
    text: "Representatives assisted during design and purchase phase. Product was delivered promptly and exactly as pictured.",
    author: "K. Summers",
    date: "3 weeks ago",
  },
  {
    title: "Excellent presentation",
    text: "The step and repeat banners were absolutely perfect. My red carpet scene was elevated by your work.",
    author: "T. Nakamura",
    date: "1 month ago",
  },
  {
    title: "Great service and product",
    text: "They were able to give a quick turnaround, great communication, and the item was exactly what I paid for.",
    author: "R. Okafor",
    date: "2 months ago",
  },
];

export function ProductReviews({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <h2 className="mb-6 text-center text-xl font-bold text-brand-navy-950">Customer Reviews</h2>

      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-brand-navy-950">{rating.toFixed(2)}</p>
          <RatingStars rating={rating} />
          <p className="mt-1 text-xs text-neutral-500">Based on {reviewCount} reviews</p>
        </div>

        <div className="space-y-1.5">
          {BREAKDOWN.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-8 shrink-0">{row.stars} star</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full bg-brand-gold" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="w-8 shrink-0 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {SAMPLE_REVIEWS.map((review) => (
          <div key={review.title + review.author} className="rounded-lg border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <RatingStars rating={5} />
              <span className="text-xs text-neutral-400">{review.date}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-brand-navy-950">{review.title}</p>
            <p className="mt-1 text-sm text-neutral-600">{review.text}</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verified Buyer &middot; {review.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
