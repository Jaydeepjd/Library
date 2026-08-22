const STEPS = [
  { title: "Choose Product", desc: "Pick a product, size, and material.", icon: "bag" },
  { title: "Checkout Securely", desc: "Pay via PayPal — sandbox test mode.", icon: "cart" },
  { title: "Upload Artwork", desc: "Use your secure link right after payment.", icon: "upload" },
  { title: "We Print & Ship", desc: "Proofed, printed, and shipped to you.", icon: "truck" },
];

function StepIcon({ name }: { name: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    className: "h-5 w-5",
  };
  switch (name) {
    case "bag":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l1 12H5zM9 8a3 3 0 1 1 6 0" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 11h9.6L19 8H6" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4M8 8l4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      );
    default:
      return null;
  }
}

export function HowToOrderSteps() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-center text-xl font-bold text-brand-navy-950">How to order your backdrop</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-950 text-white">
                <StepIcon name={step.icon} />
              </div>
              <p className="text-xs font-bold text-brand-red-600">STEP {i + 1}</p>
              <p className="mt-1 text-sm font-semibold text-brand-navy-950">{step.title}</p>
              <p className="mt-1 text-xs text-neutral-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
