import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import Header from "@/components/header";
import { Footer } from "@/components/ui";
import JsonLd from "@/components/json-ld";
import { conf } from "@/lib/site";
import { SITE_URL, graph, organization, website } from "@/lib/seo";
import "./globals.css";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["400", "500", "700"] });
const robotoSlab = Roboto_Slab({ variable: "--font-roboto-slab", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${conf.name} | Agricultural Sciences Conference Sri Lanka`, template: `%s | ${conf.name}` },
  description: `${conf.edition}, ${conf.dates}, Sabaragamuwa University of Sri Lanka. ${conf.theme}.`,
  applicationName: conf.name,
  authors: [{ name: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka", url: "https://www.sab.ac.lk/agri/" }],
  publisher: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  icons: { icon: "/brand/favicon.png", apple: "/brand/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#1c3a05" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoSlab.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={graph(organization, website)} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
