import Image from "next/image";

const FRAMES = ["Retractable", "Pop-Up", "SEG Backlit", "Tension", "Tool-Free Insert"];

export function FrameEngineering() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-brand-navy-950">
          Frame engineering that holds up event after event
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Precision-machined joints and tool-free tension locks, built for exhibitors who set up
          their own booth.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {FRAMES.map((frame, i) => (
          <div key={frame}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={`https://picsum.photos/seed/frame-${i}/300/300`}
                alt={`${frame} frame mechanism`}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center text-xs font-medium text-neutral-600">{frame}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
