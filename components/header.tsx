"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { conf, nav } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const active = (href: string) => path === href;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="shrink-0" aria-label="AgInsight home">
          <img src="/brand/logo.png" alt="AgInsight" width={84} height={58} className="h-12 w-auto" />
        </Link>

        {/* Desktop */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="rounded px-3 py-2 text-[15px] font-medium hover:text-primary" aria-haspopup="true">
                  {item.label} <span aria-hidden>▾</span>
                </button>
                <div className="invisible absolute left-0 top-full w-60 rounded-md border border-black/5 bg-white py-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`block px-4 py-2 text-[15px] hover:bg-leaf hover:text-primary ${active(c.href) ? "text-primary" : ""}`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 text-[15px] font-medium hover:text-primary ${active(item.href) ? "text-primary" : ""}`}
              >
                {item.label}
              </Link>
            ),
          )}
          <a href={conf.submitUrl} className="ml-3 rounded-full bg-primary px-5 py-2.5 text-[15px] font-medium text-white hover:bg-field">
            Submit abstract
          </a>
        </nav>

        {/* Mobile: native disclosure, re-keyed on navigation so it closes */}
        <details key={path} className="group ml-auto lg:hidden">
          <summary className="cursor-pointer list-none rounded p-2 [&::-webkit-details-marker]:hidden" aria-label="Menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path className="group-open:hidden" d="M3 6h18M3 12h18M3 18h18" />
              <path className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </summary>
          <nav className="fixed inset-x-0 top-18 max-h-[80vh] overflow-y-auto border-b border-black/5 bg-white px-4 pb-6 shadow-lg" aria-label="Main">
            {nav.flatMap((i) => i.children ?? [i]).map((c) => (
              <Link key={c.href} href={c.href} className="block border-b border-black/5 py-3 font-medium">
                {c.label}
              </Link>
            ))}
            <a href={conf.submitUrl} className="mt-5 block rounded-full bg-primary py-3 text-center font-medium text-white">
              Submit abstract
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
