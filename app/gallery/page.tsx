import { PageTitle } from "@/components/ui";
import Gallery from "./gallery";
import gallery from "@/lib/gallery.json";
import JsonLd from "@/components/json-ld";
import { abs, breadcrumbs, graph, pageMeta, webPage } from "@/lib/seo";

const seo = {
  path: "/gallery/",
  title: "Gallery",
  description: "Photos from AgInsight 2014, 2016 and 2022, the International Conference of Agricultural Sciences at Sabaragamuwa University of Sri Lanka, Belihuloya.",
  keywords: ["AgInsight gallery", "AgInsight photos", "AgInsight 2022 photos", "agriculture conference Sri Lanka photos"],
  image: { url: `/gallery/2022/${gallery["2022"][0]}`, alt: "AgInsight 2022 participants" },
};
export const metadata = pageMeta(seo);
const schema = graph(
  webPage({
    ...seo,
    type: "ImageGallery",
    image: seo.image.url,
    extra: {
      image: Object.entries(gallery).flatMap(([year, files]) =>
        files.map((f, i) => ({
          "@type": "ImageObject",
          contentUrl: abs(`/gallery/${year}/${f}`),
          thumbnailUrl: abs(`/gallery/${year}/thumb/${f}`),
          name: `AgInsight ${year} photo ${i + 1}`,
        })),
      ),
    },
  }),
  breadcrumbs([{ name: "Gallery", path: seo.path }]),
);

export default function Page() {
  const years = Object.entries(gallery)
    .map(([year, images]) => ({ year, images }))
    .sort((a, b) => b.year.localeCompare(a.year));
  const total = years.reduce((n, y) => n + y.images.length, 0);

  return (
    <>
      <JsonLd data={schema} />
      <PageTitle title="Gallery" lead={`${total} photos from ${years.length} AgInsight conferences.`} />
      <Gallery years={years} />
    </>
  );
}
