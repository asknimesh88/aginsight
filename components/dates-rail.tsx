"use client";

import { useSyncExternalStore } from "react";

type Stop = { date: string; label: string; end?: string };

const noop = () => () => {};
const today = () => Math.floor(Date.now() / 3_600_000) * 3_600_000; // hourly is plenty; keeps the snapshot stable
const RAIL_RIGHT = "calc((100% - 6rem) / 7 - 2rem)";
const endOfDay = (d: string) => new Date(d + "T23:59:59+05:30").getTime();

// Horizontal on desktop, vertical on phones. Status (done / next) comes from the visitor's clock after load.
export default function DatesRail({ stops }: { stops: Stop[] }) {
  const now = useSyncExternalStore(noop, today, () => null);
  const nextIndex = now === null ? -1 : stops.findIndex((s) => endOfDay(s.end ?? s.date) >= now);
  const doneCount = now === null ? 0 : nextIndex === -1 ? stops.length : nextIndex;
  // Rail fill: halfway between the last passed stop and the next one
  const fill = stops.length > 1 ? Math.min(1, Math.max(0, (doneCount - 0.5) / (stops.length - 1))) : 0;

  return (
    <ol className="relative grid gap-8 lg:grid-cols-7 lg:gap-4">
      {/* Rail (desktop: horizontal through the tiles; phones: vertical) */}
      {/* Desktop rail runs from the centre of the first tile to the centre of the last (7 columns, 1rem gaps, 4rem tiles) */}
      <span aria-hidden className="absolute left-8 top-0 h-full w-0.5 bg-white/15 lg:hidden" />
      <span aria-hidden className="absolute top-9 hidden h-0.5 bg-white/15 lg:block" style={{ left: "2rem", right: RAIL_RIGHT }} />
      <span aria-hidden className="absolute top-9 hidden h-0.5 bg-secondary transition-all duration-700 lg:block" style={{ left: "2rem", width: `calc((100% - 2rem - ${RAIL_RIGHT}) * ${fill})` }} />
      <span aria-hidden className="absolute left-8 top-0 w-0.5 bg-secondary transition-all duration-700 lg:hidden" style={{ height: `${fill * 100}%` }} />

      {stops.map((s, i) => {
        const done = i < doneCount;
        const next = i === nextIndex;
        const last = i === stops.length - 1;
        const d = new Date(s.date + "T00:00:00");
        return (
          <li key={s.date} className="relative flex items-start gap-5 lg:flex-col lg:gap-4">
            <div
              className={`relative z-10 w-16 shrink-0 overflow-hidden rounded-2xl text-center shadow-lg transition ${
                next ? "bg-white ring-4 ring-secondary" : last ? "bg-secondary" : done ? "bg-white/70" : "bg-white"
              }`}
            >
              <div className={`py-1 text-xs font-medium ${last ? "bg-field/30 text-white" : "bg-primary text-white"}`}>
                {d.toLocaleDateString("en-US", { month: "short" })}
              </div>
              <div className={`pb-1 pt-1 font-slab text-2xl font-semibold leading-none ${last ? "text-white" : "text-field"}`}>
                {d.getDate()}
                {s.end && `–${new Date(s.end + "T00:00:00").getDate()}`}
              </div>
              <div className={`pb-1.5 text-[11px] ${last ? "text-white/80" : "text-muted"}`}>{d.getFullYear()}</div>
              {done && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white" aria-hidden>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12l5 5L20 7" /></svg>
                </span>
              )}
            </div>
            <div className="pt-1 lg:pt-0">
              {next && <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-white">Next</span>}
              <p className={`leading-snug ${last ? "font-slab text-lg font-semibold text-white" : done ? "text-white/55" : "text-white/90"}`}>
                {s.label}
              </p>
              {done && <span className="sr-only"> (passed)</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
