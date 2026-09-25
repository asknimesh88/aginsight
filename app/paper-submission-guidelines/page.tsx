import { PageTitle, Button, Heading, CtaCard } from "@/components/ui";
import { conf, docs } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const steps = [
  { title: "Download the template", text: "Start from the official abstract template so the page size and fonts are already set." },
  { title: "Write both versions", text: "Prepare the abstract and an extended abstract. The extended abstract is for review only." },
  { title: "Remove your identity", text: "Leave out names, initials and affiliations. Review is double-blind." },
  { title: "Submit through CMT", text: "Upload everything as a single MS Word document (.doc or .docx)." },
];

const seo = {
  path: "/paper-submission-guidelines/",
  title: "Paper Submission Guidelines",
  description: "How to format and submit your AgInsight 2024 abstract: the B5 template, title and keyword rules, double-blind review and submission through Microsoft CMT.",
  keywords: ["AgInsight paper submission guidelines", "abstract format", "abstract template", "Microsoft CMT submission", "Journal of Agricultural Sciences Sri Lanka"],
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage(seo),
  breadcrumbs([{ name: "Paper Submission Guidelines", path: seo.path }]),
  {
    "@type": "HowTo",
    name: "How to submit an abstract to AgInsight 2024",
    description: seo.description,
    tool: [{ "@type": "HowToTool", name: "AgInsight abstract template (MS Word)" }],
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
    text: "Times New Roman, justified, single-spaced, one paragraph, ideally under 400 words. Cover the purpose, the method, the main findings and why they matter. Don’t repeat the title, and don’t use citations or abbreviations unless an abbreviation appears more than once and is defined at first use.",
  },
  {
    label: "Keywords",
    text: "Up to 6 keywords in italics and alphabetical order, each starting with a capital letter and separated by commas.",
    example: <em>Faba bean, Grain yield, Inter row, Legumes, Rhizobium</em>,
  },
];

const downloads = [
  { href: docs.template, title: "Abstract template", meta: "Word document" },
  { href: docs.declaration, title: "Author declaration form", meta: "PDF" },
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
        lead="How to format and submit your abstract. Only the abstract is published; the extended abstract is used for review."
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
              <Button href={conf.submitUrl}>Submit through CMT</Button>
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
