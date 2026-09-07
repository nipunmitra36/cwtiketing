"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTicket,
  HiOutlineClipboardCheck,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Group {
  icon: IconType;
  title: string;
  subtitle: string;
  items: string[];
}

const groups: Group[] = [
  {
    icon: HiOutlineTicket,
    title: "Booking Experience",
    subtitle: "For passengers",
    items: ["Online booking", "Seat selection", "Customer portal"],
  },
  {
    icon: HiOutlineClipboardCheck,
    title: "Operations",
    subtitle: "For your team",
    items: ["Route management", "Driver panel", "Schedule management"],
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Revenue",
    subtitle: "For your business",
    items: ["Dynamic pricing", "Payments", "Coupons"],
  },
  {
    icon: HiOutlineTrendingUp,
    title: "Growth",
    subtitle: "For scaling up",
    items: ["Analytics", "Reports", "Mobile apps"],
  },
];

export default function CapabilityGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="everything-you-need"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Capabilities
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Everything You Need, Grouped by Job
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Sixteen capabilities, organized around the four things operators
            actually manage.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                data-gsap
                className="group flex flex-col rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-medium tracking-tight text-text-dark">{g.title}</h3>
                <p className="mt-0.5 text-[11.5px] font-medium uppercase tracking-wide text-brand/70">
                  {g.subtitle}
                </p>
                <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  {g.items.map((item) => (
                    <li key={item} className="text-[13px] leading-snug text-text-body">
                      {item}
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
