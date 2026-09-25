import { PageTitle, Button, Heading } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { conf, docs } from "@/lib/site";
import { breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const POSTER = "/docs/future-professionals-2024.jpg";

const seo = {
  path: "/future-professionals/",
  title: "Future Professionals",
  description: "AgInsight 2024 invited 20 Sabaragamuwa University undergraduates to join its Future Professionals team and gain leadership and event management experience.",
  keywords: ["AgInsight Future Professionals", "AgInsight 2024 student volunteers", "Sabaragamuwa University undergraduates", "conference volunteer opportunity"],
  image: { url: POSTER, alt: "AgInsight 2024 Future Professionals call for undergraduates" },
};
export const metadata = pageMeta(seo);
const schema = graph(webPage({ ...seo, image: POSTER }), breadcrumbs([{ name: "Future Professionals", path: seo.path }]));

const benefits = [
  { title: "Leadership experience", text: "Take the lead in organising a major international event." },
  { title: "Network with experts", text: "Work alongside professionals, academics and industry leaders." },
  { title: "Skill development", text: "Gain hands-on experience in event management, teamwork and problem-solving." },
  { title: "Be a changemaker", text: "Contribute to the success of an international conference and showcase your talents." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Future Professionals" lead={`Join the ${conf.name} student team.`} />

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 flex gap-4 rounded-2xl border border-secondary/30 bg-leaf p-5">
          <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" aria-hidden />
          <p className="text-ink/80">Applications for {conf.name} closed on 2 August 2024. Watch this page for the next edition.</p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Heading
              title="Join the team of Future Professionals"
              lead={`The Faculty of Agricultural Sciences invited 20 dynamic undergraduates to help run ${conf.name}, the ${conf.edition}.`}
            />
            <h3 className="mt-12 font-slab text-xl font-semibold text-field">Why apply</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.title} className="rounded-2xl bg-leaf p-6">
                  <p className="font-semibold">{b.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{b.text}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 font-slab text-xl font-semibold text-field">Who we looked for</h3>
            <p className="mt-3 leading-relaxed text-ink/85">
              Enthusiastic, proactive team players with excellent communication skills, creative problem solvers, and undergraduates
              passionate about agriculture and innovation. Applicants emailed their name, batch and contact number to{" "}
              <a href={`mailto:${conf.email}`} className="text-primary underline underline-offset-4">{conf.email}</a>.
            </p>
            <div className="mt-8">
              <Button href={docs.futureProfessionals} variant="light">Download the call (PDF)</Button>
            </div>
          </div>
          <a href={POSTER} target="_blank" rel="noopener" className="lg:col-span-5">
            <img src={POSTER} alt={seo.image.alt} className="w-full rounded-2xl shadow-xl shadow-field/20" />
          </a>
        </div>
      </section>
    </>
  );
}
