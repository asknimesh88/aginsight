import type { Metadata } from "next";
import { conf, conf2024, dates, dates2024, fees, people } from "@/lib/site";

// The live WordPress site's address. Every canonical URL, sitemap entry and schema @id hangs off this.
export const SITE_URL = "https://aginsight.agri.sab.ac.lk";
export const abs = (path: string) => new URL(path, SITE_URL).toString();

// Brand used in every title ("Page | AgInsight"); the edition year goes in each page title where it matters
export const BRAND = "AgInsight";
export const DEFAULT_IMAGE = { url: "/og/aginsight-2027.jpg", width: 1200, height: 630, alt: `${conf.name}: ${conf.edition}` };
const IMAGE_2024 = "/og/aginsight.jpg";

type PageSeo = {
  path: string; // e.g. "/call-for-papers/" – must match the WordPress permalink
  title: string; // page name only; " | AgInsight" is appended
  description: string; // aim for 120–160 characters
  keywords: string[]; // focus keyword first
  image?: { url: string; width?: number; height?: number; alt: string };
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMeta({ path, title, description, keywords, image = DEFAULT_IMAGE, absoluteTitle, noindex }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: BRAND,
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
export const EVENT_2024_ID = `${SITE_URL}/aginsight-2024/#event`;

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
  contactPoint: { "@type": "ContactPoint", contactType: "Conference secretariat", email: conf.email, availableLanguage: "en" },
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_URL}/`,
  name: BRAND,
  alternateName: "AgInsight International Conference of Agricultural Sciences",
  description: `${conf.edition}: ${conf.theme}.`,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

const keynote2024 = people.find((p) => p.role === "Keynote speaker")!;
const days = (ds: { date: string; stage: string }[]) => ds.filter((d) => d.stage === "Conference");

export const personSchema = (p: { name: string; title: string; photo: string; bio?: string[] }, url?: string) => ({
  "@type": "Person",
  name: p.name,
  jobTitle: p.title,
  image: abs(p.photo),
  ...(p.bio && { description: p.bio[0] }),
  ...(url && { url: abs(url) }),
});

const place = { "@type": "Place", name: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka", address };

// Current edition: in person, paid registration with early bird and regular rates
export const event = {
  "@type": "EducationEvent",
  "@id": EVENT_ID,
  name: `${conf.name}: ${conf.edition}`,
  alternateName: conf.name,
  description: `${conf.edition} on the theme “${conf.theme}”, with professional and student forums across five tracks, hosted by the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.`,
  startDate: days(dates)[0].date,
  endDate: days(dates).at(-1)!.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: place,
  image: [abs(DEFAULT_IMAGE.url), abs("/photos/hero-drone-1920.webp")],
  url: `${SITE_URL}/`,
  organizer: { "@id": ORG_ID },
  offers: fees.rows.flatMap((r) =>
    fees.columns.map((col, i) => ({
      "@type": "Offer",
      name: `${col} registration: ${r.who}`,
      category: col,
      price: r.amounts[i],
      priceCurrency: r.currency,
      validThrough: fees.closes[i],
      availability: "https://schema.org/InStock",
      url: conf.registerUrl ?? abs("/important-dates/#fees"),
    })),
  ),
  inLanguage: "en",
};

// Previous edition, for the AgInsight 2024 archive pages
export const event2024 = {
  "@type": "EducationEvent",
  "@id": EVENT_2024_ID,
  name: `${conf2024.name}: ${conf2024.edition}`,
  alternateName: conf2024.name,
  description: `${conf2024.edition}, a hybrid academic conference on the theme “${conf2024.theme}”, hosted by the Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.`,
  startDate: days(dates2024)[0].date,
  endDate: days(dates2024).at(-1)!.date,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: [place, { "@type": "VirtualLocation", url: abs("/aginsight-2024/") }],
  image: [abs(IMAGE_2024)],
  url: abs("/aginsight-2024/"),
  organizer: { "@id": ORG_ID },
  performer: personSchema(keynote2024, "/prof-harold-corke/"),
  offers: { "@type": "Offer", price: 0, priceCurrency: "LKR", availability: "https://schema.org/SoldOut", url: abs("/aginsight-2024/") },
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

export function webPage({ path, title, description, type = "WebPage", image, about = EVENT_ID, extra = {} }: {
  path: string; title: string; description: string; type?: string; image?: string; about?: string; extra?: Record<string, unknown>;
}) {
  return {
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": about },
    inLanguage: "en",
    primaryImageOfPage: { "@type": "ImageObject", url: abs(image ?? DEFAULT_IMAGE.url) },
    ...extra,
  };
}

/** Wraps nodes in a single @graph document */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
