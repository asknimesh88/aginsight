import { PageTitle, Heading, Button } from "@/components/ui";
import { conf2024 as conf, people, type Person } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import KeynoteProfile from "@/components/profile";
import { breadcrumbs, graph, pageMeta, personSchema, webPage, EVENT_2024_ID } from "@/lib/seo";

function PersonCard({ p }: { p: Person }) {
  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm sm:flex-row sm:items-center">
      <img src={p.photo} alt={p.name} className="h-32 w-32 shrink-0 rounded-full bg-leaf object-cover object-top" />
      <div className="flex-1">
        <span className="rounded-full bg-leaf px-3 py-1 text-xs font-medium text-primary">{p.role}</span>
        <h3 className="mt-3 font-slab text-2xl font-semibold leading-snug">{p.name}</h3>
        <p className="mt-1 leading-relaxed text-muted">{p.title}</p>
        {p.session && (
          <p className="mt-4 rounded-xl border-l-4 border-secondary bg-leaf px-4 py-2.5 text-sm">
            <span className="text-muted">Plenary session: </span>
            <span className="font-medium text-field">{p.session.replace("Plenary session: ", "")}</span>
          </p>
        )}
      </div>
    </article>
  );
}

const seo = {
  path: "/chief-guest-and-keynote-speakers/",
  title: "AgInsight 2024 Chief Guest and Keynote Speakers",
  description: "Meet the AgInsight 2024 keynote speaker Prof. Harold Corke, chief guest Snr. Prof. Sampath Amarathunga, the guest of honour and plenary session speakers.",
  keywords: ["AgInsight keynote speakers", "AgInsight 2024 chief guest", "Prof. Harold Corke", "agriculture conference speakers Sri Lanka"],
  image: { url: "/people/harold-corke.jpg", alt: "Prof. Harold Corke, AgInsight 2024 keynote speaker" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, type: "CollectionPage", image: seo.image.url, about: EVENT_2024_ID }),
  breadcrumbs([{ name: "Chief Guest and Keynote Speakers", path: seo.path }]),
  {
    "@type": "ItemList",
    name: "AgInsight 2024 speakers and guests",
    itemListElement: people.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { ...personSchema(p, p.role === "Keynote speaker" ? "/prof-harold-corke/" : undefined), roleName: p.role },
    })),
  },
);

export default function Page() {
  const keynote = people.find((p) => p.role === "Keynote speaker")!;
  const honour = people.filter((p) => p.role === "Chief guest" || p.role === "Guest of honour");
  const plenary = people.filter((p) => p.role === "Guest speaker");

  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="AgInsight 2024 Chief Guest and Keynote Speakers" lead={`The keynote speaker, guests of honour and plenary speakers at ${conf.name}.`} />

      <KeynoteProfile
        p={keynote}
        note="Figures from Google Scholar, February 2024."
        link={{ href: "/prof-harold-corke/", label: "View the full profile page" }}
      />

      {/* Guests of honour */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Guests of honour" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {honour.map((p) => <PersonCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      {/* Plenary speakers */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Plenary speakers" lead="Guest speakers leading the plenary sessions." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plenary.map((p) => <PersonCard key={p.name} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-field p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-slab text-3xl font-semibold tracking-tight">Join the conversation</h2>
            <p className="mt-3 text-lg text-white/75">Registration is free. Attend in person at SUSL or join online.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:shrink-0">
            <Button href="/">See AgInsight 2027</Button>
            <Button href="/important-dates/" variant="ghost">See the dates</Button>
          </div>
        </div>
      </section>
    </>
  );
}
