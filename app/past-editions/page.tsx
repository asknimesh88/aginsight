import Link from "next/link";
import { PageTitle, Heading, Button, Photo } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { conf, conf2024, proceedings } from "@/lib/site";
import gallery from "@/lib/gallery.json";
import { abs, breadcrumbs, graph, pageMeta, webPage, EVENT_2024_ID } from "@/lib/seo";

const seo = {
  path: "/past-editions/",
  title: "Past Editions",
  description: "Every AgInsight edition since 2007: revisit the AgInsight 2024 website and download proceedings from the 2022, 2016, 2014 and 2007 conferences.",
  keywords: ["AgInsight past editions", "AgInsight 2024", "AgInsight history", "International Conference of Agricultural Sciences archive", "AgInsight proceedings"],
  image: { url: "/photos/aginsight-2024-home-1600.webp", alt: "The AgInsight 2024 homepage" },
};
export const metadata = pageMeta(seo);

const byYear = Object.fromEntries(proceedings.map((p) => [p.year, p]));
const p2024 = byYear["2024"];
const earlier = [...proceedings].filter((p) => p.year !== "2024").reverse();
const galleryYears = new Set(Object.keys(gallery));

const schema = graph(
  webPage({ ...seo, type: "CollectionPage", image: seo.image.url }),
  breadcrumbs([{ name: "Past Editions", path: seo.path }]),
  {
    "@type": "ItemList",
    name: "AgInsight past editions",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: conf2024.name, item: { "@id": EVENT_2024_ID, url: abs("/aginsight-2024/") } },
      ...earlier.map((p, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: `AgInsight ${p.year}: ${p.title}`,
        ...(p.pdf && { url: abs(p.pdf) }),
      })),
    ],
  },
);

const quickLinks = [
  { label: "Speakers", href: "/chief-guest-and-keynote-speakers/" },
  { label: "Call for papers", href: "/call-for-papers-2024/" },
  { label: "Important dates", href: "/important-dates-2024/" },
  { label: "Contacts", href: "/contact-us-2024/" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Past Editions" lead={`AgInsight has brought agricultural researchers together since ${earlier.at(-1)!.year}. Revisit earlier conferences here.`} />

      {/* AgInsight 2024 */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <article className="grid overflow-hidden rounded-3xl bg-leaf lg:grid-cols-12">
          <Link href="/aginsight-2024/" className="group relative block overflow-hidden lg:col-span-7" aria-label="Visit the AgInsight 2024 website">
            <Photo
              name="aginsight-2024-home"
              alt="The AgInsight 2024 homepage: 5th International Conference of Agricultural Sciences, 11–12 September 2024"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[5/3] h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden />
          </Link>
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-5">
            <span className="w-fit rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">Previous edition</span>
            <p className="mt-5 text-muted">{conf2024.edition}</p>
            <h2 className="mt-1 font-slab text-4xl font-semibold tracking-tight text-field">{conf2024.name}</h2>
            <p className="mt-3 font-slab text-lg leading-snug text-ink/80">“{conf2024.theme}”</p>
            <p className="mt-4 text-sm text-muted">
              {conf2024.dates}, {conf2024.format.toLowerCase()} at Sabaragamuwa University of Sri Lanka
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/aginsight-2024/">Visit the 2024 site</Button>
              {p2024?.pdf && <Button href={p2024.pdf} variant="light">Proceedings (PDF)</Button>}
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-primary/15 pt-5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-medium text-primary hover:text-field">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Earlier editions */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Earlier editions" lead="Proceedings and photos from the conferences before 2024." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {earlier.map((p) => (
              <li key={p.year} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-leaf p-5">
                  <img src={p.cover} alt={`${p.title} ${p.year} proceedings cover`} loading="lazy" className="max-h-full rounded shadow-lg shadow-field/20" />
                </div>
                <p className="mt-5 font-slab text-3xl font-semibold text-field">{p.year}</p>
                <p className="mt-1 font-medium leading-snug">{p.title}</p>
                {p.theme && <p className="mt-2 text-sm italic leading-relaxed text-ink/70">“{p.theme}”</p>}
                {p.dates && <p className="mt-2 text-sm text-muted">{p.dates}</p>}
                <div className="mt-auto flex flex-col gap-1.5 pt-5 text-sm">
                  {p.pdf ? (
                    <a href={p.pdf} target="_blank" rel="noopener" className="font-medium text-primary hover:text-field">Download proceedings</a>
                  ) : (
                    <span className="text-muted">Proceedings not available online</span>
                  )}
                  {galleryYears.has(p.year) && (
                    <Link href={`/gallery/#y${p.year}`} className="font-medium text-primary hover:text-field">See photos</Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-field p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-slab text-3xl font-semibold tracking-tight">Join us at {conf.name}</h2>
            <p className="mt-3 text-lg text-white/75">{conf.dates} at the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.</p>
          </div>
          <div className="md:shrink-0">
            <Button href="/">Go to {conf.name}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
