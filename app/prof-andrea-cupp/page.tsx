import { PageTitle, Button } from "@/components/ui";
import KeynoteProfile from "@/components/profile";
import JsonLd from "@/components/json-ld";
import { pastKeynotes } from "@/lib/site";
import { breadcrumbs, graph, pageMeta, personSchema, webPage } from "@/lib/seo";

const p = pastKeynotes.find((x) => x.path === "/prof-andrea-cupp/")!;

const seo = {
  path: p.path,
  title: "Prof. Andrea Cupp, Keynote Speaker",
  description: "Prof. Andrea Cupp of the University of Nebraska–Lincoln, AgInsight 2022 keynote speaker, is a reproductive physiologist with 30+ years in animal science.",
  keywords: ["Prof. Andrea Cupp", "Andrea Cupp University of Nebraska", "AgInsight 2022 keynote speaker", "reproductive physiology", "animal science"],
  image: { url: p.photo, alt: `${p.name}, ${p.edition} keynote speaker` },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, type: "ProfilePage", image: p.photo, extra: { mainEntity: personSchema(p, seo.path) } }),
  breadcrumbs([
    { name: "Chief Guest and Keynote Speakers", path: "/chief-guest-and-keynote-speakers/" },
    { name: p.name, path: seo.path },
  ]),
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title={p.name} lead={`Keynote speaker at ${p.edition}, the 4th International Conference of Agricultural Sciences.`} />
      <KeynoteProfile p={p} heading="Biography" label={`${p.edition} keynote`} />
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-leaf p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-slab text-2xl font-semibold text-field">Looking for this year’s speakers?</h2>
            <p className="mt-2 text-ink/75">Prof. Cupp spoke at {p.edition}. See who is speaking at the current conference.</p>
          </div>
          <Button href="/chief-guest-and-keynote-speakers/" variant="light">Current speakers</Button>
        </div>
      </section>
    </>
  );
}
