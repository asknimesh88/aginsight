import { PageTitle, Button, CtaCard } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { conf2024 as conf, docs } from "@/lib/site";
import { abs, breadcrumbs, event2024 as event, graph, pageMeta, webPage, EVENT_2024_ID } from "@/lib/seo";

const seo = {
  path: "/aginsight-flyer/",
  title: "AgInsight 2024 Flyer",
  description: "The official AgInsight 2024 flyer: conference tracks, keynote speaker, abstract deadline and contacts for the International Conference of Agricultural Sciences.",
  keywords: ["AgInsight flyer", "AgInsight 2024 flyer", "AgInsight poster", "International Conference of Agricultural Sciences 2024"],
  image: { url: docs.flyer, alt: `${conf.name} flyer` },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({
    ...seo,
    image: docs.flyer,
    about: EVENT_2024_ID,
    extra: {
      mainEntity: {
        "@type": "ImageObject",
        contentUrl: abs(docs.flyer),
        name: `${conf.name} flyer`,
        description: seo.description,
        creator: { "@type": "Organization", name: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka" },
      },
    },
  }),
  breadcrumbs([{ name: "AgInsight Flyer", path: seo.path }]),
  event,
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="AgInsight Flyer" lead={`The official flyer for ${conf.name}. Share it with colleagues and students.`} />
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid items-center gap-12 rounded-3xl bg-leaf p-8 sm:p-12 md:grid-cols-12 lg:gap-16">
          <a href={docs.flyer} target="_blank" rel="noopener" className="md:col-span-6">
            <img
              src={docs.flyer}
              alt={`${conf.name} flyer: ${conf.edition}, keynote speaker Prof. Harold Corke, conference tracks and abstract deadline`}
              className="mx-auto w-full max-w-md rounded-lg shadow-2xl shadow-field/30"
            />
          </a>
          <div className="md:col-span-6">
            <h2 className="font-slab text-3xl font-semibold tracking-tight text-field sm:text-4xl">{conf.name} flyer</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/85">
              Everything on one page: the conference theme, the three tracks, the keynote speaker, the abstract deadline and who to
              contact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={docs.flyer}>Open full size</Button>
              <Button href="/call-for-papers/" variant="light">Read the call for papers</Button>
            </div>
          </div>
        </div>
      </section>
      <CtaCard title="Ready to submit?" text="Check the formatting rules first, then send your abstract through CMT." secondary={{ href: "/paper-submission-guidelines/", label: "Read the guidelines" }} />
    </>
  );
}
