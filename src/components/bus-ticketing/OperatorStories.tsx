"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineArrowRight } from "react-icons/hi";

const story = {
  name: "Asante Rabi Express",
  country: "Tanzania",
  type: "Bus",
  logo: "/media/client/asante-rabi-express.webp",
  before: "Old manual booking",
  statValue: "40%",
  statLabel: "more online bookings",
  quote: "We stopped losing seats to phone-line bottlenecks in the first month.",
};

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
      id="case-studies"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Case Studies
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Operators Who <span className="text-gradient-brand">Made the Switch</span>
          </h2>
        </div>

        <figure
          data-gsap
          className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50/60 p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-text-dark">{story.name}</span>
                <span className="block text-[12px] text-text-muted">
                  {story.country} · {story.type}
                </span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-text-muted">
                Before: {story.before}
              </span>
              <HiOutlineArrowRight className="hidden h-4 w-4 shrink-0 text-brand sm:block" />
              <span className="flex items-baseline gap-1.5 whitespace-nowrap rounded-full bg-brand px-3 py-1.5 text-white shadow-md shadow-brand/25">
                <span className="text-[16px] font-bold leading-none">{story.statValue}</span>
                <span className="text-[11.5px] font-medium">{story.statLabel}</span>
              </span>
            </div>
          </div>

          <blockquote className="mt-7 text-[18px] font-medium leading-relaxed text-text-body sm:text-[20px]">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
