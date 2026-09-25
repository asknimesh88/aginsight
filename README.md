# AgInsight website

Static Next.js site for the International Conference of Agricultural Sciences (AgInsight),
Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.

- `npm run dev` – local preview at http://localhost:3000
- `npm run build` – writes the finished site to `out/`; upload that folder to any web server.

Content (dates, speakers, themes, links, committee) lives in `lib/site.ts`.
Images and documents live in `public/`. `scripts/import-assets.mjs` was a one-off import
from the restored WordPress backup.

## Hosting (Cloudflare Workers)

Connected to GitHub: every push to `main` rebuilds and deploys the site.
`wrangler.jsonc` tells Cloudflare to run `npm run build` and serve the static `out/` folder
(no server code). The dashboard deploy command is `npx wrangler deploy`; no build command is needed there.

`public/_redirects` holds permanent redirects and `public/_headers` sets caching and security headers.
The temporary `*.workers.dev` / `*.pages.dev` addresses are served with `noindex` so only the real domain is indexed.
