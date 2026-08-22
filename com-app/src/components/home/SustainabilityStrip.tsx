import Image from "next/image";

const MESSAGES = [
  "Supporting more sustainable events worldwide",
  "Reduced waste through on-demand production",
  "Supporting suppliers who print responsibly",
  "PVC-free fabric on every backdrop",
];

export function SustainabilityStrip() {
  const loop = [...MESSAGES, ...MESSAGES];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-28 w-full sm:h-36">
        <Image
          src="https://picsum.photos/seed/printcraft-sustainability/1600/300"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy-950/70" />
      </div>
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-10 whitespace-nowrap">
          {loop.map((msg, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-semibold text-white">
              {msg}
              <span className="h-1 w-1 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
