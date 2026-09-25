import { PageTitle, Heading, Button } from "@/components/ui";
import { conf, hotels } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import { abs, breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const seo = {
  path: "/accommodation/",
  title: "Accommodation",
  description: "Recommended hotels and guest houses near Sabaragamuwa University of Sri Lanka in Belihuloya for AgInsight 2024 delegates, with booking links.",
  keywords: ["AgInsight accommodation", "hotels near Sabaragamuwa University", "Belihuloya hotels", "where to stay Belihuloya"],
  image: { url: "/hotels/sennya.jpg", alt: "Sennya Resorts" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({ ...seo, image: seo.image.url }),
  breadcrumbs([{ name: "Accommodation", path: seo.path }]),
  {
    "@type": "ItemList",
    name: "Recommended accommodation for AgInsight 2024",
    itemListElement: hotels.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "LodgingBusiness", name: h.name, url: h.url, image: abs(`/hotels/${h.img}`) },
    })),
  },
);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Accommodation" lead={`${hotels.length} recommended places to stay near Sabaragamuwa University of Sri Lanka.`} />

      <section className="mx-auto max-w-6xl px-4 py-24">
        {/* Notice */}
        <div className="flex gap-5 rounded-3xl border border-secondary/30 bg-leaf p-6 sm:p-8">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-white" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 8h.01M11 12h1v5h1" /><circle cx="12" cy="12" r="9" /></svg>
          </span>
          <div>
            <h2 className="font-slab text-lg font-semibold text-field">Book your own stay</h2>
            <p className="mt-1 leading-relaxed text-ink/80">
              Contact the hotel directly or book through Booking.com or Tripadvisor. The organisers can’t take responsibility for
              participants’ accommodation.
            </p>
          </div>
        </div>

        {/* Hotels */}
        <div className="mt-20">
          <Heading title="Where to stay" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <li key={h.name}>
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="overflow-hidden">
                    <img
                      src={`/hotels/${h.img}`}
                      alt={h.name}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-slab text-lg font-semibold leading-snug group-hover:text-primary">{h.name}</h3>
                      <p className="mt-1 text-sm text-muted">View on Booking.com</p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf text-primary transition-colors group-hover:bg-primary group-hover:text-white" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>        </div>
      </section>

      {/* Getting here */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative isolate overflow-hidden rounded-3xl bg-field p-8 text-white sm:p-12">
          <img src="/brand/campus-theatre.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-field via-field/90 to-field/50" />
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <h2 className="font-slab text-3xl font-semibold tracking-tight">Getting here</h2>
              <p className="mt-3 text-lg text-white/80">
                The 250-acre campus sits in the hills of Belihuloya, 162 km from Colombo, with a cool mountain climate.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={conf.mapUrl}>Get directions</Button>
              <Button href="http://www.immigration.gov.lk/" variant="ghost">Visa information</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
