"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineLocationMarker,
  HiOutlineCreditCard,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const pillars: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineDeviceMobile,
    title: "Book",
    desc: "Riders book instantly or schedule ahead from an app, your website, or a call to the desk.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Dispatch",
    desc: "The nearest available driver is matched automatically — or assigned by hand when you prefer.",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Track",
    desc: "Live GPS follows the trip from pickup to drop-off, for the rider and the control room alike.",
  },
  {
    icon: HiOutlineCreditCard,
    title: "Settle",
    desc: "Fares are metered, payments captured, and driver commission calculated without spreadsheets.",
  },
];

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
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Online Taxi Booking System?
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            An online taxi booking system is software that manages the full
            ride cycle — a passenger requests a trip, the system dispatches the
            nearest driver, tracks the journey by GPS, calculates the fare, and
            records payment and driver commission. CW Ticketing&apos;s taxi
            booking software brings booking, dispatch, fleet, drivers and
            accounts together in one online taxi management system.
          </p>
        </div>

        {/* ── Four pillars ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[76px] font-black leading-none tracking-tighter text-brand/10 transition-colors duration-300 group-hover:text-brand/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 text-[16px] font-semibold tracking-tight text-text-dark">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-text-muted">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ── Problems it solves ── */}
        <div className="mt-14 grid gap-8 rounded-[2rem] border border-gray-100 bg-gray-50/60 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-10">
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
