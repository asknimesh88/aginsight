import Link from "next/link";
import { Heading } from "@/components/ui";
import type { Person } from "@/lib/site";

// Large keynote layout: sticky portrait, highlight figures, full biography
export default function KeynoteProfile({ p, heading = p.name, note, label = p.role, link }: { p: Person; heading?: string; note?: string; label?: string; link?: { href: string; label: string } }) {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-3xl bg-leaf">
          <img src={p.photo} alt={`${p.name}, ${p.title}`} className="aspect-square w-full object-cover object-top lg:aspect-[4/5]" />
          <span className="absolute left-6 top-6 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-white">{label}</span>
        </div>
      </div>

      <div className="lg:col-span-7">
        <Heading title={heading} lead={p.title} />

        {p.highlights && (
          <>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-black/10 rounded-2xl bg-leaf py-6">
              {p.highlights.map((h) => (
                <div key={h.label} className="flex flex-col-reverse justify-end px-4 text-center sm:px-6">
                  <dt className="mt-1 text-sm leading-snug text-muted">{h.label}</dt>
                  <dd className="font-slab text-2xl font-semibold text-field sm:text-3xl">{h.value}</dd>
                </div>
              ))}
            </dl>
            {note && <p className="mt-3 text-sm text-muted">{note}</p>}
          </>
        )}

        <div className="mt-10 flex flex-col gap-5 text-lg leading-relaxed text-ink/85">
          {p.bio?.map((b) => <p key={b.slice(0, 24)}>{b}</p>)}
        </div>
        {link && (
          <Link href={link.href} className="mt-8 inline-block font-medium text-primary underline underline-offset-4 hover:text-field">
            {link.label}
          </Link>
        )}
      </div>
    </section>
  );
}
