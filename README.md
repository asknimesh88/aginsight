# AgInsight website

Static Next.js site for the International Conference of Agricultural Sciences (AgInsight),
Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.

- `npm run dev` – local preview at http://localhost:3000
- `npm run build` – writes the finished site to `out/`; upload that folder to any web server.

Content (dates, speakers, themes, links, committee) lives in `lib/site.ts`.
Images and documents live in `public/`. `scripts/import-assets.mjs` was a one-off import
from the restored WordPress backup.

## Hosting (Cloudflare Pages)

Connected to GitHub: every push to `main` rebuilds and deploys the site.

- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NODE_VERSION` = `22`

`public/_redirects` holds permanent redirects and `public/_headers` sets caching and security headers.
The `*.pages.dev` preview address is served with `noindex` so only the real domain is indexed.
