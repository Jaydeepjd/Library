// Shared, framework-agnostic pricing logic — imported by both the client-side
// price calculator (for live preview) and the server-side order creation
// path (which recomputes from scratch and never trusts a client-sent total).

export const MIN_DIMENSION_IN = 12;
export const MAX_DIMENSION_IN = 240;

// basePrice is anchored to an 8ft x 8ft (64 sqft) reference size; the
// per-square-foot rate is derived from it so bigger/smaller custom sizes
// scale sensibly instead of charging a flat price regardless of size.
const REFERENCE_SQFT = 64;

const QUANTITY_DISCOUNT_TIERS = [
  { minQuantity: 25, discount: 0.15 },
  { minQuantity: 10, discount: 0.1 },
  { minQuantity: 5, discount: 0.05 },
] as const;

export function getQuantityDiscount(quantity: number): number {
  const tier = QUANTITY_DISCOUNT_TIERS.find((t) => quantity >= t.minQuantity);
  return tier?.discount ?? 0;
}

export function computeDiscountAmount(
  subtotal: number,
  promo: { type: "PERCENT" | "FIXED"; value: number } | null
): number {
  if (!promo) return 0;
  const raw = promo.type === "PERCENT" ? subtotal * (promo.value / 100) : promo.value;
  return Math.min(subtotal, Math.round(raw * 100) / 100);
}

export function computeUnitPrice(params: {
  basePrice: number;
  materialModifier: number;
  widthIn: number;
  heightIn: number;
  quantity: number;
}): number {
  const width = Math.min(MAX_DIMENSION_IN, Math.max(MIN_DIMENSION_IN, params.widthIn));
  const height = Math.min(MAX_DIMENSION_IN, Math.max(MIN_DIMENSION_IN, params.heightIn));

  const pricePerSqFt = params.basePrice / REFERENCE_SQFT;
  const areaSqFt = (width * height) / 144;
  const sizeAdjustedPrice = pricePerSqFt * areaSqFt + params.materialModifier;

  const discount = getQuantityDiscount(params.quantity);
  const unitPrice = sizeAdjustedPrice * (1 - discount);

  return Math.round(unitPrice * 100) / 100;
}
