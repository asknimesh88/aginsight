import Link from "next/link";
import { Button, Heading, Photo, Venue } from "@/components/ui";
import { FeesTable, Programme, TrackGrid } from "@/components/edition";
import NextMilestone from "@/components/next-milestone";
import Countdown from "@/components/countdown";
import JsonLd from "@/components/json-ld";
import { about, conf, dates, focusAreas, fmtDate, publication, submitHref, themeRationale, tracks } from "@/lib/site";
import { event, graph, pageMeta, webPage } from "@/lib/seo";

const seo = {
  path: "/",
  title: "AgInsight 2027 | Agricultural Sciences Conference Sri Lanka",
  description: "AgInsight 2027, the 6th International Conference of Agricultural Sciences, 10–11 March 2027 at Sabaragamuwa University of Sri Lanka. Abstracts open 5 Oct 2026.",
  keywords: ["AgInsight 2027", "AgInsight", "International Conference of Agricultural Sciences 2027", "agriculture conference Sri Lanka 2027", "resilient agriculture", "Sabaragamuwa University of Sri Lanka"],
};
export const metadata = pageMeta({ ...seo, absoluteTitle: true });
const schema = graph(webPage({ ...seo, image: "/photos/hero-drone-1920.webp" }), event);

const BUILD_TIME = Date.now();

export default function Home() {
  const facts = [
    { label: "When", value: conf.dates, sub: "Wednesday and Thursday" },
    { label: "Where", value: "Faculty of Agricultural Sciences", sub: "Sabaragamuwa University of Sri Lanka" },
    { label: "Format", value: "In person", sub: "Professional and student forums" },
    { label: "Tracks", value: `${tracks.length} session tracks`, sub: "From agri-environment to One Health" },
  ];
  const keyDates = dates.filter((d) => d.stage !== "Conference");

  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-field text-white">
        <img
          src="/photos/hero-drone-1920.webp"
          srcSet="/photos/hero-drone-1280.webp 1280w, /photos/hero-drone-1920.webp 1920w, /photos/hero-drone-2560.webp 2560w"
          sizes="100vw"
          alt="An agricultural drone hovering over rows of green crops at sunset"
          width={2560}
          height={1904}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-field via-field/85 to-field/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-field/80 via-transparent to-transparent" />

        <div className="mx-auto max-w-6xl px-4 pb-40 pt-20 sm:pb-44 sm:pt-28">
          <p className="text-lg text-white/85">{conf.edition}</p>
          <h1 className="mt-3 font-slab text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
            AgInsight
            <span className="block text-secondary">2027</span>
          </h1>
          <p className="mt-8 max-w-2xl font-slab text-2xl leading-snug sm:text-3xl">{conf.theme}</p>
          <div className="mt-8">
            <NextMilestone items={dates} buildTime={BUILD_TIME} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={submitHref}>{conf.submitUrl ? "Submit your abstract" : "Read the call for papers"}</Button>
            <Button href="/important-dates/" variant="ghost">See important dates</Button>
          </div>
        </div>
      </section>

      {/* Facts bar, overlapping the hero */}
      <section className="relative z-10 mx-auto -mt-24 max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-field/10 ring-1 ring-black/5">
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`p-6 sm:p-8 ${i > 0 ? "border-t border-black/5 sm:border-t-0 lg:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 1 || i === 3 ? "sm:border-l" : ""}`}>
              <dt className="text-sm font-medium text-primary">{f.label}</dt>
              <dd className="mt-2 font-slab text-xl font-semibold leading-snug text-field">{f.value}</dd>
              <dd className="mt-1 text-sm text-muted">{f.sub}</dd>
            </div>
          ))}
        </dl>
        <Countdown startsAt={conf.startsAt!} endsAt={conf.endsAt!} label={conf.name} />
        </div>
      </section>

      {/* About + theme */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Heading title="Innovating together" lead="Where research, industry and communities meet." />
          <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-ink/85">
            {about.map((a) => <p key={a.slice(0, 20)}>{a}</p>)}
            <p>{themeRationale}</p>
          </div>
          <div className="mt-10">
            <Button href="/call-for-papers/" variant="light">Read the call for papers</Button>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative">
            <Photo
              name="robotic-greenhouse"
              alt="Automated robotic machines tending crops inside a modern glass greenhouse"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover"
            />
            <div className="relative -mt-20 ml-6 mr-6 rounded-3xl bg-field p-8 text-white shadow-xl sm:ml-auto sm:mr-6 sm:max-w-sm">
              <h3 className="font-slab text-xl font-semibold">Focus areas</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/85">
                {focusAreas.slice(0, 6).map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading
            title="Five session tracks"
            lead="Each track runs a professional forum and a student forum."
            link={{ href: "/call-for-papers/#tracks", label: "Track details" }}
          />
          <div className="mt-12">
            <TrackGrid />
          </div>
        </div>
      </section>

      {/* Key dates */}
      <section className="bg-field text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Important dates" link={{ href: "/important-dates/", label: "Full timeline" }} dark />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {keyDates.map((d) => (
              <li key={d.date} className="border-t-2 border-secondary pt-4">
                <time dateTime={d.date} className="font-slab text-2xl">{fmtDate(d.date)}</time>
                <p className="mt-1 text-white/85">{d.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Programme */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Programme at a glance" lead="Two days at the Faculty of Agricultural Sciences, Belihuloya." />
        <div className="mt-12">
          <Programme />
        </div>
      </section>

      {/* Fees + publication */}
      <section className="bg-leaf">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading title="Registration fees" lead="Register early for the lower rate." />
            <div className="mt-10">
              <FeesTable />
            </div>
            <p className="mt-4 text-sm text-muted">
              Payment details are on the <Link href="/payments/" className="text-primary underline underline-offset-4">payments page</Link>.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-field p-8 text-white sm:p-10">
              <h2 className="font-slab text-2xl font-semibold">Get published</h2>
              <ul className="mt-6 flex flex-col gap-5">
                {publication.map((p) => (
                  <li key={p} className="flex gap-4 leading-relaxed text-white/85">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/journals/" className="mt-8 inline-block font-medium text-secondary underline underline-offset-4 hover:text-white">
                About the journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-24">
        <Venue />
      </div>
    </>
  );
}
