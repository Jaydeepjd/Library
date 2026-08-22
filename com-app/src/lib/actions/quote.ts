"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/email";
import { SITE_NAME } from "@/lib/constants";

export type QuoteActionState = { error?: string; success?: boolean };

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  productType: z.string().min(2, "Product type is required"),
  size: z.string().min(1, "Size is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  message: z.string().optional(),
});

export async function submitQuoteAction(
  _prevState: QuoteActionState,
  formData: FormData
): Promise<QuoteActionState> {
  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    productType: formData.get("productType"),
    size: formData.get("size"),
    quantity: formData.get("quantity"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const quote = await prisma.quoteRequest.create({ data: parsed.data });

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    await sendMail({
      to: adminEmail,
      subject: `New quote request — ${SITE_NAME}`,
      html: `
        <p>New bulk quote request:</p>
        <ul>
          <li><strong>Name:</strong> ${quote.name}</li>
          <li><strong>Email:</strong> ${quote.email}</li>
          <li><strong>Product:</strong> ${quote.productType}</li>
          <li><strong>Size:</strong> ${quote.size}</li>
          <li><strong>Quantity:</strong> ${quote.quantity}</li>
          <li><strong>Message:</strong> ${quote.message ?? "-"}</li>
        </ul>
      `,
    }).catch((err) => console.error("Failed to send quote notification email", err));
  }

  return { success: true };
}
