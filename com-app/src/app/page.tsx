import { getShowcaseCollections } from "@/lib/data/products";
import { getNavCategories } from "@/lib/data/categories";
import { Hero } from "@/components/home/Hero";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SustainabilityStrip } from "@/components/home/SustainabilityStrip";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { SizeGuide } from "@/components/home/SizeGuide";
import { FrameEngineering } from "@/components/home/FrameEngineering";
import { BrandBanner } from "@/components/home/BrandBanner";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, collections] = await Promise.all([
    getNavCategories(),
    getShowcaseCollections(),
  ]);

  return (
    <div>
      <Hero />
      <TrustedLogos />
      <CategoryGrid categories={categories} />
      <SustainabilityStrip />
      <CollectionShowcase collections={collections} />
      <SizeGuide />
      <FrameEngineering />
      <BrandBanner />
    </div>
  );
}
