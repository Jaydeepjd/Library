"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { computeDiscountAmount } from "@/lib/pricing";
import { PromoCodeBox } from "@/components/cart/PromoCodeBox";
import { createCheckoutPaypalOrder, captureCheckoutOrder } from "@/lib/actions/checkout";

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "India"];

type Shipping = {
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal: string;
  country: string;
};

export function CheckoutForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const appliedPromo = useCartStore((s) => s.appliedPromo);
  const clearCart = useCartStore((s) => s.clearCart);

  const [shipping, setShipping] = useState<Shipping>({
    name: defaultName,
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal: "",
    country: COUNTRIES[0],
  });
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartSubtotal(items);
  const discount = computeDiscountAmount(subtotal, appliedPromo);
  const total = Math.max(0, subtotal - discount);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  function isShippingValid() {
    return (
      shipping.name.trim().length >= 2 &&
      shipping.line1.trim().length >= 3 &&
      shipping.city.trim().length >= 2 &&
      shipping.state.trim().length >= 2 &&
      shipping.postal.trim().length >= 3 &&
      shipping.country.trim().length >= 2
    );
  }

  function cartAsInput() {
    return items.map((item) => ({
      productId: item.productId,
      materialOptionId: item.materialOptionId,
      widthIn: item.widthIn,
      heightIn: item.heightIn,
      quantity: item.quantity,
    }));
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-neutral-900">Your cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-neutral-900">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-neutral-900">Shipping Information</h2>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Full name</label>
            <input
              value={shipping.name}
              onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Address line 1</label>
            <input
              value={shipping.line1}
              onChange={(e) => setShipping({ ...shipping, line1: e.target.value })}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Address line 2 (optional)</label>
            <input
              value={shipping.line2}
              onChange={(e) => setShipping({ ...shipping, line2: e.target.value })}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">City</label>
              <input
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">State / Province</label>
              <input
                value={shipping.state}
                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Postal code</label>
              <input
                value={shipping.postal}
                onChange={(e) => setShipping({ ...shipping, postal: e.target.value })}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Country</label>
              <select
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="h-fit space-y-5 rounded-lg border border-neutral-200 p-5">
          <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>

          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.lineId} className="flex justify-between gap-2">
                <span className="text-neutral-600">
                  {item.name} ({item.widthIn}&quot;x{item.heightIn}&quot;) &times; {item.quantity}
                </span>
                <span className="shrink-0 font-medium text-neutral-900">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <PromoCodeBox />

          <div className="space-y-2 border-t border-neutral-200 pt-4 text-sm">
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

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!clientId ? (
            <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
              PayPal sandbox is not configured yet. Add PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET /
              NEXT_PUBLIC_PAYPAL_CLIENT_ID to .env (see README) to enable payment.
            </p>
          ) : (
            <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={async () => {
                  setError(null);
                  if (!isShippingValid()) {
                    setError("Please complete your shipping address before paying.");
                    throw new Error("Invalid shipping address");
                  }
                  const result = await createCheckoutPaypalOrder(cartAsInput(), appliedPromo?.code);
                  if ("error" in result) {
                    setError(result.error);
                    throw new Error(result.error);
                  }
                  return result.paypalOrderId;
                }}
                onApprove={async (data) => {
                  const result = await captureCheckoutOrder(
                    data.orderID,
                    cartAsInput(),
                    shipping,
                    appliedPromo?.code
                  );
                  if ("error" in result) {
                    setError(result.error);
                    return;
                  }
                  clearCart();
                  router.push(`/order/${result.orderId}/confirmation`);
                }}
                onError={(err) => {
                  console.error(err);
                  setError("Something went wrong with PayPal. Please try again.");
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </div>
  );
}
