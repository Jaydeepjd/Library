import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const FEATURES = [
  { value: "6+", label: "Product Categories" },
  { value: "24hr", label: "Free Digital Proof" },
  { value: "24/7", label: "Expert Support" },
];

export function BrandBanner() {
  return (
    <section className="bg-neutral-900 py-16 text-center text-white">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-red-500">
          {SITE_NAME}
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          Professional displays, built around your brand
        </h2>
        <p className="mt-3 text-sm text-neutral-400">
          From step-and-repeat backdrops to full exhibition booths — every display is printed to
          spec and checked by a real person before it ships.
        </p>
        <Link href="/quote" className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4">
          See How It Works
        </Link>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
          {FEATURES.map((f) => (
            <div key={f.label}>
              <p className="text-xl font-bold">{f.value}</p>
              <p className="mt-1 text-xs text-neutral-400">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
