import Link from "next/link";

const STATS = [
  { value: "150+", label: "Products available" },
  { value: "5,000+", label: "Orders shipped" },
  { value: "12+", label: "Countries served" },
];

export function CategoryHero({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-navy-950 sm:text-3xl">{name}</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">{description}</p>

        <div className="mt-6 flex flex-wrap gap-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl font-bold text-brand-navy-950">{stat.value}</p>
              <p className="text-xs text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/quote"
            className="rounded-md bg-brand-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-700"
          >
            Request Free 2D Design
          </Link>
          <Link
            href="/quote"
            className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </div>
  );
}
