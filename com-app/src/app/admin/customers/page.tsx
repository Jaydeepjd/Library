import type { Metadata } from "next";
import { getCustomersWithOrderCount } from "@/lib/data/admin";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Customers | ${SITE_NAME} Admin` };

export default async function AdminCustomersPage() {
  const customers = await getCustomersWithOrderCount();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Customers</h1>

      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Total Spent</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-neutral-100">
                <td className="px-4 py-3 font-medium text-neutral-900">{c.name}</td>
                <td className="px-4 py-3 text-neutral-600">{c.email}</td>
                <td className="px-4 py-3 text-neutral-600">{c.orderCount}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">${c.totalSpent.toFixed(2)}</td>
                <td className="px-4 py-3 text-neutral-500">{c.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-neutral-500">No customers yet.</p>
        )}
      </div>
    </div>
  );
}
