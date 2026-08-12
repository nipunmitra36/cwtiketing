"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineStar } from "react-icons/hi";

interface Story {
  initial: string;
  name: string;
  team: string;
  quote: string;
}

const stories: Story[] = [
  {
    initial: "B",
    name: "Busbora",
    team: "Operations team · Tanzania",
    quote:
      "CW Ticketing brought our booking, seat management and sales processes into one system — our counters and agents finally see the same seat map.",
  },
  {
    initial: "R",
    name: "Rakaab",
    team: "Operations team · Somaliland",
    quote:
      "Automated booking and POS sales cut the time our staff spend on manual reservations, so more of the day goes to running routes on time.",
  },
  {
    initial: "R",
    name: "Rojos de Colima",
    team: "Operations team · Mexico",
    quote:
      "Passengers can now see live seat availability before they arrive, which has made the counter experience calmer for everyone.",
  },
];

export default function OperatorStories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.12 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operator-stories"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Operator Stories
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Loved by the teams running routes every day
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {stories.map((s) => (
            <figure
              key={s.name}
              data-gsap
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
            >
              {/* Quote mark */}
              <span className="pointer-events-none absolute -top-4 right-5 select-none text-[88px] font-serif leading-none text-brand/10 transition-colors duration-300 group-hover:text-brand/20">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiOutlineStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 text-[15px] font-medium leading-relaxed text-text-body">
                {s.quote}
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-[16px] font-bold text-white shadow-md shadow-brand/25">
                  {s.initial}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-text-dark">{s.name}</span>
                  <span className="block text-[12px] text-text-muted">{s.team}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
