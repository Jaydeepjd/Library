import type { Metadata } from "next";
import { getOrderForUploadToken } from "@/lib/data/orders";
import { ArtworkUploadSlot } from "@/components/artwork/ArtworkUploadSlot";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Upload Artwork | ${SITE_NAME}`,
};

export default async function ArtworkUploadPage({
  params,
}: {
  params: Promise<{ id: string; token: string }>;
}) {
  const { id, token } = await params;
  const { order, expired } = await getOrderForUploadToken(id, token);

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-neutral-900">
          {expired ? "This upload link has expired" : "Invalid upload link"}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          {expired
            ? "Upload links expire 7 days after checkout. Please sign in to your account and contact support to re-open artwork upload for this order."
            : "Double check the link from your confirmation email, or sign in to your account to find your order."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-2xl font-bold text-neutral-900">Upload Your Artwork</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Order #{order.id.slice(-8).toUpperCase()} &middot; upload one file per item below.
      </p>

      <div className="mt-8 space-y-4">
        {order.items.map((item) => (
          <ArtworkUploadSlot
            key={item.id}
            orderId={order.id}
            token={token}
            orderItemId={item.id}
            productName={item.product.name}
            configLabel={`${item.widthIn}" x ${item.heightIn}"${item.materialOption ? ` · ${item.materialOption.label}` : ""} · qty ${item.quantity}`}
            alreadyUploaded={Boolean(item.artworkUpload?.uploadedAt)}
          />
        ))}
      </div>
    </div>
  );
}
