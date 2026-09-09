"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTruck,
  HiOutlineGlobeAlt,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineHome,
  HiOutlineBadgeCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const audiences: { icon: IconType; label: string; highlight: string }[] = [
  {
    icon: HiOutlineTruck,
    label: "Taxi & Cab Companies",
    highlight: "Replace radio dispatch with automatic matching",
  },
  {
    icon: HiOutlineGlobeAlt,
    label: "Ride-Hailing Startups",
    highlight: "Launch a branded platform without building from zero",
  },
  {
    icon: HiOutlineBadgeCheck,
    label: "Airport Transfer Services",
    highlight: "Scheduled pickups with flight-time buffers",
  },
  {
    icon: HiOutlineBriefcase,
    label: "Corporate Employee Transport",
    highlight: "Account billing and monthly invoicing",
  },
  {
    icon: HiOutlineHome,
    label: "Hotels & Resorts",
    highlight: "Guest transfers booked straight from the front desk",
  },
  {
    icon: HiOutlineOfficeBuilding,
    label: "Limo & Chauffeur Fleets",
    highlight: "Premium vehicle classes with fixed-rate routes",
  },
];

export default function WhoUses() {
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
              Who Uses Our{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Online Taxi Management System
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Whether you run five cars or five hundred, the same platform adapts
            — from a local cab stand to a city-wide ride-hailing brand.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                data-gsap
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" />
                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" />

                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] font-medium tracking-tight text-text-dark">{a.label}</p>
                </div>

                <div className="my-5 border-t-2 border-dashed border-gray-200" />

                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12.5px] leading-snug text-text-muted">{a.highlight}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-text-muted transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <HiOutlineArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
