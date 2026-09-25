# AgInsight website

Static Next.js site for the International Conference of Agricultural Sciences (AgInsight),
Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka.

- `npm run dev` – local preview at http://localhost:3000
- `npm run build` – writes the finished site to `out/`; upload that folder to any web server.

Content (dates, speakers, themes, links, committee) lives in `lib/site.ts`.
Images and documents live in `public/`. `scripts/import-assets.mjs` was a one-off import
from the restored WordPress backup.
