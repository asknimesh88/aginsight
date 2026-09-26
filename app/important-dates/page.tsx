import Link from "next/link";
import { PageTitle, Button, Heading, Venue } from "@/components/ui";
import { CalendarTile, FeesTable, Programme, daysBetween } from "@/components/edition";
import NextMilestone from "@/components/next-milestone";
import JsonLd from "@/components/json-ld";
import { conf, dates, deadline, fmtDate, submitHref } from "@/lib/site";
import { breadcrumbs, event, graph, pageMeta, webPage } from "@/lib/seo";

const seo = {
  path: "/important-dates/",
  title: "Important Dates 2027",
  description: `AgInsight 2027 dates: submit extended abstracts ${fmtDate(dates[0].date)} to ${fmtDate(deadline.date)}. Early bird registration ends ${fmtDate("2027-01-22")}.`,
  keywords: ["AgInsight 2027 important dates", "AgInsight 2027 deadline", "AgInsight 2027 registration fees", "agriculture conference 2027 dates", "AgInsight programme"],
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage(seo),
  breadcrumbs([{ name: "Important Dates", path: seo.path }]),
  event,
  {
    "@type": "ItemList",
    name: "AgInsight 2027 milestones",
    itemListElement: dates.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `${d.label}: ${fmtDate(d.date)}` })),
  },
);

const BUILD_TIME = Date.now();

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle
        title="Important Dates"
        lead={`${conf.name}: from abstract submission on ${fmtDate(dates[0].date)} to the conference on ${conf.dates}.`}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        {/* Sticky summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-3xl bg-field p-8 text-white lg:sticky lg:top-28">
            <p className="text-sm font-medium text-secondary">Submission deadline</p>
            <p className="mt-2 font-slab text-4xl font-semibold leading-tight">{fmtDate(deadline.date)}</p>
            <p className="mt-3 leading-relaxed text-white/75">Extended abstracts open on {fmtDate(dates[0].date)}.</p>
            <div className="mt-6">
              <NextMilestone items={dates} buildTime={BUILD_TIME} />
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button href={submitHref}>{conf.submitUrl ? "Submit your abstract" : "Read the call for papers"}</Button>
              <Button href="#fees" variant="ghost">Registration fees</Button>
            </div>
          </div>
        </aside>

        {/* Timeline */}
        <div className="lg:col-span-8">
          <Heading title="Timeline" lead="Every milestone from submission to the conference days." />
          <ol className="relative mt-12 before:absolute before:bottom-10 before:left-8 before:top-10 before:w-0.5 before:bg-primary/15 sm:before:left-10">
            {dates.map((x, i) => {
              const gap = i > 0 ? daysBetween(dates[i - 1].date, x.date) : 0;
              const isDeadline = x === deadline;
              return (
                <li key={x.date} className="flex gap-5 pb-10 last:pb-0 sm:gap-8">
                  <CalendarTile date={x.date} highlight={isDeadline} />
                  <div className={`flex-1 rounded-2xl p-5 sm:p-6 ${isDeadline ? "bg-leaf" : ""}`}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="font-medium text-primary">{x.stage}</span>
                      {gap > 0 && <span className="text-muted">+{gap} {gap === 1 ? "day" : "days"}</span>}
                    </div>
                    <h3 className="mt-1 font-slab text-xl font-semibold text-ink sm:text-2xl">{x.label}</h3>
                    <p className="mt-2 leading-relaxed text-ink/75">{x.note}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="scroll-mt-18 bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Registration fees" lead="Early bird rates apply until 22 January 2027; regular rates until 12 February 2027." />
          <div className="mt-12">
            <FeesTable />
          </div>
          <p className="mt-4 text-sm text-muted">
            See the <Link href="/payments/" className="text-primary underline underline-offset-4">payments page</Link> for bank and online payment details.
          </p>
        </div>
      </section>

      {/* Programme */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Programme" lead="Wednesday 10 and Thursday 11 March 2027." />
        <div className="mt-12">
          <Programme />
        </div>
      </section>

      <Venue />

      <section className="mx-auto max-w-6xl px-4 pb-24 text-sm text-muted">
        Looking for the previous edition? See the <Link href="/important-dates-2024/" className="text-primary underline underline-offset-4">AgInsight 2024 important dates</Link>.
      </section>
    </>
  );
}
