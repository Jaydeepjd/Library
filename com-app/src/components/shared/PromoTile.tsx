import Image from "next/image";
import Link from "next/link";

export function PromoTile() {
  return (
    <div className="row-span-2 flex flex-col overflow-hidden rounded-lg border border-neutral-200">
      <div className="relative aspect-square">
        <Image
          src="https://picsum.photos/seed/printcraft-expertise/500/500"
          alt="Design consultation"
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center bg-brand-navy-950 p-4 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-300">
          Your Vision. Our Expertise.
        </p>
        <p className="mt-1 text-sm text-neutral-300">Not sure which display fits your booth?</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href="/quote"
            className="rounded-md bg-brand-red-600 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-brand-red-700"
          >
            Request Free 2D Design
          </Link>
          <Link
            href="/quote"
            className="rounded-md border border-white/40 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-white/10"
          >
            Talk to an Expert
          </Link>
        </div>
      </div>
    </div>
  );
}
