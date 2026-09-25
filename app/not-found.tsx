import Link from "next/link";
import { Button } from "@/components/ui";
import { nav } from "@/lib/site";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  const links = nav.flatMap((i) => i.children ?? [i]);
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <p className="font-slab text-7xl font-bold text-secondary">404</p>
      <h1 className="mt-4 font-slab text-4xl font-semibold tracking-tight text-field">This page doesn’t exist</h1>
      <p className="mt-4 max-w-xl text-lg text-ink/75">
        The link may be old or mistyped. Try one of these pages instead, or go back to the homepage.
      </p>
      <div className="mt-8">
        <Button href="/">Go to the homepage</Button>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block rounded-2xl bg-leaf px-5 py-4 font-medium text-field hover:bg-primary hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
