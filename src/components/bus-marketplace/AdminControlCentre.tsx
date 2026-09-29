"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const MEDIA = "/media/cwticketing travel agency/icons";

const controls: { image: string; label: string }[] = [
  { image: `${MEDIA}/operator-onboarding.svg`, label: "Operator Onboarding" },
  { image: `${MEDIA}/analytics-&-reports.svg`, label: "Analytics & Reports" },
  { image: `${MEDIA}/content-management.svg`, label: "Content Management System" },
  { image: `${MEDIA}/dispute-resolution-01.svg`, label: "Dispute Resolution" },
  { image: `${MEDIA}/commission-management.svg`, label: "Commission Management" },
  { image: `${MEDIA}/support-center.svg`, label: "Support Center" },
  { image: `${MEDIA}/agent-management.svg`, label: "Company Agent Management" },
];

export default function AdminControlCentre() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.06 });
  }, []);

  return (
    <section
      id="control-centre"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header with section image (image right) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-2 lg:order-1">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              End-to-End Control for{" "}
              <span className="text-gradient-brand">
                Marketplace Owners
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CWTicketing helps you streamline and scale your bus ticketing
              marketplace with ease. Onboard bus operators, set up routes and
              schedules, manage bookings, track sales in real time, and monitor
              system performance — all from one central dashboard. Built for
              marketplace owners and system administrators to automate daily
              tasks, reduce manual work, and grow their network confidently.
            </p>
          </div>
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100 lg:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/cwticketing travel agency/end-to-end-control-for-marketplace-owners.jpg"
              alt="End-to-end control for marketplace owners"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
        </div>

        {/* ── Control centre grid ── */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
            Platform Management &amp; Control Centre
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {controls.map((c) => (
            <div
              key={c.label}
              data-gsap
              className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2.5 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.label} loading="lazy" className="h-full w-full object-contain" />
              </span>
              <span className="text-[13.5px] font-semibold leading-snug tracking-tight text-text-dark">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
