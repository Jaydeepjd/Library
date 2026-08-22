export function RatingStars({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill={i <= Math.round(rating) ? "#f2a71b" : "#e5e5e5"}
          >
            <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
          </svg>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500">({reviewCount})</span>
      )}
    </div>
  );
}
