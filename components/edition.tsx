// Building blocks for the current edition's pages (homepage, call for papers, important dates)
import { Photo } from "@/components/ui";
import { fees, fmtDate, programme, tracks } from "@/lib/site";

const money = (n: number, currency: string) => (currency === "USD" ? `USD ${n}` : `LKR ${n.toLocaleString("en-US")}`);

// Five tracks as a photo mosaic: two wide cards on top, three below
export function TrackGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {tracks.map((t, i) => (
        <li
          key={t.title}
          className={`group relative isolate overflow-hidden rounded-3xl bg-field ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 4 ? "sm:col-span-2 lg:col-span-2" : ""}`}
        >
          <Photo
            name={t.photo}
            alt={t.alt}
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105`}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-field via-field/65 to-field/5" />
          <div className={`flex flex-col justify-end p-6 sm:p-8 ${i < 2 ? "min-h-72 lg:min-h-80" : "min-h-64"}`}>
            <span className="text-sm font-medium text-white/80">Track {i + 1}</span>
            <H className="mt-1 font-slab text-2xl font-semibold leading-tight text-white">{t.title}</H>
            <p className="mt-2 text-sm text-white/75">Professional forum and student forum</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function FeesTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left">
          <caption className="sr-only">AgInsight 2027 registration fees</caption>
          <thead className="bg-leaf">
            <tr>
              <th scope="col" className="px-6 py-5 font-slab text-lg font-semibold text-field">Participant</th>
              {fees.columns.map((c, i) => (
                <th key={c} scope="col" className="px-6 py-5 text-right">
                  <span className="block font-slab text-lg font-semibold text-field">{c}</span>
                  <span className="block text-sm font-normal text-muted">Until {fmtDate(fees.closes[i])}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {fees.rows.map((r) => (
              <tr key={r.who}>
                <th scope="row" className="px-6 py-4 font-medium">{r.who}</th>
                {r.amounts.map((a, i) => (
                  <td key={i} className={`px-6 py-4 text-right font-slab text-lg ${i === 0 ? "font-semibold text-primary" : "text-ink"}`}>
                    {money(a, r.currency)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Icon per agenda item, picked from its title
const agendaIcons: [RegExp, string][] = [
  [/registration/i, "M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zM8 10h8M8 14h5"],
  [/keynote|inauguration/i, "M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v4M8 21h8"],
  [/plenary/i, "M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a4 4 0 100-8 4 4 0 000 8zM21 20v-2a4 4 0 00-3-3.9M16 2.1a4 4 0 010 7.8"],
  [/session/i, "M3 4h18v12H3zM8 20h8M12 16v4"],
  [/refreshments/i, "M4 8h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h1a3 3 0 010 6h-1M8 2v3M12 2v3"],
  [/lunch|dinner/i, "M7 2v8a2 2 0 002 2v10M11 2v8a2 2 0 01-2 2M17 2c-2 1.5-3 4-3 7h3v13"],
  [/closing/i, "M4 21V4M4 4h13l-2 4 2 4H4"],
];
const iconFor = (title: string) => agendaIcons.find(([re]) => re.test(title))?.[1] ?? agendaIcons[3][1];

export function Programme() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {programme.map((day, d) => {
        const date = new Date(day.date + "T00:00:00");
        return (
          <article key={day.date} className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <header className="flex items-center gap-5 bg-field px-8 py-6 text-white">
              <span className="font-slab text-6xl font-bold leading-none text-secondary">{date.getDate()}</span>
              <span className="flex-1">
                <span className="block font-slab text-2xl font-semibold">{day.name}</span>
                <span className="mt-1 block text-sm text-white/70">
                  {date.toLocaleDateString("en-GB", { weekday: "long" })}, {date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              </span>
              <span className="self-start rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">Day {d + 1}</span>
            </header>

            <ol className="relative px-6 py-6 sm:px-8">
              <span aria-hidden className="absolute bottom-10 left-[calc(1.5rem+1.25rem)] top-10 w-px bg-black/10 sm:left-[calc(2rem+1.25rem)]" />
              {day.items.map((it) => {
                const pause = "pause" in it && it.pause;
                const detail = "detail" in it ? it.detail : undefined;
                return (
                  <li key={it.time + it.title} className={`relative flex gap-4 ${pause ? "py-2" : "py-2.5"}`}>
                    <span
                      aria-hidden
                      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full ${
                        pause ? "mx-1.5 h-7 w-7 bg-white text-muted ring-1 ring-black/10" : "h-10 w-10 bg-primary text-white"
                      }`}
                    >
                      <svg width={pause ? 14 : 18} height={pause ? 14 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={iconFor(it.title)} />
                      </svg>
                    </span>
                    {pause ? (
                      <p className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 pt-1 text-sm text-muted">
                        <span>{it.title}</span>
                        <time className="tabular-nums">{it.time}</time>
                      </p>
                    ) : (
                      <div className="flex-1 rounded-2xl bg-leaf px-5 py-3">
                        <time className="text-sm font-medium tabular-nums text-primary">{it.time}</time>
                        <p className="font-semibold text-ink">{it.title}</p>
                        {detail && <p className="mt-1 text-sm leading-relaxed text-ink/70">{detail}</p>}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </article>
        );
      })}
    </div>
  );
}

const d = (s: string) => new Date(s + "T00:00:00");
export const daysBetween = (a: string, b: string) => Math.round((d(b).getTime() - d(a).getTime()) / 86_400_000);

export function CalendarTile({ date, highlight }: { date: string; highlight?: boolean }) {
  const x = d(date);
  return (
    <div
      className={`relative z-10 w-16 shrink-0 self-start overflow-hidden rounded-2xl border bg-white text-center shadow-sm sm:w-20 ${highlight ? "border-primary ring-4 ring-primary/15" : "border-black/10"}`}
    >
      <div className={`py-1 text-xs font-medium text-white ${highlight ? "bg-field" : "bg-primary"}`}>
        {x.toLocaleDateString("en-US", { month: "short" })}
      </div>
      <div className="pb-1.5 pt-1 font-slab text-2xl font-semibold leading-none text-field sm:text-3xl">{x.getDate()}</div>
      <div className="pb-1.5 text-[11px] text-muted">{x.getFullYear()}</div>
    </div>
  );
}
