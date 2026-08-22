"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import {
  computeUnitPrice,
  getQuantityDiscount,
  MIN_DIMENSION_IN,
  MAX_DIMENSION_IN,
} from "@/lib/pricing";

type MaterialOption = { id: string; label: string; priceModifier: number };

type Props = {
  productId: string;
  slug: string;
  name: string;
  basePrice: number;
  image: string;
  materialOptions: MaterialOption[];
};

export function PriceCalculator({ productId, slug, name, basePrice, image, materialOptions }: Props) {
  const [widthIn, setWidthIn] = useState(96);
  const [heightIn, setHeightIn] = useState(80);
  const [materialOptionId, setMaterialOptionId] = useState(materialOptions[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const material = materialOptions.find((m) => m.id === materialOptionId) ?? materialOptions[0];

  const unitPrice = useMemo(
    () =>
      computeUnitPrice({
        basePrice,
        materialModifier: material?.priceModifier ?? 0,
        widthIn,
        heightIn,
        quantity,
      }),
    [basePrice, material, widthIn, heightIn, quantity]
  );

  const discount = getQuantityDiscount(quantity);
  const lineTotal = Math.round(unitPrice * quantity * 100) / 100;

  function handleAddToCart() {
    addItem({
      productId,
      name,
      slug,
      image,
      widthIn,
      heightIn,
      materialOptionId: material?.id ?? null,
      materialLabel: material?.label ?? null,
      quantity,
      unitPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 p-5">
        <p className="mb-4 flex items-center gap-2 text-sm font-bold text-brand-navy-950">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy-950 text-[11px] text-white">1</span>
          Select Size &amp; Material
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-neutral-700">
              Width (in)
            </label>
            <input
              id="width"
              type="number"
              min={MIN_DIMENSION_IN}
              max={MAX_DIMENSION_IN}
              value={widthIn}
              onChange={(e) => setWidthIn(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-neutral-700">
              Height (in)
            </label>
            <input
              id="height"
              type="number"
              min={MIN_DIMENSION_IN}
              max={MAX_DIMENSION_IN}
              value={heightIn}
              onChange={(e) => setHeightIn(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {materialOptions.length > 0 && (
          <div className="mt-4">
            <label htmlFor="material" className="block text-sm font-medium text-neutral-700">
              Material
            </label>
            <select
              id="material"
              value={materialOptionId}
              onChange={(e) => setMaterialOptionId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            >
              {materialOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                  {m.priceModifier > 0 ? ` (+$${m.priceModifier.toFixed(2)})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="mt-1 block w-32 rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
          {discount > 0 && (
            <p className="mt-1 text-xs font-medium text-green-700">
              {Math.round(discount * 100)}% bulk discount applied
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-neutral-200 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-neutral-600">Unit price</span>
            <span className="text-sm font-medium text-neutral-900">${unitPrice.toFixed(2)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm text-neutral-600">Total ({quantity} pc{quantity > 1 ? "s" : ""})</span>
            <span className="text-lg font-bold text-brand-navy-950">${lineTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 p-5">
        <p className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy-950">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy-950 text-[11px] text-white">2</span>
          Add to Cart &amp; Checkout
        </p>
        <p className="mb-4 text-xs text-neutral-500">
          You&apos;ll upload artwork on a secure link after payment — no need to have your files
          ready yet.
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full rounded-md bg-brand-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-700"
        >
          Add to Cart
        </button>

        {justAdded && (
          <p className="mt-3 text-center text-sm text-green-700">
            Added to cart.{" "}
            <Link href="/cart" className="font-medium underline">
              View cart
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
