// All conference content lives here. For a new edition, edit this file.

export const conf = {
  name: "AgInsight 2024",
  edition: "5th International Conference of Agricultural Sciences",
  theme: "Agricultural research to address future challenges of climate change and food security",
  dates: "11–12 September 2024",
  format: "Hybrid conference",
  venue: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya",
  email: "aginsight@agri.sab.ac.lk",
  submitUrl: "https://cmt3.research.microsoft.com/AgInsight2024",
  registerUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeBojyBqwf3cpxXaTDgXq_5dVFzIcuv8oofQLHXN8WNk7dE0g/viewform?usp=sf_link",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Sabaragamuwa+University+of+Sri+Lanka",
};

// Documents keep their original WordPress upload URLs (linked from emails, CMT and search results)
const up = "/wp-content/uploads";
export const docs = {
  template: `${up}/2019/05/Abstract-Guidelines-Aginsight-2024-No-Author-Information.docx`,
  declaration: `${up}/2019/05/Author-Declaration-AgInsight-2024.pdf`,
  flyer: `${up}/2024/05/WhatsApp-Image-2024-05-06-at-13.17.19_da7d7bde.jpg`,
  futureProfessionals: `${up}/2024/07/AgInsight-2024-Headhunting.pdf`,
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  {
    label: "Conference",
    href: "/call-for-papers/",
    children: [
      { label: "Call for papers", href: "/call-for-papers/" },
      { label: "Important dates", href: "/important-dates/" },
      { label: "Submission guidelines", href: "/paper-submission-guidelines/" },
      { label: "Speakers", href: "/chief-guest-and-keynote-speakers/" },
      { label: "Previous proceedings", href: "/previous-proceedings/" },
      { label: "Gallery", href: "/gallery/" },
    ],
  },
  { label: "Accommodation", href: "/accommodation/" },
  { label: "Journals", href: "/journals/" },
  { label: "Payments", href: "/payments/" },
  { label: "Contact", href: "/contact-us/" },
];

export const intro =
  "The Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, invites academics, practitioners, scholars, researchers and policy makers to present their papers at AgInsight 2024. Papers are submitted through CMT and double-blind peer reviewed by two reviewers. Undergraduate students are warmly encouraged to present findings from ongoing research. Papers may address the main theme or any of the sub-themes below; unlisted but related topics are also welcome.";

export const whyAttend = [
  "Share your research findings and scholarly knowledge at an international academic forum",
  "Broaden your international research network",
  "Selected high-quality papers are considered for publication in the Journal of Agricultural Sciences – Sri Lanka (ESCI/WoS, Scopus, DOAJ, EBSCO)",
];

export const themes: { title: string; topics: string[] }[] = [
  {
    title: "Agriculture and agri-environment",
    topics: [
      "Agro-environment", "Climate change", "Crop improvement", "Crop modelling",
      "Environmental toxicology", "Farm mechanization", "Genetics and plant breeding",
      "Horticulture", "Plant biotechnology", "Plant protection", "Plantation crops",
      "Postharvest physiology and technology", "Soil science", "Sustainable agriculture",
      "Water and irrigation",
    ],
  },
  {
    title: "Agribusiness and agricultural economics",
    topics: [
      "Challenges and opportunities presented by the COVID-19 pandemic for agri-food systems",
      "Economic, social and environmental dimensions of organic farming",
      "Food health, food safety and food security", "Food loss and waste",
      "Gender in agri-food value chains", "Innovations reshaping the future of food",
      "Innovative business models for agribusiness",
      "Roles and challenges of new digital technologies for agri-food systems",
      "Rural–urban linkages and food systems", "Smallholders and food system transformation",
      "Sustainability and resilient agri-food supply chains",
    ],
  },
  {
    title: "Livestock, aquaculture and food science",
    topics: [
      "Agrostology", "Animal biotechnology and molecular biology",
      "Animal by-products and waste management", "Animal health and food safety",
      "Animal welfare and behaviour", "Aquaculture and fisheries",
      "Bioinformatics and nano-technology", "Food science and technology",
      "Genetics and animal breeding", "Livestock nutrition",
      "Livestock production and management",
    ],
  },
];

export const dates = [
  { date: "2024-04-05", label: "Call for abstracts opens", stage: "Submission", note: "Abstract submissions open on Microsoft CMT." },
  { date: "2024-05-05", label: "Abstract submission deadline", stage: "Submission", note: "Last day to submit your abstract and extended abstract through CMT." },
  { date: "2024-07-25", label: "Notification of acceptance", stage: "Review", note: "Authors receive the double-blind review outcome." },
  { date: "2024-08-05", label: "Camera-ready submission deadline", stage: "Review", note: "Submit the final, corrected version of your accepted abstract." },
  { date: "2024-08-15", label: "Registration", stage: "Registration", note: "Register to attend. Registration is free." },
  { date: "2024-09-11", label: "Conference day 1", stage: "Conference", note: "Hybrid sessions at Sabaragamuwa University of Sri Lanka and online." },
  { date: "2024-09-12", label: "Conference day 2", stage: "Conference", note: "Hybrid sessions at Sabaragamuwa University of Sri Lanka and online." },
];

export const deadline = dates.find((d) => d.label === "Abstract submission deadline")!;

// Google Calendar all-day event spanning the conference days (end date is exclusive)
const conferenceDays = dates.filter((d) => d.stage === "Conference").map((d) => new Date(d.date + "T00:00:00"));
const ymd = (x: Date) => `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}`;
export const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(conf.name)}` +
  `&dates=${ymd(conferenceDays[0])}/${ymd(new Date(conferenceDays.at(-1)!.getTime() + 86_400_000))}` +
  `&location=${encodeURIComponent(conf.venue)}` +
  `&details=${encodeURIComponent(`${conf.edition}: ${conf.theme}`)}`;

export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export type Person = {
  name: string;
  role: string;
  title: string;
  photo: string;
  session?: string;
  bio?: string[];
  highlights?: { value: string; label: string }[];
};

export const people: Person[] = [
  {
    role: "Keynote speaker",
    name: "Prof. Harold Corke",
    title: "Professor in Biotechnology and Food Engineering Program, Guangdong Technion – Israel Institute of Technology (GTIIT)",
    photo: "/people/harold-corke.jpg",
    highlights: [
      { value: "330+", label: "international journal papers" },
      { value: "37,932", label: "citations on Google Scholar" },
      { value: "95", label: "h-index" },
    ],
    bio: [
      "Prof. Harold Corke is a professor in the Biotechnology and Food Engineering Program, Guangdong Technion Israel Institute of Technology (GTIIT). Previously, he was included in Shanghai’s key talent program and was full-time Chair Professor in the Department of Food Science and Technology, School of Agriculture and Biology, Shanghai Jiao Tong University, from 2016 to 2020. Before that he was Professor in Food and Nutritional Sciences, School of Biological Sciences, The University of Hong Kong, where he spent 24 years.",
      "Prof. Corke is active in both basic and applied research in grain processing, genetics of grain quality, and chemistry of plant bioactives. He has published more than 330 international journal papers (37,932 citations, h-index 95, Google Scholar, February 2024) and has graduated dozens of PhD students who have gone on to academic and industry careers around the world. He was editor of the Elsevier Encyclopedia of Food Grains (2016) and is an editor of the Journal of Cereal Science and LWT – Food Science and Technology.",
    ],
  },
  {
    role: "Chief guest",
    name: "Snr. Prof. Sampath Amarathunga",
    title: "Chairman, University Grants Commission – Sri Lanka",
    photo: "/people/sampath-amarathunga.png",
  },
  {
    role: "Guest of honour",
    name: "Snr. Prof. Chandana P. Udawatte",
    title: "Vice-Chairman, University Grants Commission – Sri Lanka",
    photo: "/people/chandana-udawatte.png",
  },
  {
    role: "Guest speaker",
    name: "Prof. Champika Liyanage",
    title: "Professor in Facilities Management, Co-Director – Centre for Sustainable Transitions, School of Engineering, University of Central Lancashire, UK",
    session: "Plenary session: Agribusiness management",
    photo: "/people/champika-liyanage.png",
  },
  {
    role: "Guest speaker",
    name: "Dr. Walter Samarasinghe",
    title: "Managing Director, SuperFeed (Pvt) Ltd, Sri Lanka",
    session: "Plenary session: Livestock production",
    photo: "/people/walter-samarasinghe.jpg",
  },
];

// Keynote speakers of earlier editions whose profile pages are still indexed
export const pastKeynotes: (Person & { edition: string; path: string })[] = [
  {
    edition: "AgInsight 2022",
    path: "/prof-andrea-cupp/",
    role: "Keynote speaker",
    name: "Prof. Andrea Cupp",
    title: "Professor, Reproductive Physiologist and Beef Physiologist, Irvin T. and Wanda R. Omtvedt Professor of Animal Science, University of Nebraska–Lincoln, USA",
    photo: "/people/andrea-cupp.png",
    highlights: [
      { value: "30+", label: "years of international research" },
      { value: "140+", label: "high-impact publications" },
      { value: "6,200", label: "citations" },
    ],
    bio: [
      "Prof. Andrea Cupp is a Professor in the Department of Animal Science, Institute of Agriculture and Natural Resources at the University of Nebraska, USA, with more than 30 years of international research experience in reproductive physiology and endocrinology. She received her BS in Animal Science from Virginia Tech in 1988 and her MS and PhD in Reproductive Physiology/Endocrinology from the University of Nebraska–Lincoln in 1991 and 1994. She completed postdoctoral training in cellular and molecular endocrinology at the University of California–San Francisco and Washington State University.",
      "She was Research Assistant Professor and Director of the Transgenic and Knockout Mouse Facility at the Center of Reproductive Biology, Washington State University, joined the Animal Science Department at Nebraska as Assistant Professor in 2000, and became Associate Professor in 2006 and Professor in 2011. In 2015 she was appointed to the Omtvedt Endowed Professorship. She serves as a reviewer and editorial board member for several journals.",
      "An active member of the Society for the Study of Reproduction, the American Society of Animal Science, the American Society of Andrology, the American Association for the Advancement of Science and the Nebraska Physiological Society, her research covers vascular development in gonadal morphogenesis and its effect on fertility, androgen excess in females, and the genomics of puberty in heifers. She has developed many animal models of male and female reproduction to benefit the livestock sector, and has authored over 140 publications in journals including Science, Biology of Reproduction and the Journal of Animal Science, with 6,200 citations.",
    ],
  },
];

export const events = [
  { type: "Plenary session", title: "The role of nutrition in sustainable livestock production" },
  { type: "Plenary session", title: "Resilience in food systems" },
  { type: "Teaching cases", title: "Food and agribusiness" },
];

export const sponsors = [
  { name: "Sabaragamuwa University of Sri Lanka", logo: "/sponsors/logo-susl.png" },
  { name: "Analytical Instruments", logo: "/sponsors/analytical-instruments.png" },
  { name: "Versatile", logo: "/sponsors/versatile-1.png" },
  { name: "Hemsons", logo: "/sponsors/hemsons.png" },
];

export const committee = [
  { name: "Prof. Kapila Dissanayake", role: "Conference Chair" },
  { name: "Dr. R. K. C. Jeewanthi", role: "Conference Coordinator" },
  { name: "Mr. Nimesh Madushanka", role: "Conference Secretary", phone: "+94 71 626 0870" },
  { name: "Mr. M. Naveenan", role: "Conference Assistant Secretary", phone: "+94 76 215 6364" },
];

export const usefulLinks = [
  { label: "Faculty of Agricultural Sciences", href: "https://www.sab.ac.lk/agri/" },
  { label: "Sabaragamuwa University of Sri Lanka", href: "https://www.sab.ac.lk/" },
  { label: "Department of Immigration Sri Lanka", href: "http://www.immigration.gov.lk/" },
  { label: "Journal of Agricultural Sciences – Sri Lanka", href: "https://jas.sljol.info/" },
];

// Themes, dates and ISBNs are taken from each proceedings cover
export const proceedings: {
  title: string; year: string; cover: string; pdf?: string; kind?: string; theme?: string; dates?: string; isbn?: string;
}[] = [
  { title: "1st Annual Symposium", year: "2007", cover: "/proceedings/2007.jpg" },
  {
    title: "International Conference of Agricultural Sciences", year: "2014", cover: "/proceedings/2014.jpg", pdf: `${up}/2019/05/2.-2nd-conference-AgInsight-2014.pdf`,
    kind: "Abstracts", theme: "Perspectives for contemporary agriculture: challenges and future directions", dates: "9–10 January 2014",
  },
  {
    title: "3rd International Conference of Agricultural Sciences", year: "2016", cover: "/proceedings/2016.jpg", pdf: `${up}/2019/05/AgInsight-2016-Extended-Abstracts.pdf`,
    kind: "Extended abstracts", theme: "Power of research: force for tomorrow’s agricultural development", dates: "8–9 December 2016",
  },
  {
    title: "4th International Conference of Agricultural Sciences", year: "2022", cover: "/proceedings/2022.jpg", pdf: `${up}/2019/05/2022-Aginsight-Proceeding.pdf`,
    kind: "Extended abstracts", isbn: "978-624-5727-15-5",
  },
  {
    title: "5th International Conference of Agricultural Sciences", year: "2024", cover: "/proceedings/2024.jpg", pdf: `${up}/2019/05/AgInsight-2024-Proceedings-.pdf`,
    kind: "Abstracts", theme: "Agricultural research to address future challenges of climate change and food security", dates: "11 September 2024", isbn: "978-624-5727-48-3",
  },
];

export const hotels = [
  { name: "Sennya Resorts", img: "sennya.jpg", url: "https://www.booking.com/hotel/lk/sennya-resorts.en-gb.html" },
  { name: "Citrine River Residence", img: "citrine.jpg", url: "https://www.booking.com/hotel/lk/citrine-belihuloya.en-gb.html" },
  { name: "Belihuloya Rest House", img: "belihuloya-rest-house.jpg", url: "https://www.booking.com/hotel/lk/the-rest-house-belihuloya.en-gb.html" },
  { name: "Kale Cottage", img: "kale-cottage.jpg", url: "https://www.booking.com/hotel/lk/kale-cottage-belihuloya-belihuloya2.en-gb.html" },
  { name: "River Garden", img: "river-garden.jpg", url: "https://www.booking.com/hotel/lk/river-garden-resort-and-camping.en-gb.html" },
  { name: "The Glenrock", img: "glenrock.jpg", url: "https://www.booking.com/hotel/lk/the-glenrock.en-gb.html" },
  { name: "Landa Holiday House", img: "landa.jpg", url: "https://www.booking.com/hotel/lk/landa-holiday-house.en-gb.html" },
  { name: "Mount Seven Holiday Inn", img: "mount-seven.jpg", url: "https://www.booking.com/hotel/lk/mount-seven-holiday-inn.en-gb.html" },
  { name: "Belihuloya Village Inn", img: "village-inn.jpg", url: "https://www.booking.com/hotel/lk/belihuloya-village-inn-belihuloya.en-gb.html" },
  { name: "Windy Rich Bungalow", img: "windy-rich.jpg", url: "https://www.booking.com/hotel/lk/windy-rich-bungalow-belihuloya.en-gb.html" },
  { name: "World’s End Base Eco-Village", img: "worlds-end.jpg", url: "https://www.booking.com/hotel/lk/worlds-end-base-eco-village.en-gb.html" },
];
