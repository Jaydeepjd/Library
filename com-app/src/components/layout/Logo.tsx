import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex shrink-0 flex-col leading-none">
      <span className="flex overflow-hidden rounded-sm text-base font-extrabold tracking-tight sm:text-lg">
        <span className="bg-brand-navy-900 px-2 py-1 text-white">PRINT</span>
        <span className="bg-brand-red-600 px-2 py-1 text-white">CRAFT</span>
      </span>
      <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-wider text-neutral-500 sm:block">
        Making Brands Desirable Since 2016
      </span>
    </Link>
  );
}
