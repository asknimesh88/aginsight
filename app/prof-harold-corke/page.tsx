import { PageTitle, CtaCard } from "@/components/ui";
import KeynoteProfile from "@/components/profile";
import JsonLd from "@/components/json-ld";
import { conf, people } from "@/lib/site";
import { breadcrumbs, event, graph, pageMeta, personSchema, webPage } from "@/lib/seo";

const p = people.find((x) => x.role === "Keynote speaker")!;

const seo = {
  path: "/prof-harold-corke/",
  title: "Prof. Harold Corke, Keynote Speaker",
  description: "Prof. Harold Corke, AgInsight 2024 keynote speaker, is Professor of Biotechnology and Food Engineering at GTIIT, with 330+ papers on grain science.",
  keywords: ["Prof. Harold Corke", "Harold Corke keynote", "AgInsight 2024 keynote speaker", "grain science", "food science and technology"],
  image: { url: p.photo, alt: `${p.name}, ${conf.name} keynote speaker` },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, type: "ProfilePage", image: p.photo, extra: { mainEntity: personSchema(p, seo.path) } }),
  breadcrumbs([
    { name: "Chief Guest and Keynote Speakers", path: "/chief-guest-and-keynote-speakers/" },
    { name: p.name, path: seo.path },
  ]),
  event,
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title={p.name} lead={`Keynote speaker at ${conf.name}, the ${conf.edition}.`} />
      <KeynoteProfile
        p={p}
        heading="Biography"
        note="Figures from Google Scholar, February 2024."
        link={{ href: "/chief-guest-and-keynote-speakers/", label: "See all speakers and guests" }}
      />
      <CtaCard title={`Hear Prof. Corke at ${conf.name}`} text={`${conf.dates}, Sabaragamuwa University of Sri Lanka and online.`} secondary={{ href: "/important-dates/", label: "See the dates" }} />
    </>
  );
}
