import { PageTitle, Heading } from "@/components/ui";
import { committee2024 as committee, conf2024 as conf } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { breadcrumbs, graph, pageMeta, webPage, ORG_ID, EVENT_2024_ID } from "@/lib/seo";

const secretary = committee.find((c) => c.role === "Conference Secretary")!;
const address = "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya 70140, Sri Lanka";
// "Dr. R. K. C. Jeewanthi" -> "RJ": first and last initial, ignoring the title
const initials = (name: string) => {
  const w = name.replace(/^(Prof|Dr|Mr|Ms|Mrs)\.\s*/, "").split(/\s+/);
  return w[0][0] + w[w.length - 1][0];
};

const channels = [
  { title: "Email", value: conf.email, href: `mailto:${conf.email}`, action: "Send an email", d: "M3 6h18v12H3zM3 7l9 6 9-6" },
  { title: "Phone", value: secretary.phone!, href: `tel:${secretary.phone!.replace(/\s/g, "")}`, action: "Call the secretary", d: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" },
  { title: "Address", value: address, href: conf.mapUrl, action: "Get directions", d: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" },
];

const seo = {
  path: "/contact-us-2024/",
  title: "AgInsight 2024 Contacts",
  description: "Contact details of the AgInsight 2024 organising committee at the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya.",
  keywords: ["AgInsight contact", "AgInsight conference secretariat", "Faculty of Agricultural Sciences contact", "Sabaragamuwa University Belihuloya"],
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, type: "ContactPage", about: EVENT_2024_ID, extra: { mainEntity: { "@id": ORG_ID } } }),
  breadcrumbs([{ name: "AgInsight 2024", path: "/aginsight-2024/" }, { name: "Contacts", path: seo.path }]),
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="AgInsight 2024 Contacts" lead="The AgInsight 2024 organising committee. For the current conference, see the AgInsight 2027 contact page." />

      {/* Channels */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <ul className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <li key={c.title}>
              <a
                href={c.href}
                {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener" })}
                className="group flex h-full flex-col rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-colors hover:bg-field hover:text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white group-hover:bg-secondary" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.d} /></svg>
                </span>
                <h2 className="mt-6 text-sm font-medium text-primary group-hover:text-secondary">{c.title}</h2>
                <p className="mt-1 break-words font-slab text-lg font-semibold leading-snug">{c.value}</p>
                <span className="mt-auto pt-6 text-sm font-medium underline underline-offset-4">{c.action}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Committee */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Organising committee" lead="Reach the secretariat by phone for anything urgent." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {committee.map((c) => (
              <li key={c.name} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-field font-slab text-lg font-semibold text-white" aria-hidden>
                  {initials(c.name)}
                </span>
                <h3 className="mt-5 font-slab text-lg font-semibold leading-snug">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.role}</p>
                <div className="mt-auto pt-5 text-sm">
                  {c.phone ? (
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="font-medium text-primary hover:text-field">{c.phone}</a>
                  ) : (
                    <a href={`mailto:${conf.email}`} className="font-medium text-primary hover:text-field">Email the secretariat</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Heading title="Find us" link={{ href: conf.mapUrl, label: "Open in Google Maps" }} />
        <div className="mt-12 overflow-hidden rounded-3xl border border-black/5 shadow-sm">
          <iframe
            title="Map of Sabaragamuwa University of Sri Lanka"
            src="https://maps.google.com/maps?q=Sabaragamuwa%20University%20of%20Sri%20Lanka&z=14&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-4 text-sm text-muted">The 250-acre campus sits in the hills of Belihuloya, 162 km from Colombo.</p>
      </section>
    </>
  );
}
