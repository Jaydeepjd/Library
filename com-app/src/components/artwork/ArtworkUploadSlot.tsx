"use client";

import { useActionState } from "react";
import { uploadArtworkAction, type ArtworkActionState } from "@/lib/actions/artwork";

const initialState: ArtworkActionState = {};

type Props = {
  orderId: string;
  token: string;
  orderItemId: string;
  productName: string;
  configLabel: string;
  alreadyUploaded: boolean;
};

export function ArtworkUploadSlot({
  orderId,
  token,
  orderItemId,
  productName,
  configLabel,
  alreadyUploaded,
}: Props) {
  const [state, formAction, pending] = useActionState(uploadArtworkAction, initialState);
  const uploaded = alreadyUploaded || state.success;

  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <p className="text-sm font-medium text-neutral-900">{productName}</p>
      <p className="text-xs text-neutral-500">{configLabel}</p>

      {uploaded ? (
        <p className="mt-3 inline-flex items-center gap-1 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
          Artwork uploaded for this item.
        </p>
      ) : (
        <form action={formAction} className="mt-3 flex flex-wrap items-center gap-3">
          <input type="hidden" name="orderId" value={orderId} />
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="orderItemId" value={orderItemId} />
          <input
            type="file"
            name="file"
            accept=".pdf,.png,.ai"
            required
            className="text-sm text-neutral-700 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
          >
            {pending ? "Uploading..." : "Upload"}
          </button>
        </form>
      )}
      {state.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
      <p className="mt-1 text-xs text-neutral-400">PDF, PNG, or AI &middot; max 50MB</p>
    </div>
  );
}
