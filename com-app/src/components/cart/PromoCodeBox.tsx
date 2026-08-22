"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { validatePromoCode } from "@/lib/actions/promo";

export function PromoCodeBox() {
  const appliedPromo = useCartStore((s) => s.appliedPromo);
  const setAppliedPromo = useCartStore((s) => s.setAppliedPromo);

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  async function handleApplyPromo() {
    setApplying(true);
    setPromoError(null);
    const result = await validatePromoCode(promoInput);
    setApplying(false);
    if (!result.valid) {
      setPromoError(result.error);
      setAppliedPromo(null);
      return;
    }
    setAppliedPromo({ code: result.code, type: result.type, value: result.value });
    setPromoInput("");
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          placeholder="Promo code"
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={handleApplyPromo}
          disabled={applying || !promoInput.trim()}
          className="rounded-md border border-neutral-900 px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 disabled:opacity-50"
        >
          Apply
        </button>
      </div>
      {promoError && <p className="mt-1 text-xs text-red-600">{promoError}</p>}
      {appliedPromo && (
        <p className="mt-1 flex items-center gap-2 text-xs font-medium text-green-700">
          Code {appliedPromo.code} applied
          <button
            type="button"
            onClick={() => setAppliedPromo(null)}
            className="text-neutral-500 underline"
          >
            Remove
          </button>
        </p>
      )}
    </div>
  );
}
