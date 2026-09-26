import { PageTitle, CtaCard } from "@/components/ui";
import KeynoteProfile from "@/components/profile";
import JsonLd from "@/components/json-ld";
import { conf2024 as conf, people } from "@/lib/site";
import { breadcrumbs, event2024 as event, graph, pageMeta, personSchema, webPage, EVENT_2024_ID } from "@/lib/seo";

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
  webPage({ ...seo, type: "ProfilePage", image: p.photo, about: EVENT_2024_ID, extra: { mainEntity: personSchema(p, seo.path) } }),
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
      <CtaCard title="Join us at AgInsight 2027" text="10–11 March 2027 at the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka." secondary={{ href: "/important-dates/", label: "See the 2027 dates" }} />
    </>
  );
}
