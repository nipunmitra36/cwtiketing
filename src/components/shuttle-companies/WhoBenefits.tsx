"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineOfficeBuilding,
  HiOutlineHeart,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineMap,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const audiences: { icon: IconType; label: string; highlight: string }[] = [
  {
    icon: HiOutlineOfficeBuilding,
    label: "City Bus Operators",
    highlight: "Passenger Manifest",
  },
  {
    icon: HiOutlineHeart,
    label: "Hospital Staff Transport",
    highlight: "Route & Schedule Access",
  },
  {
    icon: HiOutlineUsers,
    label: "Community Shuttle Services",
    highlight: "E-Ticket Printing & SMS Confirmation",
  },
  {
    icon: HiOutlineAcademicCap,
    label: "School Transport",
    highlight: "Booking by Cash, Card, or QR Code",
  },
  {
    icon: HiOutlineBriefcase,
    label: "Office Shuttles",
    highlight: "POS-Compatible Interface",
  },
  {
    icon: HiOutlineMap,
    label: "Suburban Routes",
    highlight: "Flexible, Frequent Local Schedules",
  },
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
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Who Benefits from Our{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Shuttle Service Ticketing System
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            From city bus operators to suburban routes, every local service gets
            the ticketing tools it needs to run smoother and faster.
          </p>
        </div>

        {/* ── Ticket cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                data-gsap
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                {/* ticket notches */}
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" />
                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" />

                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[15px] font-medium tracking-tight text-text-dark">{a.label}</p>
                </div>

                {/* perforated divider */}
                <div className="my-5 border-t-2 border-dashed border-gray-300" />

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