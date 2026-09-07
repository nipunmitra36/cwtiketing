"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineViewGrid, HiOutlineLightningBolt, HiOutlineCheck } from "react-icons/hi";
import type { IconType } from "react-icons";

interface System {
  icon: IconType;
  title: string;
  subtitle: string;
  items: string[];
}

const systems: System[] = [
  {
    icon: HiOutlineViewGrid,
    title: "Bus Ticketing Marketplace",
    subtitle: "Connecting bus operators under one platform",
    items: [
      "Multi-Operator Management Dashboard",
      "Dynamic Pricing & Seat Plan Engine",
      "Real-Time Analytics & Reports",
      "POS-Compatible & QR-Based Ticketing",
      "Passenger Experience Tools",
    ],
  },
  {
    icon: HiOutlineLightningBolt,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
            Specialized Booking Systems
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {systems.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-gsap
                className="rounded-3xl border border-brand/20 bg-gradient-to-br from-brand-light/40 to-white p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[18px] font-medium tracking-tight text-text-dark">{s.title}</h3>
                <p className="mt-1.5 text-[13px] font-medium text-brand">{s.subtitle}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
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
