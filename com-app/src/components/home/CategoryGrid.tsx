import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  children: { id: string; name: string; slug: string }[];
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const tiles = categories.flatMap((c) => [
    { id: c.id, name: c.name, slug: c.slug },
    ...c.children.map((child) => ({ id: child.id, name: child.name, slug: child.slug })),
  ]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="mb-6 text-center text-2xl font-bold text-brand-navy-950">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Link
            key={tile.id}
            href={`/category/${tile.slug}`}
            className="group rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:border-brand-red-600"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-neutral-100">
              <Image
                src={`https://picsum.photos/seed/${tile.slug}/400/400`}
                alt={tile.name}
                fill
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={i < 4}
              />
              <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-red-600 shadow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </div>
            <p className="mt-2 text-center text-sm font-medium text-brand-navy-950">{tile.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
