import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { parseImages } from "@/lib/images";
import { pseudoRating } from "@/lib/ratings";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceCalculator } from "@/components/product/PriceCalculator";
import { RatingStars } from "@/components/product/RatingStars";
import { ProductCard } from "@/components/product/ProductCard";
import { HowToOrderSteps } from "@/components/product/HowToOrderSteps";
import { ProductSpecsTabs } from "@/components/product/ProductSpecsTabs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: product.description.slice(0, 155),
  };
}

const FAQ_ITEMS = [
  {
    question: "What materials are used?",
    answer: "Standard polyester, blockout fabric, or premium stretch satin, depending on the material option you select.",
  },
  {
    question: "How long does setup take?",
    answer: "Most tool-free frames assemble in under 10 minutes — no assembly tutorial required.",
  },
  {
    question: "Can I customize the graphic later?",
    answer: "Yes — order a replacement graphic panel any time and reuse the same frame.",
  },
  {
    question: "What print method is used?",
    answer: "Full-color dye-sublimation printing for rich, fade-resistant color on fabric.",
  },
  {
    question: "Is the fabric machine washable?",
    answer: "Yes, our fabric graphics are machine washable on a cold, gentle cycle.",
  },
];

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const images = parseImages(product.images);
  const gallery = images.length > 0
    ? [images[0], `https://picsum.photos/seed/${product.slug}-2/900/700`, `https://picsum.photos/seed/${product.slug}-3/900/700`, `https://picsum.photos/seed/${product.slug}-4/900/700`]
    : [];
  const { rating, reviewCount } = pseudoRating(product.id);
  const related = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-6 text-xs text-neutral-500">
          <Link href="/" className="hover:underline">Home</Link>
          {" / "}
          <Link href={`/category/${product.category.slug}`} className="hover:underline">
            {product.category.name}
          </Link>
          {" / "}
          <span className="text-neutral-700">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={gallery} name={product.name} />

          <div>
            <h1 className="text-2xl font-bold text-brand-navy-950">{product.name}</h1>
            <div className="mt-2">
              <RatingStars rating={rating} reviewCount={reviewCount} />
            </div>
            <p className="mt-3 text-2xl font-bold text-brand-navy-950">
              ${product.basePrice.toFixed(2)}
              <span className="ml-2 text-sm font-normal text-neutral-500">starting price</span>
            </p>
            <p className="mt-3 text-sm text-neutral-600">{product.description}</p>

            <div className="mt-6">
              <PriceCalculator
                productId={product.id}
                slug={product.slug}
                name={product.name}
                basePrice={product.basePrice}
                image={images[0] ?? ""}
                materialOptions={product.materialOptions}
              />
            </div>
          </div>
        </div>
      </div>

      <HowToOrderSteps />
      <ProductSpecsTabs description={product.description} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="mb-6 text-center text-xl font-bold text-brand-navy-950">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <h2 className="mb-6 text-center text-xl font-bold text-brand-navy-950">Frequently Asked Questions</h2>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>

      <div className="border-t border-neutral-200">
        <ProductReviews rating={rating} reviewCount={reviewCount} />
      </div>
    </div>
  );
}
