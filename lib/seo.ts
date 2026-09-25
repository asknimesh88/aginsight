import type { Metadata } from "next";
import { committee, conf, dates, people } from "@/lib/site";

// The live WordPress site's address. Every canonical URL, sitemap entry and schema @id hangs off this.
export const SITE_URL = "https://aginsight.agri.sab.ac.lk";
export const abs = (path: string) => new URL(path, SITE_URL).toString();

const DEFAULT_IMAGE = { url: "/og/aginsight.jpg", width: 1200, height: 630, alt: `${conf.name}: ${conf.edition}` };

type PageSeo = {
  path: string; // e.g. "/call-for-papers/" – must match the WordPress permalink
  title: string; // page name only; the layout template appends " | AgInsight 2024"
  description: string; // aim for 120–160 characters
  keywords: string[]; // focus keyword first
  image?: { url: string; width?: number; height?: number; alt: string };
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMeta({ path, title, description, keywords, image = DEFAULT_IMAGE, absoluteTitle, noindex }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${conf.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: conf.name,
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}

/* ---------- Schema.org (JSON-LD) ---------- */

export const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
export const EVENT_ID = `${SITE_URL}/#event`;

const address = {
  "@type": "PostalAddress",
  streetAddress: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka",
  addressLocality: "Belihuloya",
  postalCode: "70140",
  addressCountry: "LK",
};

export const organization = {
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka",
  url: "https://www.sab.ac.lk/agri/",
  logo: abs("/brand/logo.png"),
  email: conf.email,
  address,
  parentOrganization: { "@type": "CollegeOrUniversity", name: "Sabaragamuwa University of Sri Lanka", url: "https://www.sab.ac.lk/" },
  contactPoint: committee
    .filter((c) => c.phone)
    .map((c) => ({ "@type": "ContactPoint", contactType: c.role, name: c.name, telephone: c.phone, email: conf.email })),
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_URL}/`,
  name: conf.name,
  alternateName: "AgInsight",
  description: `${conf.edition}: ${conf.theme}.`,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

const keynote = people.find((p) => p.role === "Keynote speaker")!;
const conferenceDays = dates.filter((d) => d.stage === "Conference");

export const personSchema = (p: { name: string; title: string; photo: string; bio?: string[] }, url?: string) => ({
  "@type": "Person",
  name: p.name,
  jobTitle: p.title,
  image: abs(p.photo),
  ...(p.bio && { description: p.bio[0] }),
  ...(url && { url: abs(url) }),
});

export const event = {
  "@type": "EducationEvent",
  "@id": EVENT_ID,
  name: `${conf.name}: ${conf.edition}`,
  alternateName: conf.name,
  description: `${conf.edition}, a hybrid academic conference on the theme “${conf.theme}”, hosted by the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.`,
  startDate: conferenceDays[0].date,
  endDate: conferenceDays.at(-1)!.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [
    { "@type": "Place", name: "Sabaragamuwa University of Sri Lanka", address },
    { "@type": "VirtualLocation", url: `${SITE_URL}/` },
  ],
  image: [abs(DEFAULT_IMAGE.url)],
  url: `${SITE_URL}/`,
  organizer: { "@id": ORG_ID },
  performer: personSchema(keynote, "/prof-harold-corke/"),
  offers: { "@type": "Offer", price: 0, priceCurrency: "LKR", availability: "https://schema.org/InStock", url: conf.registerUrl },
  inLanguage: "en",
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function webPage({ path, title, description, type = "WebPage", image, extra = {} }: {
  path: string; title: string; description: string; type?: string; image?: string; extra?: Record<string, unknown>;
}) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": EVENT_ID },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: abs(image ?? DEFAULT_IMAGE.url) },
    ...extra,
  };
}

/** Wraps nodes in a single @graph document */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
