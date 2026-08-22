import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrdersForUser } from "@/lib/data/orders";
import { StatusBadge } from "@/components/order/StatusBadge";
import { logoutAction } from "@/lib/actions/auth";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `My Orders | ${SITE_NAME}`,
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect=/account");

  const orders = await getOrdersForUser(user.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Orders</h1>
          <p className="text-sm text-neutral-500">Signed in as {user.email}</p>
        </div>
        <form action={logoutAction}>
          <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
            Sign out
          </button>
        </form>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-neutral-500">
          You haven&apos;t placed any orders yet.{" "}
          <Link href="/" className="font-medium text-neutral-900 underline">
            Start shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 hover:border-neutral-400"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Order #{order.id.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-neutral-500">
                  {order.createdAt.toLocaleDateString()} &middot; {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-neutral-900">
                  ${order.total.toFixed(2)}
                </span>
                <StatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
