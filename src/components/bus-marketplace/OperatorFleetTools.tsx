"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/cwticketing-travel-agency/icons";

const tools: { image: string; label: string }[] = [
  { image: `${MEDIA}/business-dashboard.svg`, label: "Business Dashboard" },
  { image: `${MEDIA}/route-setup-management.svg`, label: "Route Setup / Management" },
  { image: `${MEDIA}/dynamic-pricing-engine.svg`, label: "Dynamic Pricing Engine" },
  { image: `${MEDIA}/fuel-management.svg`, label: "Fuel Management" },
  { image: `${MEDIA}/seat-plan-creator-01.svg`, label: "Dynamic Seat Plan Creator" },
  { image: `${MEDIA}/fleet-management-01.svg`, label: "Fleet Management" },
];

export default function OperatorFleetTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header with section image (image left) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/cwticketing-travel-agency/smart-tools-for-modern-bus-operators.jpg"
              alt="Smart tools for modern bus operators"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
          <div data-gsap className="order-2">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Smart Tools for{" "}
              <span className="text-gradient-brand">
                Modern Bus Operators
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CWTicketing connects you to a wider audience through a unified
              marketplace, giving you more ways to grow with less effort. Set up
              routes, adjust fares, track bookings in real time, and run your
              daily operations with ease. Get more visibility, fill more seats,
              and grow faster with a system built for modern bus operators.
            </p>
          </div>
        </div>

        {/* ── Numbered tool cards ── */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
            Operator Dashboard &amp; Fleet Management
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div
              key={t.label}
              data-gsap
              className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={t.label} loading="lazy" className="h-full w-full object-contain" />
              </span>
              <span className="text-[13.5px] font-semibold leading-snug tracking-tight text-text-dark">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
