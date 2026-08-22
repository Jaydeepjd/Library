import Link from "next/link";
import { getNavCategories } from "@/lib/data/categories";
import { getCurrentUser } from "@/lib/auth";
import { CartLink } from "@/components/layout/CartLink";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchBox } from "@/components/layout/SearchBox";
import { Logo } from "@/components/layout/Logo";
import { TrustBar } from "@/components/layout/TrustBar";

export async function Header() {
  const [categories, user] = await Promise.all([getNavCategories(), getCurrentUser()]);

  return (
    <header className="sticky top-0 z-30">
      <TrustBar />

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <MobileNav categories={categories} />
          <Logo />

          <span className="hidden shrink-0 rounded-full bg-brand-red-600/10 px-3 py-1 text-xs font-semibold text-brand-red-600 lg:inline-block">
            Get 10% off your first order &middot; code WELCOME10
          </span>

          <SearchBox />

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/quote"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 lg:inline-block"
            >
              Request a Quote
            </Link>
            <Link
              href={user ? (user.role === "ADMIN" ? "/admin" : "/account") : "/login"}
              className="hidden items-center gap-1.5 rounded-md p-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 sm:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
              </svg>
              <span>{user ? "Account" : "Login / Register"}</span>
            </Link>
            <Link
              href={user ? (user.role === "ADMIN" ? "/admin" : "/account") : "/login"}
              className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 sm:hidden"
              aria-label={user ? "Account" : "Login"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
              </svg>
            </Link>
            <CartLink />
          </div>
        </div>
      </div>

      <MegaMenu categories={categories} />
    </header>
  );
}
