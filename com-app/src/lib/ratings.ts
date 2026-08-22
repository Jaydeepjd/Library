// There's no reviews system in scope for this build. To match the reference
// design's product-card ratings without fabricating a fake reviews table,
// this derives a stable, deterministic placeholder rating/count per product
// id so the same product always shows the same numbers.
export function pseudoRating(seed: string): { rating: number; reviewCount: number } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const rating = Math.round((4 + (hash % 100) / 100) * 10) / 10;
  const reviewCount = 40 + (hash % 760);
  return { rating, reviewCount };
}
