"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/Who Benefits from Our Inter-City Bus Ticketing System";

const smartFeatures: { image: string; label: string }[] = [
  { image: `${MEDIA}/Bus Operators-01.svg`, label: "Route Optimization" },
  { image: `${MEDIA}/Travel & Tourism-01.svg`, label: "Long-Haul Fleet Scheduling" },
  { image: `${MEDIA}/transportation & Logistics-01.svg`, label: "Intercity Stop Management" },
  { image: `${MEDIA}/Hospitality & Hotels-01.svg`, label: "Passenger Reports & Analytics" },
  { image: `${MEDIA}/Event Management-01.svg`, label: "Partner Commission Settings" },
  { image: `${MEDIA}/Courier & Parcel Services-01.svg`, label: "SMS & Email Trip Notifications" },
];

export default function OperatorControl() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.07 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Network diagram ── */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div data-gsap className="mx-auto w-full max-w-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/bus-operators/Take Control of Long Distance Bus Operations.png"
              alt="Diagram of a centralized bus ticketing system connecting operators, terminals, agents, and passengers"
              loading="lazy"
              className="mx-auto h-auto w-full object-contain"
            />
          </div>

          {/* ── Copy ── */}
          <div data-gsap>
            <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
              Take Control of Long-Distance Bus Operations
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CWTicketing gives intercity bus operators the tools to run
              smarter, faster, and more efficiently. Easily manage routes
              across cities, track fleet performance, set dynamic pricing, and
              customize commissions from one place. Grow your reach, attract
              more passengers, and keep your operations running smoothly.
            </p>
          </div>
        </div>

        {/* ── Smart Features grid ── */}
        <div id="smart-features" className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Smart Features for Efficient Intercity Management
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {smartFeatures.map((f) => (
              <div
                key={f.label}
                data-gsap
                className="group relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />

                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-light p-2 transition-transform duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image}
                    alt={f.label}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>

                <p className="text-[15.5px] font-semibold leading-snug tracking-tight text-text-dark">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
