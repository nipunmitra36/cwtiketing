"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCheck } from "react-icons/hi";

const problems = [
  "Bookings taken on paper that nobody can trace an hour later",
  "Dispatchers calling drivers one by one to find who is free",
  "Fare disputes with no trip record, distance or timestamp to check",
  "Driver commission and cash settlement reconciled by hand each week",
];

export default function WhatIsTaxiSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-is-taxi-booking-system"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              What Is an{" "}
              <span className="text-gradient-brand">
                Online Taxi Booking System?
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            An online taxi booking system is software that manages the full
            ride cycle — a passenger requests a trip, the system dispatches the
            nearest driver, tracks the journey by GPS, calculates the fare, and
            records payment and driver commission. CWTicketing&apos;s taxi
            booking software brings booking, dispatch, fleet, drivers and
            accounts together in one online taxi management system.
          </p>
        </div>

        {/* ── Problems it solves ── */}
        <div className="grid gap-8 rounded-[2rem] border border-gray-100 bg-gray-50/60 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-10">
          <div data-gsap>
            <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-text-dark sm:text-[22px]">
              The problems it puts an end to
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">
              Most taxi businesses do not lose money on the driving — they lose
              it on the dispatching and the paperwork.
            </p>
          </div>
          <ul data-gsap className="grid gap-3 sm:grid-cols-2">
            {problems.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <HiOutlineCheck className="h-3 w-3" />
                </span>
                <span className="text-[12.5px] leading-snug text-text-body">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
