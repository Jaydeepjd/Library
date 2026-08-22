"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  lineId: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  widthIn: number;
  heightIn: number;
  materialOptionId: string | null;
  materialLabel: string | null;
  quantity: number;
  unitPrice: number;
};

export type AppliedPromo = { code: string; type: "PERCENT" | "FIXED"; value: number };

type CartState = {
  items: CartItem[];
  appliedPromo: AppliedPromo | null;
  addItem: (item: Omit<CartItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  setAppliedPromo: (promo: AppliedPromo | null) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      appliedPromo: null,
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, lineId: crypto.randomUUID() },
          ],
        })),
      removeItem: (lineId) =>
        set((state) => ({
          items: state.items.filter((i) => i.lineId !== lineId),
        })),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.lineId === lineId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [], appliedPromo: null }),
      setAppliedPromo: (promo) => set({ appliedPromo: promo }),
    }),
    { name: "printcraft-cart" }
  )
);

export function cartLineTotal(item: CartItem) {
  return item.unitPrice * item.quantity;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + cartLineTotal(item), 0);
}
