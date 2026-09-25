import { PageTitle, Heading, CtaCard } from "@/components/ui";
import { conf, themes } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { breadcrumbs, event, graph, pageMeta, webPage } from "@/lib/seo";

const glance = [
  { label: "Submission", value: "Abstract and extended abstract through Microsoft CMT" },
  { label: "Review", value: "Double-blind peer review by two reviewers" },
  { label: "Study types", value: "Empirical, conceptual, review and case studies" },
  { label: "Conference", value: `${conf.dates}, hybrid` },
];

// One icon per track, in the same order as `themes`
const icons = [
  <path key="plant" d="M12 21V11M12 11C12 6.5 8.5 4 4 4c0 4.5 3.5 7 8 7zM12 14c0-4 3-6.5 8-6.5 0 4-3 6.5-8 6.5z" />,
  <path key="chart" d="M4 4v16h16M8 15l3.5-3.5 3 3L20 9" />,
  <path key="fish" d="M3 12c3.5-4 7.5-5.5 11-5.5 3 0 5.5 2 7 5.5-1.5 3.5-4 5.5-7 5.5-3.5 0-7.5-1.5-11-5.5zM3 12L1.5 8.5M3 12l-1.5 3.5M16.5 11h.01" />,
];

const seo = {
  path: "/call-for-papers/",
  title: "Call for Papers",
  description: "Submit your research to AgInsight 2024. Call for papers on agriculture, agri-environment, agribusiness, agricultural economics, livestock and aquaculture.",
  keywords: ["AgInsight call for papers", "agriculture conference call for papers 2024", "agricultural sciences abstract submission", "agribusiness research", "livestock and aquaculture research"],
};
export const metadata = pageMeta(seo);
const schema = graph(webPage(seo), breadcrumbs([{ name: "Call for Papers", path: seo.path }]), event);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Call for papers" lead={conf.theme} />

      {/* Perspective */}
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Heading title="Conference perspective" />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink/85">
            <p>
              The conference brings together scholars, practitioners and policy makers from around the world to present and
              share original research on agriculture and agri-environment, agribusiness and agricultural economics, and livestock
              and aquaculture, in developed, developing and emerging economies.
            </p>
            <p>
              Agriculture shapes the livelihoods and wellbeing of a wide range of people, the growth of new and established
              organisations, and the economic vitality of whole economies. Original papers are invited on the themes below; the
              list shows the conference scope and is not exhaustive.
            </p>
          </div>
        </div>

        <aside className="rounded-3xl bg-leaf p-8 sm:p-10 lg:col-span-5">
          <h3 className="font-slab text-2xl font-semibold text-field">At a glance</h3>
          <dl className="mt-6 divide-y divide-primary/10">
            {glance.map((g) => (
              <div key={g.label} className="py-4 first:pt-0 last:pb-0">
                <dt className="text-sm font-medium text-primary">{g.label}</dt>
                <dd className="mt-1 leading-relaxed">{g.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Sub-themes */}
      <section id="themes" className="scroll-mt-18 bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Sub-themes" lead="Submit under the track closest to your work. Related topics not listed here are also welcome." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {themes.map((t, i) => (
              // subgrid: headers share one row height, so the three lists start level
              <article key={t.title} className="grid rounded-3xl border border-black/5 bg-white p-8 shadow-sm lg:row-span-2 lg:grid-rows-subgrid lg:gap-0">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {icons[i]}
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-slab text-xl font-semibold leading-snug">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted">{t.topics.length} topics</p>
                  </div>
                </div>
                <ul className="mt-6 divide-y divide-black/5 border-t border-black/5">
                  {t.topics.map((x) => (
                    <li key={x} className="flex gap-3 py-2.5 text-[15px] leading-snug">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaCard
        title="Ready to submit?"
        text="Check the formatting rules first, then send your abstract through CMT."
        secondary={{ href: "/paper-submission-guidelines/", label: "Read the guidelines" }}
      />

    </>
  );
}
