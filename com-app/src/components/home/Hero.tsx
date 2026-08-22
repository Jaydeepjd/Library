import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <h1 className="max-w-lg text-3xl font-bold tracking-tight text-brand-navy-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Custom Backdrops for Events, Exhibitions &amp; Branding
          </h1>
          <p className="mt-4 max-w-md text-sm text-neutral-600">
            Print-and-repeat tension fabric displays and exhibition booths — built and printed to
            your brand, shipped ready to install.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/quote"
              className="rounded-md bg-brand-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-700"
            >
              Talk to an Expert
            </Link>
            <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-xs text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 text-brand-red-600">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 3" />
              </svg>
              See it from every angle
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src="https://picsum.photos/seed/printcraft-hero/1000/750"
              alt="Custom printed tension fabric backdrop at a trade show booth"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full ${i === 0 ? "w-6 bg-brand-red-600" : "w-1.5 bg-neutral-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
