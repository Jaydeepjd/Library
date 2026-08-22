import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrderForOwner } from "@/lib/data/orders";
import { StatusBadge } from "@/components/order/StatusBadge";
import { ArtworkUploadSlot } from "@/components/artwork/ArtworkUploadSlot";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Order Detail | ${SITE_NAME}`,
};

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?redirect=/account/orders/${id}`);

  const order = await getOrderForOwner(id, user.id);
  if (!order) notFound();

  const uploadWindowOpen =
    order.uploadToken && order.uploadTokenExpiresAt && order.uploadTokenExpiresAt > new Date();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/account" className="text-xs text-neutral-500 hover:underline">
        &larr; Back to orders
      </Link>

      <div className="mt-2 mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Order #{order.id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-sm text-neutral-500">{order.createdAt.toLocaleDateString()}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-4">
          <h2 className="mb-2 text-sm font-semibold text-neutral-900">Shipping Address</h2>
          <p className="text-sm text-neutral-600">{order.shippingName}</p>
          <p className="text-sm text-neutral-600">{order.shippingLine1}</p>
          {order.shippingLine2 && <p className="text-sm text-neutral-600">{order.shippingLine2}</p>}
          <p className="text-sm text-neutral-600">
            {order.shippingCity}, {order.shippingState} {order.shippingPostal}
          </p>
          <p className="text-sm text-neutral-600">{order.shippingCountry}</p>
        </div>

        <div className="rounded-lg border border-neutral-200 p-4">
          <h2 className="mb-2 text-sm font-semibold text-neutral-900">Total</h2>
          <div className="space-y-1 text-sm">
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
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          <a
            href={`/account/orders/${order.id}/invoice`}
            className="mt-3 inline-block text-sm font-medium text-neutral-900 underline"
          >
            Download invoice (PDF)
          </a>
        </div>
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-neutral-900">Items</h2>
      <ul className="space-y-2 text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between rounded-md border border-neutral-200 p-3">
            <span className="text-neutral-700">
              {item.product.name} ({item.widthIn}&quot;x{item.heightIn}&quot;
              {item.materialOption ? `, ${item.materialOption.label}` : ""}) &times; {item.quantity}
            </span>
            <span className="font-medium text-neutral-900">${item.lineTotal.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 mb-3 text-lg font-semibold text-neutral-900">Artwork</h2>
      {uploadWindowOpen && order.uploadToken ? (
        <div className="space-y-4">
          {order.items.map((item) => (
            <ArtworkUploadSlot
              key={item.id}
              orderId={order.id}
              token={order.uploadToken as string}
              orderItemId={item.id}
              productName={item.product.name}
              configLabel={`${item.widthIn}" x ${item.heightIn}"${item.materialOption ? ` · ${item.materialOption.label}` : ""}`}
              alreadyUploaded={Boolean(item.artworkUpload?.uploadedAt)}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-neutral-500">
          {order.items.every((i) => i.artworkUpload?.uploadedAt)
            ? "All artwork has been uploaded for this order."
            : "The artwork upload window for this order has closed. Contact support if you still need to submit files."}
        </p>
      )}
    </div>
  );
}
