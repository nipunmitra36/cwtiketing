"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTruck,
  HiOutlineGlobe,
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineCube,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const audiences: { icon: IconType; label: string }[] = [
  { icon: HiOutlineTruck, label: "Bus Operators" },
  { icon: HiOutlineGlobe, label: "Travel & Tourism" },
  { icon: HiOutlineCalendar, label: "Event Management" },
  { icon: HiOutlineOfficeBuilding, label: "Hospitality & Hotels" },
  { icon: HiOutlineCube, label: "Courier & Parcel Services" },
  { icon: HiOutlineSwitchHorizontal, label: "Transportation & Logistics" },
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.label}
                data-gsap
                className="group flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-[15px] font-medium tracking-tight text-text-dark">{a.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
