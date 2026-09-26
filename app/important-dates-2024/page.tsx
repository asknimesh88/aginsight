import { PageTitle, Button, Heading } from "@/components/ui";
import { conf2024 as conf, dates2024 as dates, deadline2024 as deadline, docs, fmtDate } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { CalendarTile, daysBetween } from "@/components/edition";
import { breadcrumbs, event2024 as event, graph, pageMeta, webPage, EVENT_2024_ID } from "@/lib/seo";

const seo = {
  path: "/important-dates-2024/",
  title: "AgInsight 2024 Important Dates",
  description: `Key AgInsight 2024 deadlines: abstracts by ${fmtDate(deadline.date)}, camera-ready by ${fmtDate(dates[3].date)} and the conference on ${conf.dates}.`,
  keywords: ["AgInsight important dates", "AgInsight 2024 abstract deadline", "agriculture conference deadlines", "AgInsight 2024 registration"],
};
export const metadata = pageMeta(seo);
const schema = graph(webPage({ ...seo, about: EVENT_2024_ID }), breadcrumbs([{ name: "AgInsight 2024", path: "/aginsight-2024/" }, { name: "Important Dates", path: seo.path }]), event);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle
        title="Important dates"
        lead={`From the call for abstracts on ${fmtDate(dates[0].date)} to the conference on ${conf.dates}.`}
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        {/* Sticky summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-3xl bg-field p-8 text-white lg:sticky lg:top-28">
            <p className="text-sm font-medium text-secondary">Abstract deadline</p>
            <p className="mt-2 font-slab text-4xl font-semibold leading-tight">{fmtDate(deadline.date)}</p>
            <p className="mt-3 leading-relaxed text-white/75">{deadline.note}</p>
            <div className="mt-8 flex flex-col gap-3">
              <Button href="/important-dates/">See the 2027 dates</Button>
              <Button href={docs.template} variant="ghost">Download the template</Button>
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

    </>
  );
}
