import { statSync } from "node:fs";
import { join } from "node:path";
import { PageTitle, Heading, Button } from "@/components/ui";
import { proceedings } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { abs, breadcrumbs, graph, pageMeta, webPage, ORG_ID } from "@/lib/seo";

// Read at build time, so the label always matches the file that ships
const size = (pdf: string) => `${(statSync(join(process.cwd(), "public", pdf)).size / 1_048_576).toFixed(1)} MB`;

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

const seo = {
  path: "/previous-proceedings/",
  title: "Previous Proceedings",
  description: "Download AgInsight conference proceedings and abstract books from 2014, 2016, 2022 and 2024, published by the Faculty of Agricultural Sciences, SUSL.",
  keywords: ["AgInsight proceedings", "AgInsight 2024 proceedings", "agricultural sciences conference proceedings PDF", "extended abstracts", "Sabaragamuwa University"],
  image: { url: "/proceedings/2024.jpg", alt: "AgInsight 2024 abstracts book cover" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, type: "CollectionPage", image: seo.image.url }),
  breadcrumbs([{ name: "Previous Proceedings", path: seo.path }]),
  {
    "@type": "ItemList",
    name: "AgInsight proceedings",
    itemListElement: [...proceedings].reverse().map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: `${p.kind ?? "Proceedings"}: ${p.title} ${p.year}`,
        datePublished: p.year,
        image: abs(p.cover),
        publisher: { "@id": ORG_ID },
        ...(p.pdf && { url: abs(p.pdf), bookFormat: "https://schema.org/EBook" }),
        ...(p.isbn && { isbn: p.isbn }),
        ...(p.theme && { about: p.theme }),
      },
    })),
  },
);

export default function Page() {
  const [latest, ...earlier] = [...proceedings].reverse();

  return (
    <>
      <JsonLd data={schema} />
      <PageTitle
        title="Previous proceedings"
        lead={`Abstracts and proceedings from ${proceedings.length} editions of AgInsight, ${proceedings[0].year} to ${latest.year}.`}
      />

      {/* Latest */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-leaf p-8 sm:p-12 md:grid-cols-12 lg:gap-16">
          <div className="md:col-span-5">
            <img
              src={latest.cover}
              alt={`${latest.title} ${latest.year} cover`}
              className="mx-auto w-full max-w-xs -rotate-2 rounded-lg shadow-2xl shadow-field/30 transition-transform hover:rotate-0"
            />
          </div>
          <div className="md:col-span-7">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">Latest edition</span>
            <h2 className="mt-5 font-slab text-4xl font-semibold tracking-tight text-field sm:text-5xl">
              {latest.kind} {latest.year}
            </h2>
            <p className="mt-3 text-lg font-medium">{latest.title}</p>
            {latest.theme && <p className="mt-4 max-w-xl font-slab text-xl leading-snug text-ink/80">“{latest.theme}”</p>}
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {latest.dates && (
                <div><dt className="text-sm text-muted">Held</dt><dd className="font-medium">{latest.dates}</dd></div>
              )}
              {latest.isbn && (
                <div><dt className="text-sm text-muted">ISBN</dt><dd className="font-medium">{latest.isbn}</dd></div>
              )}
            </dl>
            {latest.pdf && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={latest.pdf}>
                  <DownloadIcon />
                  <span className="ml-2">Download PDF</span>
                </Button>
                <span className="text-sm text-muted">{size(latest.pdf)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <Heading title="Earlier editions" lead="The conference has run since 2007 as a symposium and, from 2014, as an international conference." />
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {earlier.map((p) => (
            <li key={p.year} className="flex flex-col">
              <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-leaf p-6">
                <img src={p.cover} alt={`${p.title} ${p.year} cover`} loading="lazy" className="max-h-full rounded shadow-lg shadow-field/20" />
              </div>
              <p className="mt-5 font-slab text-3xl font-semibold text-field">{p.year}</p>
              <p className="mt-1 font-medium leading-snug">{p.title}</p>
              {p.theme && <p className="mt-2 text-sm italic leading-relaxed text-ink/70">“{p.theme}”</p>}
              <p className="mt-2 text-sm text-muted">{[p.kind, p.dates, p.isbn && `ISBN ${p.isbn}`].filter(Boolean).join(", ")}</p>
              <div className="mt-auto pt-4">
                {p.pdf ? (
                  <a href={p.pdf} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-medium text-primary hover:text-field">
                    <DownloadIcon />
                    Download PDF
                    <span className="font-normal text-muted">({size(p.pdf)})</span>
                  </a>
                ) : (
                  <span className="text-sm text-muted">Not available online</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Journal */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-field p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-slab text-3xl font-semibold tracking-tight">Looking for full papers?</h2>
            <p className="mt-3 text-lg text-white/75">
              Selected papers are published in the Journal of Agricultural Sciences – Sri Lanka, indexed in Web of Science, Scopus,
              DOAJ and EBSCO.
            </p>
          </div>
          <div className="md:shrink-0">
            <Button href="https://jas.sljol.info/">Visit the journal</Button>
          </div>
        </div>
      </section>
    </>
  );
}
