"use client";

import { useSyncExternalStore } from "react";

// Ticks once a second; the server render gets null so the static HTML never disagrees with the browser
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1000);

export default function Countdown({ startsAt, endsAt, label }: { startsAt: string; endsAt: string; label: string }) {
  const now = useSyncExternalStore(subscribe, nowSeconds, () => null);

  const start = Date.parse(startsAt) / 1000;
  const end = Date.parse(endsAt) / 1000;
  if (now !== null && now > end) return null;

  const live = now !== null && now >= start;
  const left = now === null ? null : Math.max(0, start - now);
  const units = [
    { label: "Days", value: left === null ? null : Math.floor(left / 86400) },
    { label: "Hours", value: left === null ? null : Math.floor((left % 86400) / 3600) },
    { label: "Minutes", value: left === null ? null : Math.floor((left % 3600) / 60) },
    { label: "Seconds", value: left === null ? null : left % 60 },
  ];
  const pad = (n: number | null, i: number) => (n === null ? "--" : i === 0 ? String(n) : String(n).padStart(2, "0"));
  const opens = new Date(startsAt).toLocaleString("en-GB", {
    day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Colombo",
  });

  return (
    <div className="flex flex-col gap-6 bg-field px-6 py-7 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="font-slab text-xl font-semibold">{live ? `${label} is under way` : `${label} opens in`}</p>
        <p className="mt-1 text-sm text-white/70">{live ? "Welcome to Belihuloya." : `${opens} (Sri Lanka time)`}</p>
      </div>
      {!live && (
        <div
          role="timer"
          aria-label={left === null ? `Countdown to ${label}` : `${units[0].value} days until ${label} opens`}
          className="grid grid-cols-4 gap-2 sm:gap-3"
        >
          {units.map((u, i) => (
            <div key={u.label} aria-hidden className="min-w-[4.25rem] rounded-2xl bg-white/10 px-3 py-3 text-center ring-1 ring-white/15 sm:min-w-20">
              <span className="block font-slab text-3xl font-semibold tabular-nums leading-none sm:text-4xl">{pad(u.value, i)}</span>
              <span className="mt-1.5 block text-xs text-white/65">{u.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
