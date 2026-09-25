import { PageTitle, Heading, Button } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { abs, breadcrumbs, graph, pageMeta, webPage, ORG_ID } from "@/lib/seo";

const facts = [
  { label: "Issues per year", value: "3" },
  { label: "Published in", value: "January, May, September" },
  { label: "Publisher", value: "Faculty of Agricultural Sciences, SUSL" },
];

const indexes = ["Web of Science (ESCI)", "Scopus", "DOAJ", "EBSCO"];

const types = [
  { title: "Original research", d: "M9 3h6M10 3v6L4.5 18.5A1.5 1.5 0 005.8 21h12.4a1.5 1.5 0 001.3-2.5L14 9V3M7 15h10" },
  { title: "Short communications", d: "M4 5h16v11H8l-4 4V5zM8 9h8M8 12h5" },
  { title: "Comparative articles", d: "M4 20V10M10 20V4M16 20v-8M22 20H2" },
  { title: "Book reviews", d: "M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zM8 7h6M8 11h6" },
];

const seo = {
  path: "/journals/",
  title: "Journals",
  description: "Publish your AgInsight paper in the Journal of Agricultural Sciences – Sri Lanka (JASSL), indexed in Web of Science, Scopus, DOAJ and EBSCO.",
  keywords: ["Journal of Agricultural Sciences Sri Lanka", "JASSL", "agriculture journal Sri Lanka", "Scopus indexed agriculture journal", "AgInsight journals"],
  image: { url: "/docs/journal.png", alt: "Journal of Agricultural Sciences – Sri Lanka cover" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, image: seo.image.url }),
  breadcrumbs([{ name: "Journals", path: seo.path }]),
  {
    "@type": "Periodical",
    name: "Journal of Agricultural Sciences – Sri Lanka",
    alternateName: "JASSL",
    issn: ["1391-9318", "2386-1369"],
    url: "https://jas.sljol.info/",
    image: abs(seo.image.url),
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  },
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Journals" lead="Selected AgInsight papers can go on to publication in the faculty’s peer-reviewed journal." />

      {/* Journal feature */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid items-center gap-12 rounded-3xl bg-leaf p-8 sm:p-12 md:grid-cols-12 lg:gap-16">
          <div className="md:col-span-4">
            <img
              src="/docs/journal.png"
              alt="Journal of Agricultural Sciences – Sri Lanka cover"
              className="mx-auto w-full max-w-[240px] -rotate-2 rounded-lg shadow-2xl shadow-field/30"
            />
          </div>
          <div className="md:col-span-8">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">Peer reviewed</span>
            <h2 className="mt-5 font-slab text-3xl font-semibold tracking-tight text-field sm:text-4xl">
              Journal of Agricultural Sciences – Sri Lanka
            </h2>
            <p className="mt-2 text-lg text-muted">JASSL</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">
              A forum for Sri Lankan and international scholars to publish authoritative, well-referenced articles on topical
              issues in agriculture.
            </p>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border-t-2 border-primary/20 pt-3">
                  <dt className="text-sm text-muted">{f.label}</dt>
                  <dd className="mt-1 font-medium leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Indexing */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <Heading title="Indexed in" lead="Articles are discoverable through the major research databases." />
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {indexes.map((x) => (
            <li key={x} className="flex h-24 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 text-center font-slab text-lg font-semibold text-field shadow-sm">
              {x}
            </li>
          ))}
        </ul>
      </section>

      {/* Article types */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="What the journal publishes" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {types.map((t) => (
              <li key={t.title} className="rounded-3xl bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={t.d} /></svg>
                </span>
                <h3 className="mt-6 font-slab text-xl font-semibold">{t.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-field p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-slab text-3xl font-semibold tracking-tight">From conference to journal</h2>
            <p className="mt-3 text-lg text-white/75">
              Authors of accepted extended abstracts can submit a full paper to JASSL. Read how on the submission guidelines page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:shrink-0">
            <Button href="https://jas.sljol.info/">Visit the journal</Button>
            <Button href="/paper-submission-guidelines/" variant="ghost">Full paper guidelines</Button>
          </div>
        </div>
      </section>
    </>
  );
}
