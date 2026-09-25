import Link from "next/link";

// Old WordPress front-page URL. An instant meta refresh is treated by Google as a permanent redirect to the homepage.
export const metadata = { title: "Redirecting", robots: { index: false, follow: true }, alternates: { canonical: "/" } };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <meta httpEquiv="refresh" content="0; url=/" />
      <h1 className="font-slab text-3xl font-semibold text-field">This page has moved</h1>
      <p className="mt-4 text-lg">
        Continue to the <Link href="/" className="text-primary underline underline-offset-4">AgInsight homepage</Link>.
      </p>
    </section>
  );
}
