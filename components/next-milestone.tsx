"use client";

import { useSyncExternalStore } from "react";

type Milestone = { date: string; label: string };

const DAY = 86_400_000;
const noop = () => () => {};
const upcoming = (items: Milestone[], now: number) =>
  items.find((m) => new Date(m.date + "T23:59:59").getTime() >= now);

function when(date: string, now: number) {
  const days = Math.ceil((new Date(date + "T00:00:00").getTime() - now) / DAY);
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

// Shows the next date in the timeline. The build-time value renders first; the visitor's clock then corrects it.
export default function NextMilestone({ items, buildTime }: { items: Milestone[]; buildTime: number }) {
  // Server render uses the build time; the browser reads its own clock (rounded to the minute so it stays stable)
  const now = useSyncExternalStore(
    noop,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => buildTime,
  );

  const next = upcoming(items, now);
  if (!next) return null;

  return (
    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-white/10 py-2 pl-2 pr-5 text-sm text-white ring-1 ring-white/20 backdrop-blur">
      <span className="rounded-full bg-secondary px-3 py-1 font-medium">Next</span>
      <span>
        {next.label}: <strong className="font-semibold">{fmt(next.date)}</strong>
        <span className="text-white/70"> ({when(next.date, now)})</span>
      </span>
    </p>
  );
}
