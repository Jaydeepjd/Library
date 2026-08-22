import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryWithDescendantIds } from "@/lib/data/categories";
import { getProductsByCategoryIds, type ProductSort } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSelect } from "@/components/product/SortSelect";
import { CategoryHero } from "@/components/category/CategoryHero";
import { PromoTile } from "@/components/shared/PromoTile";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { Testimonials } from "@/components/shared/Testimonials";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCategoryWithDescendantIds(slug);
  if (!result) return {};

  return {
    title: `${result.category.name} | ${SITE_NAME}`,
    description: `Shop custom ${result.category.name.toLowerCase()} — printed to your exact size and material spec.`,
  };
}

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const FAQ_ITEMS = [
  {
    question: "How long does production take?",
    answer: "Most orders print and ship within 3-5 business days after artwork is approved.",
  },
  {
    question: "Can I get a custom size?",
    answer: "Yes — enter any width and height on the product page and pricing updates instantly.",
  },
  {
    question: "What file formats do you accept for artwork?",
    answer: "PDF, PNG, and AI files up to 50MB, uploaded securely after checkout.",
  },
  {
    question: "Do you offer bulk pricing?",
    answer: "Yes, quantity discounts apply automatically at 5, 10, and 25+ units — or request a quote for larger runs.",
  },
  {
    question: "What's your return policy?",
    answer: "Because every order is custom printed, we can't accept returns for buyer's remorse, but we'll reprint any order that arrives damaged or misprinted.",
  },
];

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const result = await getCategoryWithDescendantIds(slug);
  if (!result) notFound();

  const { category, categoryIds } = result;
  const activeSort = (SORT_OPTIONS.some((o) => o.value === sort) ? sort : "popularity") as ProductSort;
  const products = await getProductsByCategoryIds(categoryIds, activeSort);

  const siblingLinks = category.parent
    ? category.parent.children.filter((c) => c.id !== category.id)
    : category.children;

  return (
    <div>
      <CategoryHero
        name={category.name}
        description={`Custom-printed ${category.name.toLowerCase()}, built to your exact size and material spec — proofed before it prints, shipped ready to install.`}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-4 text-xs text-neutral-500">
          <Link href="/" className="hover:underline">Home</Link>
          {category.parent && (
            <>
              {" / "}
              <Link href={`/category/${category.parent.slug}`} className="hover:underline">
                {category.parent.name}
              </Link>
            </>
          )}
          {" / "}
          <span className="text-neutral-700">{category.name}</span>
        </nav>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {category.children.length > 0 ? (
            <div className="flex flex-wrap gap-2 rounded-full bg-neutral-100 p-1">
              {[category, ...category.children].map((c, i) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    i === 0 ? "bg-white text-brand-navy-950 shadow" : "text-neutral-600 hover:text-brand-navy-950"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{products.length} products</p>
          )}

          <SortSelect activeSort={activeSort} />
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-neutral-500">No products in this category yet.</p>
        ) : (
          <div className="grid auto-rows-min grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <PromoTile />
            {products.slice(0, 7).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length > 3 && <PromoBanner />}
            {products.slice(7).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {siblingLinks.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="mb-6 text-center text-xl font-bold text-brand-navy-950">Related Collections</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {siblingLinks.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-neutral-200 p-3 hover:border-brand-red-600"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                  <Image src={`https://picsum.photos/seed/${c.slug}/200/200`} alt={c.name} fill sizes="64px" className="object-cover" />
                </div>
                <span className="flex-1 text-sm font-medium text-brand-navy-950">{c.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-neutral-400 group-hover:text-brand-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6">
        <PromoBanner withImage />
      </div>

      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-navy-950">Frequently Asked Questions</h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>
    </div>
  );
}
