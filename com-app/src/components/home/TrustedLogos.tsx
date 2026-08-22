const PLACEHOLDER_BRANDS = ["Northline", "Aster & Co", "Vantage", "Cobalt Labs", "Meridian", "Palisade"];

export function TrustedLogos() {
  return (
    <section className="border-b border-neutral-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="mb-6 text-xs font-bold uppercase tracking-wider text-neutral-400">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLACEHOLDER_BRANDS.map((brand) => (
            <span key={brand} className="text-lg font-bold tracking-tight text-neutral-300">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
