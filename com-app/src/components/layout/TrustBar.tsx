const ITEMS = [
  { icon: "print", label: "We Print It Right, Or We Print It Again" },
  { icon: "leaf", label: "Sustainable, PVC-Free Fabric" },
  { icon: "truck", label: "Free Shipping" },
  { icon: "shield", label: "1-Year Product Warranty" },
  { icon: "badge", label: "Trusted For 10+ Years" },
];

function TrustIcon({ name }: { name: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    className: "h-3.5 w-3.5 shrink-0",
  };
  switch (name) {
    case "print":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 20c9 0 14-5 14-14 0 0-14-1-14 9 0 2 1 3 1 3M5 20c0-4 2-8 6-10" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 13l-2 8 5-2.5L17 21l-2-8" />
        </svg>
      );
    default:
      return null;
  }
}

export function TrustBar() {
  return (
    <div className="hidden bg-brand-navy-900 text-neutral-200 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-1.5 text-[11px] font-medium tracking-wide">
        {ITEMS.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5 whitespace-nowrap">
            <TrustIcon name={item.icon} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
