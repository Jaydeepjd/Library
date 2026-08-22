import Link from "next/link";
import { getAllTopLevelCategoriesWithProductCount } from "@/lib/data/categories";
import { SITE_NAME } from "@/lib/constants";

const SOCIAL = ["X", "Facebook", "Pinterest", "Instagram", "YouTube"];

export async function Footer() {
  const categories = await getAllTopLevelCategoriesWithProductCount();

  return (
    <footer className="bg-brand-navy-950 text-neutral-300">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:grid-cols-4">
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Most Purchased</h3>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="text-sm text-neutral-400 hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/quote" className="text-sm text-neutral-400 hover:text-white">Request a Quote</Link></li>
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white">About Us</Link></li>
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white">Our Work</Link></li>
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white">Contact Us</Link></li>
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white">Shipping Policy</Link></li>
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white">Return Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Account</h3>
          <ul className="space-y-2">
            <li><Link href="/account" className="text-sm text-neutral-400 hover:text-white">Order History</Link></li>
            <li><Link href="/login" className="text-sm text-neutral-400 hover:text-white">Sign In</Link></li>
            <li><Link href="/register" className="text-sm text-neutral-400 hover:text-white">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Get in Touch</h3>
          <p className="text-sm text-neutral-400">sales@{SITE_NAME.toLowerCase()}.com</p>
          <p className="mt-1 text-sm text-neutral-400">+1 (555) 010-1888</p>
          <div className="mt-4 flex gap-3">
            {SOCIAL.map((s) => (
              <span
                key={s}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-[10px] font-semibold text-neutral-400"
                aria-label={s}
              >
                {s[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>

      <div className="overflow-hidden border-t border-white/5 py-2 text-center select-none">
        <span className="text-[15vw] font-extrabold leading-none tracking-tight text-white/5 sm:text-8xl">
          {SITE_NAME}
        </span>
      </div>
    </footer>
  );
}
