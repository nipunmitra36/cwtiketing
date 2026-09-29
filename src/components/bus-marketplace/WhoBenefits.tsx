"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/cwticketing travel agency/icons";

const audiences: { image: string; label: string }[] = [
  { image: `${MEDIA}/transportation-&-logistics-01.svg`, label: "Transportation & Logistics" },
  { image: `${MEDIA}/travel-&-tourism-01.svg`, label: "Travel & Tourism" },
  { image: `${MEDIA}/event-management.svg`, label: "Event Management" },
  { image: `${MEDIA}/courier-&-parcel-services.svg`, label: "Courier & Parcel Services" },
  { image: `${MEDIA}/government-&-public-servicesicon.svg`, label: "Government & Public Services" },
  { image: `${MEDIA}/corporate-&-employee-commute.svg`, label: "Corporate & Employee Commute" },
];

export default function WhoBenefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.06 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Who Benefits from{" "}
              <span className="text-gradient-brand">
                Our Marketplace
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            A bus ticketing marketplace reaches far beyond intercity travel —
            here is who runs their ticketing on CWTicketing.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.label}
              data-gsap
              className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.label} loading="lazy" className="h-full w-full object-contain" />
              </span>
              <span className="text-[13.5px] font-semibold leading-snug tracking-tight text-text-dark">
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
