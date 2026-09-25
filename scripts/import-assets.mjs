// One-off: copy + resize assets from the restored WordPress install into public/.
// Run: node scripts/import-assets.mjs <gallery.tsv>
import sharp from "sharp";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const U = "C:/xampp/htdocs/aginsight/wp-content/uploads/";
const P = new URL("../public/", import.meta.url).pathname.replace(/^\/(\w:)/, "$1");

const out = (p) => (mkdirSync(dirname(P + p), { recursive: true }), P + p);
const img = (src, dest, w = 1600) =>
  sharp(U + src).resize({ width: w, withoutEnlargement: true }).toFile(out(dest));
const copy = (src, dest) => copyFileSync(U + src, out(dest));

// brand
copy("2019/05/AgInsight_Logo.png", "brand/logo.png");
copy("2019/05/cropped-Favicon_AgInsight-270x270.png", "brand/favicon.png");
await img("2019/05/Aginsight-2024-6-scaled.jpg", "brand/hero.jpg", 2400);

// people
const people = {
  "sampath-amarathunga.png": "2021/12/Prof._Sampath_Amarathunga-removebg-preview.png",
  "chandana-udawatte.png": "2021/12/Prof._CP_Udawatte_22-removebg-preview.png",
  "andrea-cupp.png": "2021/12/Andrea-Cupp_400-removebg-preview.png",
  "champika-liyanage.png": "2021/12/Prof.-Champika.png",
  "walter-samarasinghe.jpg": "2021/12/Dr.-Walter-Samarasinghe-removebg-preview.jpg",
  "harold-corke.jpg": "2024/02/corke.jpg",
};
for (const [d, s] of Object.entries(people)) await img(s, "people/" + d, 600);

// sponsors
for (const s of ["Logo-SUSL", "Analytical-Instruments", "Versatile-1", "Hemsons"])
  await img(`2022/01/${s}.png`, `sponsors/${s.toLowerCase()}.png`, 400);

// flyer, journal
await img("2024/05/WhatsApp-Image-2024-05-06-at-13.17.19_da7d7bde.jpg", "docs/flyer-2024.jpg", 1200);
await img("2021/04/journal.png", "docs/journal.png", 600);

// proceedings covers + pdfs
const covers = {
  "2007.jpg": "2021/06/1st-Conference.jpg",
  "2014.jpg": "2021/06/2nd-conference_1.jpg",
  "2016.jpg": "2019/05/AgInsight_2016.jpg",
  "2022.jpg": "2022/01/2022-Aginsight-Proceedingpng.jpg",
  "2024.jpg": "2024/10/AgInsight-2024-coverpage.jpg",
};
for (const [d, s] of Object.entries(covers)) await img(s, "proceedings/" + d, 600);
copy("2019/05/2.-2nd-conference-AgInsight-2014.pdf", "proceedings/aginsight-2014.pdf");
copy("2019/05/AgInsight-2016-Extended-Abstracts.pdf", "proceedings/aginsight-2016.pdf");
copy("2019/05/2022-Aginsight-Proceeding.pdf", "proceedings/aginsight-2022.pdf");
copy("2019/05/AgInsight-2024-Proceedings-.pdf", "proceedings/aginsight-2024.pdf");
copy("2019/05/Abstract-Guidelines-Aginsight-2024-No-Author-Information.docx", "docs/abstract-template.docx");
copy("2019/05/Author-Declaration-AgInsight-2024.pdf", "docs/author-declaration.pdf");

// accommodation
const hotels = {
  "sennya.jpg": "2024/09/227227457.jpg",
  "citrine.jpg": "2021/04/citrine.jpg",
  "belihuloya-rest-house.jpg": "2021/05/Belihuloya-Rest.jpg",
  "kale-cottage.jpg": "2024/09/471608468.jpg",
  "river-garden.jpg": "2021/04/river_garden.jpg",
  "glenrock.jpg": "2021/05/The-Glenrock.jpg",
  "landa.jpg": "2024/09/53029777.jpg",
  "mount-seven.jpg": "2024/09/487810125.jpg",
  "village-inn.jpg": "2024/09/580300078.jpg",
  "windy-rich.jpg": "2024/09/455885772.jpg",
  "worlds-end.jpg": "2024/09/500613136.jpg",
};
for (const [d, s] of Object.entries(hotels)) await img(s, "hotels/" + d, 800);

// gallery: full (1600) + thumb (600), manifest for the page
const gallery = {};
for (const line of readFileSync(process.argv[2], "utf8").trim().split(/\r?\n/)) {
  const [name, url] = line.split("\t");
  const year = name.match(/\d{4}/)[0];
  const file = url.split("/").pop().replace(/\.\w+$/, ".jpg").toLowerCase();
  await img("photo-gallery" + url, `gallery/${year}/${file}`);
  await img("photo-gallery" + url, `gallery/${year}/thumb/${file}`, 600);
  (gallery[year] ??= []).push(file);
}
writeFileSync(new URL("../lib/gallery.json", import.meta.url), JSON.stringify(gallery, null, 1));
console.log("done", Object.fromEntries(Object.entries(gallery).map(([k, v]) => [k, v.length])));
