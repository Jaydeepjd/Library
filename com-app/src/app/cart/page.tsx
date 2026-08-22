"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { computeDiscountAmount } from "@/lib/pricing";
import { PromoCodeBox } from "@/components/cart/PromoCodeBox";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const appliedPromo = useCartStore((s) => s.appliedPromo);

  const subtotal = cartSubtotal(items);
  const discount = computeDiscountAmount(subtotal, appliedPromo);
  const total = Math.max(0, subtotal - discount);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Your cart is empty</h1>
        <Link href="/" className="mt-4 inline-block rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-neutral-900">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div key={item.lineId} className="flex gap-4 rounded-lg border border-neutral-200 p-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <Link href={`/product/${item.slug}`} className="text-sm font-medium text-neutral-900 hover:underline">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.lineId)}
                    className="text-xs text-neutral-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  {item.widthIn}&quot; x {item.heightIn}&quot;
                  {item.materialLabel ? ` · ${item.materialLabel}` : ""}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.lineId, Number(e.target.value))}
                    className="w-16 rounded-md border border-neutral-300 px-2 py-1 text-sm"
                  />
                  <span className="text-sm font-semibold text-neutral-900">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-lg border border-neutral-200 p-5">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900">Order Summary</h2>

          <PromoCodeBox />

          <div className="mt-5 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-neutral-900">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-neutral-600">Discount</span>
                <span className="text-green-700">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-5 block rounded-md bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
