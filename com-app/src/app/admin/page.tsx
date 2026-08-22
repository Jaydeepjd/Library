import type { Metadata } from "next";
import { getRevenueStats } from "@/lib/data/admin";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Admin Dashboard | ${SITE_NAME}` };

export default async function AdminDashboardPage() {
  const stats = await getRevenueStats();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-neutral-900">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-5">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Total Revenue</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 p-5">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Total Orders</p>
          <p className="mt-1 text-3xl font-bold text-neutral-900">{stats.orderCount}</p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border border-neutral-200 p-5">
        <h2 className="mb-4 text-sm font-semibold text-neutral-900">Monthly Revenue</h2>
        <RevenueChart data={stats.monthlyRevenue} />
      </div>

      <div className="rounded-lg border border-neutral-200 p-5">
        <h2 className="mb-4 text-sm font-semibold text-neutral-900">Top Products</h2>
        {stats.topProducts.length === 0 ? (
          <p className="text-sm text-neutral-500">No sales yet.</p>
        ) : (
          <ul className="space-y-2">
            {stats.topProducts.map((p) => (
              <li key={p.name} className="flex justify-between text-sm">
                <span className="text-neutral-700">{p.name}</span>
                <span className="font-medium text-neutral-900">${p.revenue.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
