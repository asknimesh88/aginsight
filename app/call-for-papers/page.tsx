import Link from "next/link";
import { PageTitle, Heading, Button, Photo, Venue } from "@/components/ui";
import { TrackGrid } from "@/components/edition";
import JsonLd from "@/components/json-ld";
import { about, conf, dates, deadline, focusAreas, fmtDate, publication, themeRationale } from "@/lib/site";
import { breadcrumbs, event, graph, pageMeta, webPage } from "@/lib/seo";

const opens = dates[0];

const seo = {
  path: "/call-for-papers/",
  title: "Call for Papers 2027",
  description: "AgInsight 2027 call for papers: submit extended abstracts from 5 October to 15 November 2026 across five tracks, from agri-environment to One Health.",
  keywords: ["AgInsight 2027 call for papers", "call for papers agriculture 2027", "extended abstract submission", "agricultural sciences conference Sri Lanka", "One Health and food safety"],
  image: { url: "/photos/drone-over-crop-field-1600.webp", width: 1600, height: 873, alt: "An agricultural drone flying low over a green crop field" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, image: seo.image.url }),
  breadcrumbs([{ name: "Call for Papers", path: seo.path }]),
  event,
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Call for Papers" lead={`${conf.name}: ${conf.theme}`} />

      {/* Theme */}
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Heading title="The theme" lead={conf.theme} />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink/85">
            <p>{themeRationale}</p>
            <p>{about[0]}</p>
          </div>
        </div>
        <aside className="rounded-3xl bg-leaf p-8 sm:p-10 lg:col-span-5">
          <h3 className="font-slab text-2xl font-semibold text-field">At a glance</h3>
          <dl className="mt-6 divide-y divide-primary/10">
            {[
              ["Submit", `Extended abstracts, ${fmtDate(opens.date)} to ${fmtDate(deadline.date)}`],
              ["Conference", `${conf.dates}, in person`],
              ["Venue", "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka"],
              ["Forums", "A professional forum and a student forum in every track"],
            ].map(([k, v]) => (
              <div key={k} className="py-4 first:pt-0 last:pb-0">
                <dt className="text-sm font-medium text-primary">{k}</dt>
                <dd className="mt-1 leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Focus areas */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-field text-white lg:grid-cols-2">
          <Photo
            name="vertical-farm-lettuce"
            alt="Rows of fresh green lettuce growing under lights in an indoor vertical farm"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="p-8 sm:p-12 lg:pl-0">
            <h2 className="font-slab text-3xl font-semibold tracking-tight">Focus areas</h2>
            <p className="mt-3 text-white/75">The theme highlights the growing need for:</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((f) => (
                <li key={f} className="flex gap-3 leading-snug">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="scroll-mt-18 bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Session tracks" lead="Submit under the track closest to your work. Every track has a professional forum and a student forum." />
          <div className="mt-12">
            <TrackGrid />
          </div>
        </div>
      </section>

      {/* Publication + how to submit */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-24 lg:grid-cols-2">
        <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="font-slab text-3xl font-semibold tracking-tight text-field">Publication</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {publication.map((p) => (
              <li key={p} className="flex gap-4 text-lg leading-relaxed">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link href="/journals/" className="mt-8 inline-block font-medium text-primary underline underline-offset-4">
            About the Journal of Agricultural Sciences – Sri Lanka
          </Link>
        </article>

        <article id="how-to-submit" className="scroll-mt-24 rounded-3xl bg-field p-8 text-white sm:p-10">
          <h2 className="font-slab text-3xl font-semibold tracking-tight">How to submit</h2>
          <ol className="mt-6 flex flex-col gap-4">
            {[
              "Check the formatting rules in the submission guidelines.",
              `Submit your extended abstract online between ${fmtDate(opens.date)} and ${fmtDate(deadline.date)}.`,
              `Watch for the acceptance notice on ${fmtDate(dates.find((d) => d.stage === "Review")!.date)}.`,
            ].map((s, i) => (
              <li key={s} className="flex gap-4 leading-relaxed text-white/90">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/70">
            {conf.submitUrl ? "Submissions are open." : `The submission link will appear here when submissions open on ${fmtDate(opens.date)}.`}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {conf.submitUrl && <Button href={conf.submitUrl}>Submit your abstract</Button>}
            <Button href="/paper-submission-guidelines/" variant={conf.submitUrl ? "ghost" : "solid"}>Submission guidelines</Button>
            <Button href="/important-dates/" variant="ghost">All important dates</Button>
          </div>
        </article>
      </section>

      <Venue />

      <section className="mx-auto max-w-6xl px-4 pb-24 text-sm text-muted">
        Looking for the previous edition? See the <Link href="/call-for-papers-2024/" className="text-primary underline underline-offset-4">AgInsight 2024 call for papers</Link>.
      </section>
    </>
  );
}
