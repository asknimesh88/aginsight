"use client";

import { useEffect, useRef, useState } from "react";

type Year = { year: string; images: string[] };

const BLOCK = 10; // two 2×2 tiles + eight 1×1 tiles fill a 4×4 block exactly
const isBig = (i: number) => i % BLOCK === 0 || i % BLOCK === 7;
const thumb = (y: string, f: string) => `/gallery/${y}/thumb/${f}`;
const full = (y: string, f: string) => `/gallery/${y}/${f}`;

export default function Gallery({ years }: { years: Year[] }) {
  const [active, setActive] = useState(years[0].year);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<{ year: string; i: number } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);

  // Highlight the year tab for the section in view
  useEffect(() => {
    const onScroll = () => {
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      const passed = years.filter((y) => document.getElementById(`y${y.year}`)!.getBoundingClientRect().top < innerHeight / 3);
      setActive((atBottom ? years.at(-1) : passed.at(-1) ?? years[0])!.year);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [years]);

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
  }, [open]);

  const current = open && years.find((y) => y.year === open.year)!;
  const step = (d: number) =>
    setOpen((o) => o && { ...o, i: (o.i + d + current!.images.length) % current!.images.length });

  return (
    <>
      {/* Year tabs */}
      <nav className="sticky top-18 z-30 border-b border-black/5 bg-white/95 backdrop-blur" aria-label="Years">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {years.map((y) => (
            <a
              key={y.year}
              href={`#y${y.year}`}
              aria-current={active === y.year ? "true" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-medium transition-colors ${
                active === y.year ? "bg-field text-white" : "bg-leaf text-field hover:bg-primary/15"
              }`}
            >
              {y.year}
              <span className={`text-sm ${active === y.year ? "text-white/70" : "text-muted"}`}>{y.images.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4">
        {years.map((y) => {
          const shown = expanded[y.year] ? y.images : y.images.slice(0, BLOCK);
          return (
            <section key={y.year} id={`y${y.year}`} className="scroll-mt-36 border-b border-black/5 py-20 last:border-0">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-slab text-5xl font-semibold tracking-tight text-field sm:text-6xl">{y.year}</h2>
                  <p className="mt-2 text-lg text-muted">AgInsight {y.year}, {y.images.length} photos</p>
                </div>
              </div>

              <ul className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4">
                {shown.map((f, i) => (
                  <li key={f} className={isBig(i) ? "col-span-2 row-span-2" : ""}>
                    <button
                      onClick={() => setOpen({ year: y.year, i })}
                      className="group block h-full w-full overflow-hidden rounded-2xl bg-leaf"
                      aria-label={`Open photo ${i + 1} of ${y.images.length} from AgInsight ${y.year}`}
                    >
                      <img
                        src={isBig(i) ? full(y.year, f) : thumb(y.year, f)}
                        alt=""
                        loading="lazy"
                        className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              {y.images.length > BLOCK && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setExpanded((e) => ({ ...e, [y.year]: !e[y.year] }))}
                    className="rounded-full border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    {expanded[y.year] ? "Show fewer photos" : `Show all ${y.images.length} photos`}
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => (e.key === "ArrowRight" ? step(1) : e.key === "ArrowLeft" && step(-1))}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/95 p-0 text-white backdrop:bg-black/80"
      >
        {current && open && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm text-white/70">
                AgInsight {current.year}
                <span className="ml-3 text-white">{open.i + 1} / {current.images.length}</span>
              </p>
              <button
                onClick={() => dialog.current?.close()}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Close"
                autoFocus
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <img
                key={open.i}
                src={full(current.year, current.images[open.i])}
                alt={`AgInsight ${current.year} photo ${open.i + 1}`}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
              {[
                { d: -1, label: "Previous photo", side: "left-2 sm:left-5", path: "M15 6l-6 6 6 6" },
                { d: 1, label: "Next photo", side: "right-2 sm:right-5", path: "M9 6l6 6-6 6" },
              ].map((b) => (
                <button
                  key={b.d}
                  onClick={() => step(b.d)}
                  aria-label={b.label}
                  className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/25 sm:flex ${b.side}`}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={b.path} /></svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
