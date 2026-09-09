"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineLocationMarker,
  HiOutlineCash,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const pillars: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineCube,
    title: "Book",
    desc: "Register the parcel, weigh it, price it and print a barcoded waybill at any branch.",
  },
  {
    icon: HiOutlineTruck,
    title: "Move",
    desc: "Route it through hubs and branches, assign it to a vehicle, and hand it to a rider.",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Track",
    desc: "Every scan updates one status trail that staff and customers can both see.",
  },
  {
    icon: HiOutlineCash,
    title: "Settle",
    desc: "Collect cash on delivery, reconcile branch accounts and close the books daily.",
  },
];

const problems = [
  "Parcels logged in notebooks and spreadsheets that never reconcile",
  "Customers calling the branch because there is no way to track a shipment",
  "Cash on delivery collected but not matched against the parcel that earned it",
  "No reliable record of which rider or branch last held a missing consignment",
];

export default function WhatIsParcelSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-is-parcel-management"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              What Is a{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Parcel Management System?
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            A parcel management system is software that records every parcel
            from the moment it is booked until it is delivered and paid for —
            handling waybills, branch and hub transfers, rider assignment,
            live tracking, customer notifications and cash-on-delivery
            settlement in one place. CW Ticketing&apos;s parcel management
            solution gives courier companies, transport operators and
            logistics businesses that single source of truth.
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
              Most parcel operations do not fail because of the delivery — they
              fail because of the paperwork around it.
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
