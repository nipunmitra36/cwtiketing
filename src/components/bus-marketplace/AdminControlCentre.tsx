"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineUserAdd,
  HiOutlineChartBar,
  HiOutlineTemplate,
  HiOutlineScale,
  HiOutlineCurrencyDollar,
  HiOutlineSupport,
  HiOutlineUserGroup,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const controls: { icon: IconType; label: string }[] = [
  { icon: HiOutlineUserAdd, label: "Operator Onboarding" },
  { icon: HiOutlineChartBar, label: "Analytics & Reports" },
  { icon: HiOutlineTemplate, label: "Content Management System" },
  { icon: HiOutlineScale, label: "Dispute Resolution" },
  { icon: HiOutlineCurrencyDollar, label: "Commission Management" },
  { icon: HiOutlineSupport, label: "Support Center" },
  { icon: HiOutlineUserGroup, label: "Company Agent Management" },
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
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              End-to-End Control for{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Marketplace Owners
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            CWTicketing helps you streamline and scale your bus ticketing
            marketplace with ease. Onboard bus operators, set up routes and
            schedules, manage bookings, track sales in real time, and monitor
            system performance — all from one central dashboard. Built for
            marketplace owners and system administrators to automate daily
            tasks, reduce manual work, and grow their network confidently.
          </p>
        </div>

        {/* ── Control centre grid ── */}
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
            Platform Management &amp; Control Centre
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {controls.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                data-gsap
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-brand/10"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-black tracking-widest text-gray-300 transition-colors group-hover:text-brand/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-[13.5px] font-medium leading-snug text-text-dark">{c.label}</p>
                <span className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-amber-400 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
