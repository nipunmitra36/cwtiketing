"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineLightningBolt,
  HiOutlineViewGrid,
  HiOutlineCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface System {
  icon: IconType;
  title: string;
  subtitle: string;
  items: string[];
}

const systems: System[] = [
  {
    icon: HiOutlineLightningBolt,
    title: "Intercity Bus Booking System",
    subtitle: "Long-distance travel made simple",
    items: [
      "Multi-city route planning",
      "Advanced seat selection",
      "Meal & amenity booking",
      "Real-time GPS tracking",
      "Flexible cancellation policy",
    ],
  },
  {
    icon: HiOutlineViewGrid,
    title: "Shuttle Service Booking System",
    subtitle: "Short-distance & frequent routes",
    items: [
      "Frequent schedule management",
      "Quick boarding passes",
      "Corporate account integration",
      "Subscription-based booking",
      "Airport/hotel partnerships",
    ],
  },
];

export default function SpecializedSystems() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Specialized{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Booking Systems
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            The same marketplace powers everything from long-distance networks
            to frequent short-haul routes — ready when you are.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {systems.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-light/40 to-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand to-amber-400 opacity-60" />
                <span className="pointer-events-none absolute -right-10 -top-10 text-[120px] font-black leading-none text-brand/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand/70">
                    {String(i + 1).padStart(2, "0")}
                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <h3 className="relative mt-5 text-[18px] font-medium tracking-tight text-text-dark">{s.title}</h3>
                <p className="relative mt-1.5 text-[13px] font-medium text-brand">{s.subtitle}</p>

                <ul className="mt-6 space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                        <HiOutlineCheck className="h-3 w-3" />
                      </span>
                      <span className="text-[13.5px] leading-snug text-text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
