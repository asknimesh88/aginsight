import { PageTitle, Button, Heading, CtaCard } from "@/components/ui";
import { conf, docs, submitHref } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const steps = [
  { title: "Download the template", text: "Start from the official abstract template so the page size and fonts are already set." },
  { title: "Write both parts", text: "Write the abstract and the extended abstract in the same template. Extended abstracts are published online." },
  { title: "Remove your identity", text: "Leave out names, initials and affiliations. Review is double-blind." },
  { title: "Submit through CMT", text: "Upload everything as a single MS Word document (.doc or .docx)." },
];

const seo = {
  path: "/paper-submission-guidelines/",
  title: "Paper Submission Guidelines",
  description: "How to format your AgInsight 2027 abstract and extended abstract: the template, section word limits, double-blind review and submission through CMT.",
  keywords: ["AgInsight paper submission guidelines", "AgInsight 2027 extended abstract", "abstract format", "abstract template", "Microsoft CMT submission"],
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage(seo),
  breadcrumbs([{ name: "Paper Submission Guidelines", path: seo.path }]),
  {
    "@type": "HowTo",
    name: "How to submit an abstract to AgInsight 2027",
    description: seo.description,
    tool: [{ "@type": "HowToTool", name: "AgInsight 2027 abstract template (MS Word)" }],
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  },
);

const rules: { label: string; text: React.ReactNode; example?: React.ReactNode }[] = [
  { label: "Page", text: "B5 page size with a 2 cm margin on each side. The whole abstract fits on one page." },
  {
    label: "Title",
    text: "Times New Roman, 14 pt, centred, in title case. Small words such as “a”, “the”, “and” and “of” stay lowercase. Put non-English words and scientific names in italics.",
    example: (
      <>
        Reinforcing Pepper (<em>Capsicum annuum</em>) Growth by Fertilizer and Irrigation Management Under Salinity Conditions
      </>
    ),
  },
  {
    label: "Authors",
    text: "Leave out your name, initials, affiliation and anything else that identifies you. Author formatting is sent to you after acceptance.",
  },
  {
    label: "Heading",
    text: "The word ABSTRACT in bold capitals, 12 pt, centred, followed by one empty line.",
    example: <strong className="tracking-wide">ABSTRACT</strong>,
  },
  {
    label: "Body",
    text: "Times New Roman 12 pt, justified, single-spaced, one paragraph, ideally under 400 words. Cover the purpose, the method, the main findings and why they matter. Don’t repeat the title, and don’t use citations or abbreviations unless an abbreviation appears more than once and is defined at first use.",
  },
  {
    label: "Keywords",
    text: "Up to 6 keywords in italics and alphabetical order, each starting with a capital letter and separated by commas.",
    example: <em>Faba bean, Grain yield, Inter-row, Legumes, Rhizobium</em>,
  },
];

// Extended abstract structure, from the AgInsight 2027 template
const extendedRules = [
  { label: "Page", text: "A4 page size with a 2.54 cm margin on each side (the second part of the template is already set up)." },
  { label: "Text", text: "Times New Roman 12 pt, single-spaced, in every section." },
  { label: "Authors", text: "No author information anywhere in the extended abstract. Review is double-blind." },
];

const sections: { name: string; words?: number; text: string }[] = [
  { name: "Introduction", words: 250, text: "Enough background to frame the study, highlighting key literature, with clear aims and objectives." },
  { name: "Materials and methods", words: 250, text: "Describe the materials and methods in enough detail for a reader to repeat the study. Several paragraphs are fine." },
  { name: "Results and discussion", words: 500, text: "Present the main findings and discuss them against the literature where needed. Several paragraphs are fine." },
  { name: "Conclusions", words: 100, text: "A single paragraph." },
  { name: "References", text: "Up to 5 key references, in APA style." },
  { name: "Acknowledgement", text: "Optional." },
];
const maxWords = Math.max(...sections.map((s) => s.words ?? 0));
const totalWords = sections.reduce((n, s) => n + (s.words ?? 0), 0);

const downloads = [
  { href: docs.template, title: "Abstract and extended abstract template", meta: "Word document, 2027" },
  { href: docs.declaration, title: "Author declaration form", meta: "PDF, 2027" },
  { href: "https://jas.sljol.info/about/submissions/", title: "Journal author guidelines", meta: "For full papers, on jas.sljol.info" },
];

const FileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M12 12v6M9 15l3 3 3-3" />
  </svg>
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle
        title="Paper submission guidelines"
        lead="How to format and submit your abstract and extended abstract for AgInsight 2027. Extended abstracts are published online."
      />

      {/* Steps */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="How to submit" lead="Four steps from template to submission." />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-slab text-lg font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-slab text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rules + downloads */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <Heading title="Abstract format" lead="Follow these rules strictly. The template already applies most of them." />
          <dl className="mt-12 divide-y divide-black/10 border-y border-black/10">
            {rules.map((r) => (
              <div key={r.label} className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <dt className="font-slab text-lg font-semibold text-field">{r.label}</dt>
                <dd>
                  <p className="leading-relaxed text-ink/85">{r.text}</p>
                  {r.example && (
                    <p className="mt-4 rounded-xl border-l-4 border-secondary bg-leaf px-5 py-3 font-serif leading-relaxed text-ink">
                      {r.example}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* Extended abstract */}
          <div id="extended-abstract" className="mt-24 scroll-mt-24">
            <Heading
              title="Extended abstract format"
              lead="The extended abstract follows the abstract in the same template, with the same title and keywords."
            />
            <dl className="mt-12 divide-y divide-black/10 border-y border-black/10">
              {extendedRules.map((r) => (
                <div key={r.label} className="grid gap-2 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <dt className="font-slab text-lg font-semibold text-field">{r.label}</dt>
                  <dd className="leading-relaxed text-ink/85">{r.text}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-14 font-slab text-2xl font-semibold text-field">Sections, in this order</h3>
            <p className="mt-2 text-muted">Up to {totalWords.toLocaleString("en-US")} words across the written sections.</p>
            <ol className="mt-8 flex flex-col gap-3">
              {sections.map((s, i) => (
                <li key={s.name} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-2xl bg-leaf p-5 sm:grid-cols-[2.5rem_1fr_9rem] sm:items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-slab font-semibold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-ink">{s.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{s.text}</p>
                  </div>
                  <div className="col-start-2 sm:col-start-auto">
                    {s.words ? (
                      <>
                        <p className="text-sm font-medium text-field sm:text-right">Max {s.words} words</p>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white" aria-hidden>
                          <div className="h-full rounded-full bg-secondary" style={{ width: `${(s.words / maxWords) * 100}%` }} />
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted sm:text-right">{s.name === "References" ? "Max 5" : "Optional"}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-3xl border border-black/10 p-6 sm:p-8">
              <h3 className="font-slab text-xl font-semibold text-field">Tables and figures</h3>
              <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-ink/85 marker:text-secondary">
                <li>At most 1 table and 1 figure in the whole extended abstract, placed in the methods or the results.</li>
                <li>Centre every table and figure. Figures must be in a resolution good enough for publication.</li>
                <li>Captions in sentence case, bold, Times New Roman 12 pt.</li>
              </ul>
              <p className="mt-5 text-sm text-muted">Example caption</p>
              <p className="mt-2 rounded-xl border-l-4 border-secondary bg-leaf px-5 py-3 font-serif leading-relaxed text-ink">
                <strong>Table 01. Yield of pepper under three irrigation regimes</strong>
              </p>
            </div>
          </div>
        </div>

        <aside className="order-first lg:order-none lg:col-span-4">
          <div className="rounded-3xl bg-leaf p-8 lg:sticky lg:top-28">
            <h2 className="font-slab text-2xl font-semibold text-field">Downloads</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {downloads.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-colors hover:bg-field hover:text-white"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <FileIcon />
                    </span>
                    <span>
                      <span className="block font-medium">{d.title}</span>
                      <span className="block text-sm opacity-70">{d.meta}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col">
              <Button href={submitHref}>{conf.submitUrl ? "Submit through CMT" : "Submission opens 5 October 2026"}</Button>
            </div>
          </div>
        </aside>
      </section>

      {/* Full papers */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 rounded-3xl border border-black/10 p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-medium text-primary">Optional</p>
            <h2 className="mt-2 font-slab text-3xl font-semibold tracking-tight text-field">Publish a full paper</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/85">
              Authors of accepted extended abstracts may submit a full-length paper to the Journal of Agricultural Sciences – Sri
              Lanka. It isn’t required to present. Send a cover letter saying you’d like to publish, and the Printing and
              Publication Committee will pass your paper to the journal editors. The final decision rests with the journal’s
              editorial board.
            </p>
            <p className="mt-4 text-sm text-muted">ISSN 1391-9318, e-ISSN 2386-1369</p>
          </div>
          <Button href="https://jas.sljol.info/about/submissions/" variant="light">Read the author guidelines</Button>
        </div>
      </section>

      <CtaCard
        title="Ready to submit?"
        text="Use the template, remove your identity, and upload a single Word document."
        secondary={{ href: docs.template, label: "Download the template" }}
      />
    </>
  );
}
