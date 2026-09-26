import Link from "next/link";
import { calendarUrl, committee, conf, nav, submitHref, usefulLinks } from "@/lib/site";

export function PageTitle({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-field text-white">
      <img src="/brand/hero.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:pt-20">
        <p className="mb-3 text-sm text-white/70">
          <Link href="/" className="hover:text-white">Home</Link> / {title}
        </p>
        <h1 className="font-slab text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-white/85">{lead}</p>}
      </div>
    </section>
  );
}

export function Button({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" | "light" }) {
  const styles = {
    solid: "bg-primary text-white hover:bg-field",
    ghost: "border border-white/60 text-white hover:bg-white hover:text-field",
    light: "border border-primary text-primary hover:bg-primary hover:text-white",
  }[variant];
  const external = href.startsWith("http") || href.endsWith(".pdf") || href.endsWith(".docx");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener" })}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors ${styles}`}
    >
      {children}
    </a>
  );
}

const Icon = ({ d, className = "" }: { d: string; className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d={d} />
  </svg>
);

const icons = {
  calendar: "M4 6a2 2 0 012-2h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 10h16M8 2v4M16 2v4",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.5 5.7 3.5 9s-1 6.3-3.5 9c-2.5-2.7-3.5-5.7-3.5-9s1-6.3 3.5-9z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z",
  up: "M12 19V5M6 11l6-6 6 6",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
};

export function Venue() {
  const rows = [
    { icon: icons.calendar, label: "When", value: conf.dates },
    { icon: icons.pin, label: "Where", value: conf.venue },
    { icon: icons.globe, label: "Format", value: `${conf.format}, with professional and student forums` },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="grid overflow-hidden rounded-3xl bg-leaf md:grid-cols-2">
        <div className="relative min-h-64">
          <img src="/brand/campus-faculty.jpg" alt="Faculty of Agricultural Sciences sign at Sabaragamuwa University" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="p-8 sm:p-12">
          <p className="text-sm font-medium text-primary">Venue and dates</p>
          <h2 className="mt-2 font-slab text-3xl font-semibold tracking-tight text-field sm:text-4xl">See you in Belihuloya</h2>
          <dl className="mt-8 flex flex-col gap-5">
            {rows.map((r) => (
              <div key={r.label} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Icon d={r.icon} />
                </span>
                <div>
                  <dt className="text-sm text-muted">{r.label}</dt>
                  <dd className="font-medium leading-snug">{r.value}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={calendarUrl}>Add to Google Calendar</Button>
            <Button href={conf.mapUrl} variant="light">Get directions</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [current, past] = nav;
  const col = "font-slab text-lg font-semibold text-white";
  const link = "transition-colors hover:text-secondary";
  return (
    <footer className="border-t-4 border-secondary bg-field text-white/75">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 pt-20 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block rounded-2xl bg-white p-3" aria-label="AgInsight home">
            <img src="/brand/logo.png" alt="AgInsight" className="h-14 w-auto" />
          </Link>
          <p className="mt-6 font-slab text-2xl font-semibold text-white">{conf.name}</p>
          <p className="mt-1 text-sm">{conf.edition}</p>
          <p className="mt-4 text-sm leading-relaxed">
            {conf.dates}
            <br />
            Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h2 className={col}>{current.label}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[...current.children!, ...nav.slice(2)].map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={col}>{past.label}</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {past.children!.map((l) => (
                <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className={col}>Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a href={`mailto:${conf.email}`} className={`flex gap-3 ${link}`}>
                  <Icon d={icons.mail} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="break-all">{conf.email}</span>
                </a>
              </li>
              {committee.map((c) => (
                <li key={c.name} className="flex gap-3">
                  <Icon d={c.phone ? icons.phone : icons.user} className="mt-0.5 shrink-0 text-secondary" />
                  <span>
                    <span className="block text-white">{c.name}</span>
                    <span className="block text-white/60">{c.role}</span>
                    {c.phone && <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={link}>{c.phone}</a>}
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <Icon d={icons.pin} className="mt-0.5 shrink-0 text-secondary" />
                <span>Belihuloya 70140, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} Faculty of Agricultural Sciences, Sabaragamuwa University of Sri Lanka</p>
          <div className="flex flex-wrap items-center gap-6">
            {usefulLinks.slice(0, 2).map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener" className="hover:text-white">{l.label}</a>
            ))}
            <a href="#" className="inline-flex items-center gap-2 hover:text-white">
              Back to top
              <Icon d={icons.up} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Responsive WebP photo from public/photos (generated by scripts/import-photos-2027.mjs)
export function Photo({ name, alt, sizes = "(min-width: 1024px) 50vw, 100vw", className = "", eager, position }: {
  name: string; alt: string; sizes?: string; className?: string; eager?: boolean; position?: string;
}) {
  return (
    <img
      src={`/photos/${name}-800.webp`}
      srcSet={`/photos/${name}-800.webp 800w, /photos/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1067}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

export function Heading({ title, lead, link, center, dark }: { title: string; lead?: string; link?: { href: string; label: string }; center?: boolean; dark?: boolean }) {
  return (
    <div className={center ? "text-center" : "flex flex-wrap items-end justify-between gap-x-8 gap-y-4"}>
      <div className={center ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        <h2 className={`font-slab text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-field"}`}>{title}</h2>
        {lead && <p className={`mt-3 text-lg ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
      </div>
      {link && (
        <Link href={link.href} className={`group inline-flex items-center gap-2 font-medium ${dark ? "text-white" : "text-primary"}`}>
          {link.label}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export function CtaCard({ title, text, secondary }: { title: string; text: string; secondary?: { href: string; label: string } }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-field p-8 text-white sm:p-12 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-slab text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-lg text-white/75">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:shrink-0">
          <Button href={submitHref}>{conf.submitUrl ? "Submit your abstract" : "Read the call for papers"}</Button>
          {secondary && <Button href={secondary.href} variant="ghost">{secondary.label}</Button>}
        </div>
      </div>
    </section>
  );
}
