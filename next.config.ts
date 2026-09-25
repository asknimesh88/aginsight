import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML to out/, which any web server can host.
// trailingSlash keeps the old WordPress URLs (/contact-us/ etc.) working.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
