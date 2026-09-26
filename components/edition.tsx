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

export function Programme() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {programme.map((day, d) => (
        <article key={day.date} className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-primary">Day {d + 1}</p>
          <h3 className="mt-1 font-slab text-2xl font-semibold text-field">
            {new Date(day.date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
          </h3>
          <ol className="mt-6 divide-y divide-black/5 border-t border-black/5">
            {day.items.map((it) => (
              <li key={it.time + it.title} className={`grid grid-cols-[8.5rem_1fr] gap-4 py-3.5 ${"pause" in it && it.pause ? "text-muted" : ""}`}>
                <time className="text-sm tabular-nums text-muted">{it.time}</time>
                <span>
                  <span className={"pause" in it && it.pause ? "" : "font-medium"}>{it.title}</span>
                  {"detail" in it && it.detail && <span className="mt-1 block text-sm text-ink/70">{it.detail}</span>}
                </span>
              </li>
            ))}
          </ol>
        </article>
      ))}
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
