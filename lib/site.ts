// All conference content lives here. For a new edition, edit this file.

type Conf = {
  name: string; edition: string; theme: string; dates: string; format: string; venue: string; email: string;
  submitUrl?: string; registerUrl?: string; mapUrl: string;
  startsAt?: string; endsAt?: string; // ISO with Sri Lanka offset, for the countdown
};

// Current edition (from "AGINSIGHT SCHEDULE FOR WEB.pdf")
export const conf: Conf = {
  name: "AgInsight 2027",
  edition: "6th International Conference of Agricultural Sciences",
  theme: "Innovating Together for Resilient Agriculture and Community Well-Being",
  dates: "10–11 March 2027",
  format: "Physical conference",
  venue: "Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, Belihuloya",
  email: "aginsight@agri.sab.ac.lk",
  // submitUrl / registerUrl: add when the CMT site and registration form open
  startsAt: "2027-03-10T14:00:00+05:30", // day 1 registration opens (programme)
  endsAt: "2027-03-11T17:45:00+05:30", // closing ceremony ends
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Sabaragamuwa+University+of+Sri+Lanka",
};

// Where "Submit" buttons go until the CMT link exists
export const submitHref = conf.submitUrl ?? "/call-for-papers/#how-to-submit";

export const about = [
  "The Faculty of Agricultural Sciences of Sabaragamuwa University of Sri Lanka has organised a series of international conferences under the AgInsight banner, creating a strong platform for academics, researchers, industry experts, policymakers, development practitioners, students and community stakeholders to exchange knowledge and build collaborations.",
  "Earlier editions have promoted interdisciplinary research dissemination, industry–academia partnerships, innovation sharing, and regional and international networking. AgInsight 2027 is the faculty’s 6th International Conference of Agricultural Sciences.",
];

export const themeRationale =
  "The theme emphasises collaborative innovation and interdisciplinary partnerships in transforming agricultural systems to become more resilient, adaptive, inclusive and community-centred. Sustainable agricultural development and food security can only be achieved through the collective efforts of scientists, farmers, industries, policymakers, entrepreneurs, students and local communities.";

export const focusAreas = [
  "Climate-resilient agricultural practices",
  "Smart and digital agriculture",
  "Sustainable livestock and crop production systems",
  "Food and nutrition security",
  "Value addition and agribusiness development",
  "Community empowerment and rural livelihood improvement",
  "One Health and environmental sustainability",
  "Knowledge-sharing platforms that bridge research and practice",
];

export const tracks = [
  { title: "Agriculture and Agri-environment", photo: "aerial-tractor-ploughing", alt: "Aerial view of a tractor ploughing rows in a green field" },
  { title: "Agribusiness and Agricultural Economics", photo: "tomatoes-market", alt: "Fresh tomatoes on the vine piled high at a market" },
  { title: "Community Development and Nutrition Security", photo: "farmer-walking-cattle", alt: "A woman farmer walking her cattle along a village road" },
  { title: "Livestock and Aquaculture", photo: "aerial-fishing-boat", alt: "Aerial view of a fishing boat hauling a net across green water" },
  { title: "One Health and Food Safety", photo: "chick-in-hand", alt: "A farmer gently holding a young chick in an open hand" },
];

export const publication = [
  "Extended abstracts will be published online.",
  "Recommended full papers will be published in a special issue of the Journal of Agricultural Sciences – Sri Lanka.",
];

// Stage names group the timeline; labels are shown to visitors
export const dates = [
  { date: "2026-10-05", label: "Extended abstract submission opens", stage: "Submission", note: "Start submitting your extended abstract." },
  { date: "2026-11-15", label: "Extended abstract submission deadline", stage: "Submission", note: "Last day to submit your extended abstract." },
  { date: "2027-01-15", label: "Notification of acceptance", stage: "Review", note: "Authors are told whether their abstract has been accepted." },
  { date: "2027-01-22", label: "Early bird registration closes", stage: "Registration", note: "Last day to register at the early bird rate." },
  { date: "2027-01-25", label: "Final abstract submission", stage: "Review", note: "Submit the final version of your accepted abstract." },
  { date: "2027-02-12", label: "Regular registration closes", stage: "Registration", note: "Last day to register at the regular rate." },
  { date: "2027-03-10", label: "Conference day 1", stage: "Conference", note: "Registration, inauguration, keynote speech, plenary sessions and conference dinner." },
  { date: "2027-03-11", label: "Conference day 2", stage: "Conference", note: "Technical sessions across all five tracks and the closing ceremony." },
];

export const deadline = dates.find((d) => d.label === "Extended abstract submission deadline")!;

export const fees = {
  columns: ["Early bird", "Regular"],
  closes: ["2027-01-22", "2027-02-12"],
  rows: [
    { who: "Local students", currency: "LKR", amounts: [1500, 2000] },
    { who: "Local participants", currency: "LKR", amounts: [4500, 5500] },
    { who: "International participants", currency: "USD", amounts: [70, 100] },
    { who: "International students", currency: "USD", amounts: [50, 75] },
  ],
};

export const programme = [
  {
    date: "2027-03-10",
    items: [
      { time: "2.00–3.00 pm", title: "Registration" },
      { time: "3.00–4.15 pm", title: "Inauguration session and keynote speech" },
      { time: "4.15–4.30 pm", title: "Refreshments", pause: true },
      { time: "4.30–6.30 pm", title: "Plenary sessions", detail: "Departments of Agribusiness Management, Export Agriculture and Livestock Production" },
      { time: "7.30 pm onwards", title: "Conference dinner" },
    ],
  },
  {
    date: "2027-03-11",
    items: [
      { time: "8.30–9.00 am", title: "Registration" },
      { time: "9.00–10.30 am", title: "Session 1" },
      { time: "10.30–11.00 am", title: "Refreshments", pause: true },
      { time: "11.00 am–12.30 pm", title: "Session 2" },
      { time: "12.30–1.30 pm", title: "Lunch", pause: true },
      { time: "1.30–4.00 pm", title: "Session 3" },
      { time: "4.15–4.30 pm", title: "Refreshments", pause: true },
      { time: "4.45–5.45 pm", title: "Closing ceremony" },
    ],
  },
];

// Phone numbers and emails to be added when the committee confirms them
export const committee: { name: string; role: string; phone?: string; email?: string }[] = [
  { name: "Prof. T. Sanjeewa Prasad Jayaweera", role: "Chairperson" },
  { name: "Dr. R. N. N. Perera", role: "Secretary" },
  { name: "Dr. P. Shivashankar", role: "Coordinator" },
];

// ---------------- AgInsight 2024 (archive pages) ----------------

export const conf2024: Conf = {
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
    label: "AgInsight 2027",
    href: "/call-for-papers/",
    children: [
      { label: "Call for papers", href: "/call-for-papers/" },
      { label: "Important dates", href: "/important-dates/" },
      { label: "Submission guidelines", href: "/paper-submission-guidelines/" },
      { label: "Payments", href: "/payments/" },
      { label: "Journals", href: "/journals/" },
    ],
  },
  {
    label: "Past editions",
    href: "/aginsight-2024/",
    children: [
      { label: "AgInsight 2024", href: "/aginsight-2024/" },
      { label: "2024 speakers", href: "/chief-guest-and-keynote-speakers/" },
      { label: "2024 call for papers", href: "/call-for-papers-2024/" },
      { label: "2024 important dates", href: "/important-dates-2024/" },
      { label: "2024 contacts", href: "/contact-us-2024/" },
      { label: "Previous proceedings", href: "/previous-proceedings/" },
      { label: "Gallery", href: "/gallery/" },
    ],
  },
  { label: "Accommodation", href: "/accommodation/" },
  { label: "Contact", href: "/contact-us/" },
];

export const intro2024 =
  "The Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka, invites academics, practitioners, scholars, researchers and policy makers to present their papers at AgInsight 2024. Papers are submitted through CMT and double-blind peer reviewed by two reviewers. Undergraduate students are warmly encouraged to present findings from ongoing research. Papers may address the main theme or any of the sub-themes below; unlisted but related topics are also welcome.";

export const whyAttend2024 = [
  "Share your research findings and scholarly knowledge at an international academic forum",
  "Broaden your international research network",
  "Selected high-quality papers are considered for publication in the Journal of Agricultural Sciences – Sri Lanka (ESCI/WoS, Scopus, DOAJ, EBSCO)",
];

export const themes2024: { title: string; topics: string[] }[] = [
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

export const dates2024 = [
  { date: "2024-04-05", label: "Call for abstracts opens", stage: "Submission", note: "Abstract submissions open on Microsoft CMT." },
  { date: "2024-05-05", label: "Abstract submission deadline", stage: "Submission", note: "Last day to submit your abstract and extended abstract through CMT." },
  { date: "2024-07-25", label: "Notification of acceptance", stage: "Review", note: "Authors receive the double-blind review outcome." },
  { date: "2024-08-05", label: "Camera-ready submission deadline", stage: "Review", note: "Submit the final, corrected version of your accepted abstract." },
  { date: "2024-08-15", label: "Registration", stage: "Registration", note: "Register to attend. Registration is free." },
  { date: "2024-09-11", label: "Conference day 1", stage: "Conference", note: "Hybrid sessions at Sabaragamuwa University of Sri Lanka and online." },
  { date: "2024-09-12", label: "Conference day 2", stage: "Conference", note: "Hybrid sessions at Sabaragamuwa University of Sri Lanka and online." },
];

export const deadline2024 = dates2024.find((d) => d.label === "Abstract submission deadline")!;

// Google Calendar all-day event spanning the conference days (end date is exclusive)
const ymd = (x: Date) => `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}`;
export function calendarUrlFor(c: Conf, ds: { date: string; stage: string }[]) {
  const days = ds.filter((d) => d.stage === "Conference").map((d) => new Date(d.date + "T00:00:00"));
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(c.name)}` +
    `&dates=${ymd(days[0])}/${ymd(new Date(days.at(-1)!.getTime() + 86_400_000))}` +
    `&location=${encodeURIComponent(c.venue)}` +
    `&details=${encodeURIComponent(`${c.edition}: ${c.theme}`)}`
  );
}
export const calendarUrl = calendarUrlFor(conf, dates);

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

// AgInsight 2024 speakers and guests
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

export const events2024 = [
  { type: "Plenary session", title: "The role of nutrition in sustainable livestock production" },
  { type: "Plenary session", title: "Resilience in food systems" },
  { type: "Teaching cases", title: "Food and agribusiness" },
];

export const sponsors2024 = [
  { name: "Sabaragamuwa University of Sri Lanka", logo: "/sponsors/logo-susl.png" },
  { name: "Analytical Instruments", logo: "/sponsors/analytical-instruments.png" },
  { name: "Versatile", logo: "/sponsors/versatile-1.png" },
  { name: "Hemsons", logo: "/sponsors/hemsons.png" },
];

export const committee2024: { name: string; role: string; phone?: string }[] = [
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
