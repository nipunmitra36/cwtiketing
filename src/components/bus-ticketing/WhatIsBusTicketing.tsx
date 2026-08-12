"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineSearch,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineCreditCard,
  HiOutlineViewGrid,
  HiOutlineChartBar,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const whoUses = [
  "Bus operators",
  "Transport companies",
  "Travel agencies",
  "Shuttle operators",
  "Intercity bus companies",
  "Public transportation companies",
  "Ticket marketplaces",
  "Fleet management companies",
  "Tourism companies",
];

const howItWorks: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineSearch,
    title: "How passengers book tickets",
    desc: "Passengers search routes, compare buses, pick a seat and pay online from a phone or computer.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "How operators manage bookings",
    desc: "Operators schedule departures, assign vehicles, set fares and watch seat inventory update live.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "How agents sell tickets",
    desc: "Counter and field agents issue tickets and collect payments from the same shared seat inventory.",
  },
  {
    icon: HiOutlineCreditCard,
    title: "How payments work",
    desc: "Payments flow through integrated gateways — cards, wallets, banking and cash — into one record.",
  },
  {
    icon: HiOutlineViewGrid,
    title: "How seats are managed",
    desc: "Live seat maps prevent double bookings and keep availability synchronized on every channel.",
  },
  {
    icon: HiOutlineChartBar,
    title: "How reports are generated",
    desc: "Sales, revenue, occupancy and channel reports are generated automatically in real time.",
  },
];

export default function WhatIsBusTicketing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-is-a-bus-ticketing-system"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Understanding Bus Ticketing
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            What Is a Bus Ticketing System?
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            A bus ticketing system is software that lets transport operators sell,
            manage and validate bus tickets online and offline. It brings routes,
            departure schedules, seat plans, bookings, payments and passenger
            records into one platform — so staff, agents and passengers always see
            the same live availability.
          </p>
        </div>

        {/* Who uses it */}
        <div data-gsap className="mx-auto mt-10 max-w-4xl">
          <p className="text-center text-[13px] font-semibold text-text-dark">
            Who uses it?
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {whoUses.map((w) => (
              <span
                key={w}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[12.5px] font-medium text-text-body transition-colors hover:border-brand/30 hover:text-brand"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* How it works grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {howItWorks.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                data-gsap
                className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[15px] font-medium tracking-tight text-text-dark">
                  {h.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
