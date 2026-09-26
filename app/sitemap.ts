import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Every indexable URL, matching the original WordPress permalinks
const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/call-for-papers/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/important-dates/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/paper-submission-guidelines/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chief-guest-and-keynote-speakers/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/prof-harold-corke/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/prof-andrea-cupp/", priority: 0.4, changeFrequency: "yearly" },
  { path: "/previous-proceedings/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/gallery/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/accommodation/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/journals/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/payments/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact-us/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/aginsight-flyer/", priority: 0.5, changeFrequency: "yearly" },
  { path: "/future-professionals/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/past-editions/", priority: 0.5, changeFrequency: "yearly" },
  // AgInsight 2024 archive
  { path: "/aginsight-2024/", priority: 0.4, changeFrequency: "yearly" },
  { path: "/call-for-papers-2024/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/important-dates-2024/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/contact-us-2024/", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }));
}
