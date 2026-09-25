import Link from "next/link";
import { Button, Heading, Venue } from "@/components/ui";
import { conf, dates, events, fmtDate, intro, people, sponsors, themes, whyAttend } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { event, graph, pageMeta, webPage } from "@/lib/seo";

const Check = () => (
  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-hidden>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
  </span>
);

const icons = {
  "Plenary session": <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />,
  "Teaching cases": <path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zM8 7h6M8 11h6" />,
};

const seo = {
  path: "/",
  title: "AgInsight 2024 | Agricultural Sciences Conference Sri Lanka",
  description: "AgInsight 2024: 5th International Conference of Agricultural Sciences, 11–12 Sept 2024 at Sabaragamuwa University of Sri Lanka. Hybrid, free registration.",
  keywords: ["AgInsight", "AgInsight 2024", "International Conference of Agricultural Sciences", "agriculture conference Sri Lanka", "Sabaragamuwa University of Sri Lanka", "climate change and food security"],
};
export const metadata = pageMeta({ ...seo, absoluteTitle: true });
const schema = graph(webPage(seo), event);

export default function Home() {
  const [keynote, ...guests] = people;

  return (
    <>
      <JsonLd data={schema} />
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-field text-white">
        <img src="/brand/hero.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-field via-field/85 to-field/30" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-lg text-white/85">{conf.edition}</p>
          <h1 className="mt-3 font-slab text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
            AgInsight
            <span className="block text-secondary">2024</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-snug sm:text-2xl">{conf.theme}</p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-white/90">
            <div><dt className="text-sm text-white/60">When</dt><dd className="font-medium">{conf.dates}</dd></div>
            <div><dt className="text-sm text-white/60">Where</dt><dd className="font-medium">Sabaragamuwa University of Sri Lanka</dd></div>
            <div><dt className="text-sm text-white/60">Format</dt><dd className="font-medium">{conf.format}</dd></div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={conf.registerUrl}>Register for free</Button>
            <Button href={conf.submitUrl} variant="ghost">Submit your abstract</Button>
          </div>
        </div>
      </section>

      {/* Intro + why attend */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="font-slab text-3xl font-semibold tracking-tight text-field sm:text-4xl">
            An international forum for agricultural research
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/call-for-papers/">Read the call for papers</Button>
            <Button href="/aginsight-flyer/" variant="light">View the flyer</Button>
          </div>
        </div>
        <div className="rounded-3xl bg-leaf p-8 sm:p-10 lg:col-span-5">
          <h3 className="font-slab text-2xl font-semibold text-field">Why attend</h3>
          <ul className="mt-8 space-y-6">
            {whyAttend.map((w) => (
              <li key={w} className="flex gap-4 leading-relaxed">
                <Check />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Themes */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Conference tracks" link={{ href: "/call-for-papers/#themes", label: "See all sub-themes" }} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-primary/15 md:grid-cols-3">
            {themes.map((t) => (
              <Link key={t.title} href="/call-for-papers/#themes" className="group bg-white p-8 hover:bg-field hover:text-white">
                <h3 className="font-slab text-xl font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm text-muted group-hover:text-white/75">
                  {t.topics.slice(0, 4).join(", ")} and {t.topics.length - 4} more topics
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Speakers and guests" link={{ href: "/chief-guest-and-keynote-speakers/", label: "View all speakers" }} />

        <article className="mt-12 grid overflow-hidden rounded-3xl bg-field text-white md:grid-cols-5">
          <img src={keynote.photo} alt={keynote.name} className="aspect-square h-full w-full object-cover md:col-span-2 md:aspect-auto" />
          <div className="flex flex-col justify-center p-8 sm:p-12 md:col-span-3">
            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-sm font-medium">{keynote.role}</span>
            <h3 className="mt-5 font-slab text-3xl font-semibold sm:text-4xl">{keynote.name}</h3>
            <p className="mt-2 text-white/70">{keynote.title}</p>
            <p className="mt-6 line-clamp-5 leading-relaxed text-white/90">{keynote.bio![0]}</p>
            <Link href="/prof-harold-corke/" className="mt-8 w-fit rounded-full bg-white px-6 py-3 font-medium text-field transition-colors hover:bg-leaf">
              Read the full profile
            </Link>
          </div>
        </article>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {guests.map((p) => (
            <li key={p.name} className="flex flex-col items-center rounded-3xl border border-black/5 bg-white p-8 text-center shadow-sm">
              <img src={p.photo} alt={p.name} className="h-32 w-32 rounded-full bg-leaf object-cover object-top" />
              <span className="mt-6 rounded-full bg-leaf px-3 py-1 text-xs font-medium text-primary">{p.role}</span>
              <h3 className="mt-3 font-slab text-lg font-semibold leading-snug">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.title}</p>
              {p.session && <p className="mt-auto pt-5 text-sm font-medium text-field">{p.session.replace("Plenary session: ", "Plenary: ")}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Dates */}
      <section className="bg-field text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Important dates" link={{ href: "/important-dates/", label: "All dates" }} dark />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {dates.filter((d) => !d.label.startsWith("Conference day")).map((d) => (
              <li key={d.date} className="border-t-2 border-secondary pt-4">
                <p className="font-slab text-2xl">{fmtDate(d.date)}</p>
                <p className="mt-1 text-white/85">{d.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured events */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Featured events" lead="Plenary sessions and a teaching-case session alongside the paper presentations." />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {events.map((e) => (
            <li key={e.title} className="flex flex-col rounded-3xl border border-black/5 bg-leaf p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white" aria-hidden>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icons[e.type as keyof typeof icons]}
                </svg>
              </span>
              <p className="mt-8 text-sm font-medium text-primary">{e.type}</p>
              <h3 className="mt-2 font-slab text-xl font-semibold leading-snug">{e.title}</h3>
            </li>
          ))}
        </ul>
      </section>

      {/* Sponsors */}
      <section className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Sponsors and partners" lead="The organisations that made this event possible." center />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {sponsors.map((s) => (
              <li key={s.name} className="flex h-32 items-center justify-center rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <img src={s.logo} alt={s.name} className="max-h-20 max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Venue />
    </>
  );
}
