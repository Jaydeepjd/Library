"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ARTWORK_ACCEPTED_EXT, ARTWORK_MAX_FILE_SIZE_BYTES } from "@/lib/constants";

export type ArtworkActionState = { error?: string; success?: boolean };

function getExtension(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return ext;
}

async function loadOrderForUpload(orderId: string, token: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true, artworkUpload: true } } },
  });

  if (!order || !order.uploadToken || order.uploadToken !== token) {
    return { order: null as null, error: "Invalid upload link." };
  }
  if (!order.uploadTokenExpiresAt || order.uploadTokenExpiresAt < new Date()) {
    return { order: null as null, error: "This upload link has expired." };
  }
  return { order, error: null as null };
}

export async function uploadArtworkAction(
  _prevState: ArtworkActionState,
  formData: FormData
): Promise<ArtworkActionState> {
  const orderId = formData.get("orderId");
  const token = formData.get("token");
  const orderItemId = formData.get("orderItemId");
  const file = formData.get("file");

  if (
    typeof orderId !== "string" ||
    typeof token !== "string" ||
    typeof orderItemId !== "string" ||
    !(file instanceof File)
  ) {
    return { error: "Missing required fields." };
  }

  const { order, error } = await loadOrderForUpload(orderId, token);
  if (!order) return { error: error ?? "Invalid upload link." };

  const item = order.items.find((i) => i.id === orderItemId);
  if (!item || !item.artworkUpload) {
    return { error: "That item could not be found on this order." };
  }
  if (item.artworkUpload.uploadedAt) {
    return { error: "Artwork has already been uploaded for this item." };
  }

  const ext = getExtension(file.name);
  if (!ARTWORK_ACCEPTED_EXT.includes(ext)) {
    return { error: "Only PDF, PNG, and AI files are accepted." };
  }
  if (file.size > ARTWORK_MAX_FILE_SIZE_BYTES) {
    return { error: "File is too large (max 50MB)." };
  }

  const uploadDir = path.join(/* turbopackIgnore: true */ process.cwd(), process.env.ARTWORK_UPLOAD_DIR ?? "./storage/artwork", order.id);
  await mkdir(uploadDir, { recursive: true });

  const safeFileName = `${item.id}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, safeFileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  await prisma.artworkUpload.update({
    where: { orderItemId: item.id },
    data: {
      filePath: path.relative(process.cwd(), filePath),
      fileType: ext,
      fileSize: file.size,
      uploadedAt: new Date(),
    },
  });

  revalidatePath(`/order/${order.id}/upload/${token}`);
  revalidatePath(`/account/orders/${order.id}`);

  return { success: true };
}
