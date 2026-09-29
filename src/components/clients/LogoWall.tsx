"use client";

import { useEffect, useRef, useState } from "react";

interface ClientLogo {
  name: string;
  src: string;
}

interface LogoWallProps {
  logos: ClientLogo[];
  className?: string;
}

// Cards per column, left → right. Odd columns drop down half a card so the
// wall reads as a staggered wave. Each layout sums to 13 cards.
const LAYOUTS = {
  phone: [3, 4, 3, 3],
  tablet: [2, 2, 2, 1, 2, 2, 2],
  desktop: [2, 2, 1, 1, 1, 1, 1, 2, 2],
};

// Fixed shuffle so cards swap in a scattered order rather than left → right
const SWAP_ORDER = [4, 9, 1, 11, 6, 0, 8, 3, 12, 5, 10, 2, 7];
const TICK_MS = 450;

function LogoCard({ pair, tick, order }: { pair: ClientLogo[]; tick: number; order: number }) {
  // Each card flips once every SWAP_ORDER.length ticks, at its own offset
  const cycle = SWAP_ORDER.length;
  const active = pair.length > 1 ? Math.floor((tick + cycle - order) / cycle) % 2 : 0;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_10px_24px_-14px_rgba(16,24,40,0.18)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_32px_-14px_rgba(16,24,40,0.25)] sm:rounded-2xl">
      {pair.map((logo, i) => {
        const shown = i === active;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={logo.src}
            src={logo.src}
            alt={logo.name}
            title={logo.name}
            loading="lazy"
            aria-hidden={!shown}
            className={`absolute inset-0 m-auto h-full w-full object-contain p-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:blur-none sm:p-3 lg:p-4 ${shown
              ? "translate-y-0 opacity-100 blur-0"
              : i < active
                ? "-translate-y-4 opacity-0 blur-[2px]"
                : "translate-y-4 opacity-0 blur-[2px]"
              }`}
          />
        );
      })}
    </div>
  );
}

function Wall({
  columns,
  pairs,
  tick,
  className,
}: {
  columns: number[];
  pairs: ClientLogo[][];
  tick: number;
  className: string;
}) {
  // Index of the first card in each column
  const starts = columns.map((_, col) => columns.slice(0, col).reduce((a, b) => a + b, 0));
  return (
    <div className={`items-start ${className}`}>
      {columns.map((count, col) => {
        const first = starts[col];
        const cards = pairs.slice(first, first + count).map((pair, j) => ({ pair, index: first + j }));
        return (
          <div key={col} className="flex min-w-0 flex-1 flex-col gap-[inherit]">
            {/* Half-card spacer staggers every other column */}
            {col % 2 === 0 && <div aria-hidden className="aspect-[2/1] w-full" />}
            {cards.map(({ pair, index }) => (
              <LogoCard key={index} pair={pair} tick={tick} order={SWAP_ORDER.indexOf(index)} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function LogoWall({ logos, className = "" }: LogoWallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  // Card k shows logos[k] and logos[k + 13]; with fewer than 26 logos the
  // trailing cards simply hold a single, static logo.
  const cardCount = LAYOUTS.desktop.reduce((a, b) => a + b, 0);
  const pairs = Array.from({ length: cardCount }, (_, k) =>
    [logos[k], logos[k + cardCount]].filter(Boolean)
  ).filter((p) => p.length > 0);

  // Only animate while the wall is on screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !timer) {
        timer = setInterval(() => setTick((t) => t + 1), TICK_MS);
      } else if (!entry.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div ref={ref} data-gsap className={`mx-auto w-full max-w-5xl lg:max-w-6xl ${className}`}>
      <Wall columns={LAYOUTS.phone} pairs={pairs} tick={tick} className="flex gap-2.5 sm:hidden" />
      <Wall columns={LAYOUTS.tablet} pairs={pairs} tick={tick} className="hidden gap-3 sm:flex lg:hidden" />
      <Wall columns={LAYOUTS.desktop} pairs={pairs} tick={tick} className="hidden gap-4 lg:flex" />
    </div>
  );
}
