"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTruck,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiOutlineMap,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineTemplate,
  HiOutlineLocationMarker,
  HiOutlineScale,
  HiOutlineDocumentReport,
  HiOutlineCurrencyDollar,
  HiOutlineAdjustments,
  HiOutlineSupport,
  HiOutlineMail,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface HubNode {
  icon: IconType;
  label: string;
  style: React.CSSProperties;
}

const hubNodes: HubNode[] = [
  { icon: HiOutlineTruck, label: "Operators", style: { top: "0%", left: "4%" } },
  { icon: HiOutlineOfficeBuilding, label: "Terminals", style: { top: "0%", right: "4%" } },
  { icon: HiOutlineUserGroup, label: "Agents", style: { bottom: "0%", left: "4%" } },
  { icon: HiOutlineUsers, label: "Passengers", style: { bottom: "0%", right: "4%" } },
];

const smartFeatures: { icon: IconType; label: string }[] = [
  { icon: HiOutlineMap, label: "Route Optimization" },
  { icon: HiOutlineChartBar, label: "Analytics & Reports" },
  { icon: HiOutlineCalendar, label: "Long-Haul Fleet Scheduling" },
  { icon: HiOutlineTemplate, label: "Content Management System" },
  { icon: HiOutlineLocationMarker, label: "Intercity Stop Management" },
  { icon: HiOutlineScale, label: "Dispute Resolution" },
  { icon: HiOutlineDocumentReport, label: "Passenger Reports & Analytics" },
  { icon: HiOutlineCurrencyDollar, label: "Commission Management" },
  { icon: HiOutlineAdjustments, label: "Partner Commission Settings" },
  { icon: HiOutlineSupport, label: "Support Center" },
  { icon: HiOutlineMail, label: "SMS & Email Trip Notifications" },
];

export default function OperatorControl() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.07 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Network diagram ── */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div data-gsap className="mx-auto w-full max-w-[420px]">
            <p className="mb-6 text-center text-[13px] font-semibold uppercase tracking-widest text-brand lg:text-left">
              Designed for Large-Scale
              <br />
              Real-World Bus Operations
            </p>
            <div className="relative aspect-square w-full">
              <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                <line x1="200" y1="200" x2="70" y2="70" stroke="#FFB27A" strokeWidth="2" />
                <line x1="200" y1="200" x2="330" y2="70" stroke="#FFB27A" strokeWidth="2" />
                <line x1="200" y1="200" x2="70" y2="330" stroke="#FFB27A" strokeWidth="2" />
                <line x1="200" y1="200" x2="330" y2="330" stroke="#FFB27A" strokeWidth="2" />
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-center text-white shadow-2xl shadow-brand/40 sm:h-28 sm:w-28">
                <span className="text-[10px] font-bold uppercase leading-tight tracking-wide">CW</span>
                <span className="text-[10px] font-bold uppercase leading-tight tracking-wide">Ticketing</span>
              </div>

              {hubNodes.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.label}
                    style={n.style}
                    className="absolute z-10 flex w-[128px] items-center gap-2 rounded-2xl border border-white/60 bg-white/95 px-3 py-2.5 shadow-lg shadow-brand/10 backdrop-blur-xl"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="truncate text-[11.5px] font-semibold text-text-dark">{n.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-[13px] leading-relaxed text-text-muted">
              Connect routes, terminals, agents, and passengers, and grow
              seamlessly across regions.
            </p>
          </div>

          {/* ── Copy ── */}
          <div data-gsap>
            <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
              Take Control of Long-Distance Bus Operations
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CWTicketing gives intercity bus operators the tools to run
              smarter, faster, and more efficiently. Easily manage routes
              across cities, track fleet performance, set dynamic pricing, and
              customize commissions from one place. Grow your reach, attract
              more passengers, and keep your operations running smoothly.
            </p>
          </div>
        </div>

        {/* ── Smart Features grid ── */}
        <div id="smart-features" className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Smart Features for Efficient Intercity Management
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {smartFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-brand/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[13px] font-medium leading-snug text-text-dark">{f.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
