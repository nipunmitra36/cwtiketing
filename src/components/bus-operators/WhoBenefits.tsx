"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/Who Benefits from Our Inter-City Bus Ticketing System";

const audiences: { image: string; label: string }[] = [
  { image: `${MEDIA}/Bus Operators-01.svg`, label: "Bus Operators" },
  { image: `${MEDIA}/Travel & Tourism-01.svg`, label: "Travel & Tourism" },
  { image: `${MEDIA}/Event Management-01.svg`, label: "Event Management" },
  { image: `${MEDIA}/Hospitality & Hotels-01.svg`, label: "Hospitality & Hotels" },
  { image: `${MEDIA}/Courier & Parcel Services-01.svg`, label: "Courier & Parcel Services" },
  { image: `${MEDIA}/transportation & Logistics-01.svg`, label: "Transportation & Logistics" },
];

export default function WhoBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
            Who Benefits from Our Inter-City Bus Ticketing System
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.label}
              data-gsap
              className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />

              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={a.label}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </span>

              <p className="text-[15px] font-semibold leading-snug tracking-tight text-text-dark">
                {a.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
