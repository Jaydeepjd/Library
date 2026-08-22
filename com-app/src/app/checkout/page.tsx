import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Checkout | ${SITE_NAME}`,
};

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/checkout");

  return <CheckoutForm defaultName={user.name} />;
}
