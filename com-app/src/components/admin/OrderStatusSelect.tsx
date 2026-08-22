"use client";

import { useState, useTransition } from "react";
import { updateOrderStatusAction } from "@/lib/actions/admin";

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"] as const;

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as (typeof STATUSES)[number];
        setValue(next);
        startTransition(() => {
          updateOrderStatusAction(orderId, next);
        });
      }}
      className="rounded-md border border-neutral-300 px-2 py-1 text-xs"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
