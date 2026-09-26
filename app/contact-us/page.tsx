import Link from "next/link";
import { PageTitle, Heading } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { committee, conf } from "@/lib/site";
import { breadcrumbs, graph, pageMeta, webPage, ORG_ID } from "@/lib/seo";

const address = "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya 70140, Sri Lanka";

// "Dr. R. N. N. Perera" -> "RP": first and last initial, ignoring the title
const initials = (name: string) => {
  const w = name.replace(/^(Prof|Professor|Dr|Mr|Ms|Mrs)\.?\s*/, "").split(/\s+/);
  return w[0][0] + w[w.length - 1][0];
};

const channels = [
  { title: "Email", value: conf.email, href: `mailto:${conf.email}`, action: "Send an email", d: "M3 6h18v12H3zM3 7l9 6 9-6" },
  { title: "Address", value: address, href: conf.mapUrl, action: "Get directions", d: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z" },
];

const seo = {
  path: "/contact-us/",
  title: "Contact Us 2027",
  description: "Contact the AgInsight 2027 organising committee at the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya, by email.",
  keywords: ["AgInsight 2027 contact", "AgInsight organising committee", "Faculty of Agricultural Sciences contact", "Sabaragamuwa University Belihuloya"],
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({
    ...seo,
    type: "ContactPage",
    extra: {
      mainEntity: { "@id": ORG_ID },
      mentions: committee.map((c) => ({
        "@type": "Person",
        name: c.name,
        jobTitle: `${c.role}, ${conf.name}`,
        ...(c.email && { email: c.email }),
        ...(c.phone && { telephone: c.phone }),
      })),
    },
  }),
  breadcrumbs([{ name: "Contact Us", path: seo.path }]),
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Contact Us" lead={`Questions about ${conf.name} submissions, registration or the venue? The organising committee is here to help.`} />

      {/* Channels */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {channels.map((c) => (
            <li key={c.title}>
              <a
                href={c.href}
                {...(c.href.startsWith("http") && { target: "_blank", rel: "noopener" })}
                className="group flex h-full gap-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-colors hover:bg-field hover:text-white"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white group-hover:bg-secondary" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.d} /></svg>
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-primary group-hover:text-secondary">{c.title}</span>
                  <span className="mt-1 break-words font-slab text-lg font-semibold leading-snug">{c.value}</span>
                  <span className="mt-4 text-sm font-medium underline underline-offset-4">{c.action}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Committee */}
      <section className="bg-leaf">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <Heading title="Organising committee" lead={`The ${conf.name} working committee.`} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {committee.map((c) => (
              <li key={c.name} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-field font-slab text-lg font-semibold text-white" aria-hidden>
                  {initials(c.name)}
                </span>
                <p className="mt-5 text-sm font-medium text-primary">{c.role}</p>
                <h3 className="mt-1 font-slab text-xl font-semibold leading-snug">{c.name}</h3>
                <div className="mt-auto flex flex-col gap-1 pt-5 text-sm">
                  {c.phone && <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="font-medium text-primary hover:text-field">{c.phone}</a>}
                  <a href={`mailto:${c.email ?? conf.email}`} className="font-medium text-primary hover:text-field">{c.email ?? "Email the committee"}</a>
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
        <p className="mt-8 text-sm text-muted">
          Looking for the previous edition? See the <Link href="/contact-us-2024/" className="text-primary underline underline-offset-4">AgInsight 2024 contacts</Link>.
        </p>
      </section>
    </>
  );
}
