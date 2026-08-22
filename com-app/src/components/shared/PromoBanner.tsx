import Image from "next/image";
import Link from "next/link";

export function PromoBanner({ withImage = false }: { withImage?: boolean }) {
  return (
    <div
      className={`col-span-full flex flex-col overflow-hidden rounded-lg bg-brand-navy-800 text-white sm:flex-row ${
        withImage ? "items-stretch" : "items-center justify-between gap-4 p-6"
      }`}
    >
      <div className={withImage ? "flex flex-1 flex-col justify-center p-8" : ""}>
        <h3 className="text-lg font-bold sm:text-xl">Not sure which display fits your booth?</h3>
        <p className="mt-1 max-w-md text-sm text-neutral-300">
          Get a free 2D mockup with your artwork — see exactly how it looks before you order.
          1,200+ happy exhibitors.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/quote"
            className="rounded-md bg-brand-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-700"
          >
            Request Free 2D Design
          </Link>
          <Link
            href="/quote"
            className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
      {withImage && (
        <div className="relative h-40 sm:h-auto sm:w-80">
          <Image
            src="https://picsum.photos/seed/printcraft-vision/500/400"
            alt=""
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
