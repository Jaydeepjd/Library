import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrderForOwner } from "@/lib/data/orders";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Order Confirmed | ${SITE_NAME}`,
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?redirect=/order/${id}/confirmation`);

  const order = await getOrderForOwner(id, user.id);
  if (!order) notFound();

  const uploadUrl = order.uploadToken ? `/order/${order.id}/upload/${order.uploadToken}` : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Thank you for your order!</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Order #{order.id.slice(-8).toUpperCase()} &middot; confirmation sent to {user.email}
        </p>
      </div>

      {uploadUrl && (
        <div className="mb-8 rounded-lg border border-neutral-900 bg-neutral-900 p-5 text-white">
          <h2 className="text-lg font-semibold">Upload your artwork</h2>
          <p className="mt-1 text-sm text-neutral-300">
            Use the secure link below to upload print-ready files for each item. This link also
            went to your email and expires in 7 days.
          </p>
          <Link
            href={uploadUrl}
            className="mt-4 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            Upload Artwork
          </Link>
        </div>
      )}

      <div className="rounded-lg border border-neutral-200 p-5">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">Order Summary</h2>
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2">
              <span className="text-neutral-600">
                {item.product.name} ({item.widthIn}&quot;x{item.heightIn}&quot;
                {item.materialOption ? `, ${item.materialOption.label}` : ""}) &times; {item.quantity}
              </span>
              <span className="shrink-0 font-medium text-neutral-900">${item.lineTotal.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-neutral-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-neutral-600">Discount</span>
              <span className="text-green-700">-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/account" className="text-sm font-medium text-neutral-900 underline">
          View order history
        </Link>
      </div>
    </div>
  );
}
