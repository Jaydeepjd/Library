"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createPaypalOrder, capturePaypalOrder } from "@/lib/paypal";
import { computeUnitPrice, computeDiscountAmount } from "@/lib/pricing";
import { generateToken } from "@/lib/tokens";
import { sendMail } from "@/lib/email";
import { SITE_NAME, ARTWORK_LINK_EXPIRY_DAYS } from "@/lib/constants";

const cartItemSchema = z.object({
  productId: z.string(),
  materialOptionId: z.string().nullable(),
  widthIn: z.number().positive(),
  heightIn: z.number().positive(),
  quantity: z.number().int().min(1),
});

const shippingSchema = z.object({
  name: z.string().min(2),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postal: z.string().min(3),
  country: z.string().min(2),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;
export type ShippingInput = z.infer<typeof shippingSchema>;

async function priceCart(items: CartItemInput[], promoCode?: string) {
  const productIds = [...new Set(items.map((i) => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    include: { materialOptions: true },
  });
  const productMap = new Map(products.map((p) => [p.id, p]));

  const priced = items.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) throw new Error("Product not found");

    const material = item.materialOptionId
      ? product.materialOptions.find((m) => m.id === item.materialOptionId)
      : undefined;

    const unitPrice = computeUnitPrice({
      basePrice: product.basePrice,
      materialModifier: material?.priceModifier ?? 0,
      widthIn: item.widthIn,
      heightIn: item.heightIn,
      quantity: item.quantity,
    });

    return {
      productId: product.id,
      materialOptionId: material?.id ?? null,
      widthIn: item.widthIn,
      heightIn: item.heightIn,
      quantity: item.quantity,
      unitPrice,
      lineTotal: Math.round(unitPrice * item.quantity * 100) / 100,
    };
  });

  const subtotal = Math.round(priced.reduce((sum, i) => sum + i.lineTotal, 0) * 100) / 100;

  let promo = null;
  if (promoCode) {
    const found = await prisma.promoCode.findUnique({ where: { code: promoCode.trim().toUpperCase() } });
    if (found && found.active && (!found.expiresAt || found.expiresAt > new Date())) {
      promo = found;
    }
  }

  const discount = computeDiscountAmount(subtotal, promo);
  const total = Math.round((subtotal - discount) * 100) / 100;

  return { items: priced, subtotal, discount, total, promo };
}

export async function createCheckoutPaypalOrder(
  items: CartItemInput[],
  promoCode?: string
): Promise<{ paypalOrderId: string; total: number } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "You must be signed in to check out" };

  const parsed = z.array(cartItemSchema).min(1).safeParse(items);
  if (!parsed.success) return { error: "Your cart is invalid, please review it and try again" };

  try {
    const { total } = await priceCart(parsed.data, promoCode);
    if (total <= 0) return { error: "Order total must be greater than zero" };

    const paypalOrderId = await createPaypalOrder(total);
    return { paypalOrderId, total };
  } catch (err) {
    console.error(err);
    return { error: "Could not start checkout. Please try again." };
  }
}

export async function captureCheckoutOrder(
  paypalOrderId: string,
  items: CartItemInput[],
  shipping: ShippingInput,
  promoCode?: string
): Promise<{ orderId: string } | { error: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "You must be signed in to check out" };

  const parsedItems = z.array(cartItemSchema).min(1).safeParse(items);
  const parsedShipping = shippingSchema.safeParse(shipping);
  if (!parsedItems.success || !parsedShipping.success) {
    return { error: "Your order details are invalid, please review and try again" };
  }

  try {
    const capture = await capturePaypalOrder(paypalOrderId);
    if (capture.status !== "COMPLETED") {
      return { error: "Payment was not completed" };
    }

    const { items: pricedItems, subtotal, discount, total, promo } = await priceCart(
      parsedItems.data,
      promoCode
    );

    const uploadToken = generateToken();
    const uploadTokenExpiresAt = new Date(
      Date.now() + ARTWORK_LINK_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PROCESSING",
        subtotal,
        discount,
        total,
        promoCodeId: promo?.id,
        shippingName: parsedShipping.data.name,
        shippingLine1: parsedShipping.data.line1,
        shippingLine2: parsedShipping.data.line2,
        shippingCity: parsedShipping.data.city,
        shippingState: parsedShipping.data.state,
        shippingPostal: parsedShipping.data.postal,
        shippingCountry: parsedShipping.data.country,
        paypalOrderId,
        uploadToken,
        uploadTokenExpiresAt,
        items: {
          create: pricedItems.map((item) => ({
            ...item,
            artworkUpload: { create: {} },
          })),
        },
      },
    });

    const uploadUrl = `${process.env.APP_URL}/order/${order.id}/upload/${uploadToken}`;
    const invoiceUrl = `${process.env.APP_URL}/account/orders/${order.id}/invoice`;

    await sendMail({
      to: user.email,
      subject: `Order confirmed — ${SITE_NAME} (#${order.id.slice(-8).toUpperCase()})`,
      html: `
        <p>Thanks for your order! Your payment of $${total.toFixed(2)} was received.</p>
        <p><strong>Upload your artwork:</strong> <a href="${uploadUrl}">${uploadUrl}</a><br/>
        This link expires in ${ARTWORK_LINK_EXPIRY_DAYS} days.</p>
        <p><strong>Invoice:</strong> <a href="${invoiceUrl}">${invoiceUrl}</a></p>
      `,
    }).catch((err) => console.error("Failed to send order confirmation email", err));

    return { orderId: order.id };
  } catch (err) {
    console.error(err);
    return { error: "Could not complete your order. Please contact support." };
  }
}
