import Image from "next/image";
import Link from "next/link";
import { parseImages } from "@/lib/images";
import { pseudoRating } from "@/lib/ratings";
import { RatingStars } from "@/components/product/RatingStars";

type CardProduct = {
  id: string;
  slug: string;
  name: string;
  basePrice: number;
  images: string;
  category: { name: string };
};

export function ProductCard({ product }: { product: CardProduct }) {
  const [image] = parseImages(product.images);
  const { rating, reviewCount } = pseudoRating(product.id);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-3">
        <p className="text-xs uppercase tracking-wide text-neutral-500">{product.category.name}</p>
        <h3 className="mt-0.5 text-sm font-medium text-neutral-900">{product.name}</h3>
        <div className="mt-1">
          <RatingStars rating={rating} reviewCount={reviewCount} />
        </div>
        <p className="mt-1 text-sm font-semibold text-brand-navy-950">
          From ${product.basePrice.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
