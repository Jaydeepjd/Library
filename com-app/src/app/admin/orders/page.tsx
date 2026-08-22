import type { Metadata } from "next";
import { getAllOrders } from "@/lib/data/admin";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Orders | ${SITE_NAME} Admin` };

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Orders</h1>

      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-neutral-100">
                <td className="px-4 py-3 font-medium text-neutral-900">
                  #{order.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-4 py-3 text-neutral-600">{order.user.email}</td>
                <td className="px-4 py-3 text-neutral-600">{order.items.length}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">${order.total.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
                <td className="px-4 py-3 text-neutral-500">{order.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-neutral-500">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
