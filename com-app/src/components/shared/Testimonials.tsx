import { RatingStars } from "@/components/product/RatingStars";

const REVIEWS = [
  {
    initials: "J.M.",
    name: "J. Martinez",
    role: "Event Producer",
    text: "Arrived ahead of schedule and the print quality was outstanding. Our booth stood out on the floor.",
  },
  {
    initials: "A.R.",
    name: "A. Reyes",
    role: "Marketing Lead",
    text: "Communication was clear the whole way through and the finished piece matched the mockup exactly.",
  },
  {
    initials: "D.P.",
    name: "D. Patel",
    role: "Franchise Owner",
    text: "We've reordered twice now — consistent quality and color match every time.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-brand-navy-950">What our customers say</h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <RatingStars rating={4.8} />
          <span className="text-sm text-neutral-500">4.8 from 1,200+ reviews</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {REVIEWS.map((review) => (
          <div key={review.name} className="rounded-lg border border-neutral-200 p-5">
            <RatingStars rating={5} />
            <p className="mt-3 text-sm text-neutral-600">&ldquo;{review.text}&rdquo;</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy-900 text-xs font-semibold text-white">
                {review.initials}
              </span>
              <div>
                <p className="text-sm font-medium text-brand-navy-950">{review.name}</p>
                <p className="text-xs text-neutral-500">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
