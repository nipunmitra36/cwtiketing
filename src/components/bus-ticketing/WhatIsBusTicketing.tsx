"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTicket,
  HiOutlineMap,
  HiOutlineCreditCard,
  HiOutlineViewGrid,
  HiOutlineSearch,
  HiOutlineCheckCircle,
  HiOutlineTemplate,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const passengerSteps: { icon: IconType; label: string }[] = [
  { icon: HiOutlineSearch, label: "Search routes by city and travel date, then compare the routes that fit." },
  { icon: HiOutlineViewGrid, label: "Select a seat from the live seat map." },
  { icon: HiOutlineCreditCard, label: "Pay online with a preferred payment method." },
  { icon: HiOutlineCheckCircle, label: "Receive the ticket instantly on the phone." },
];

const platformModules: { icon: IconType; label: string }[] = [
  { icon: HiOutlineTemplate, label: "Dashboard" },
  { icon: HiOutlineMap, label: "Routes" },
  { icon: HiOutlineCurrencyDollar, label: "Revenue" },
  { icon: HiOutlineChartBar, label: "Analytics" },
  { icon: HiOutlineUserGroup, label: "Drivers" },
  { icon: HiOutlineClipboardList, label: "Reports" },
];

const features: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineTicket,
    title: "Online Booking Engine",
    desc: "This engine lets a passenger search routes, compare available buses by bus type, check seat availability and finish ticket booking in a few taps. Each booking is confirmed instantly, and the ticket reaches the passenger by SMS or email.",
  },
  {
    icon: HiOutlineMap,
    title: "Route and Seat Management",
    desc: "Route management and route scheduling help you create routes, set stops, fares and departure times, and assign buses. Seat selection shows a live seat map, and bus inventory stays correct across web, app and counter bookings, so seat availability stays accurate and a seat is never sold twice.",
  },
  {
    icon: HiOutlineCreditCard,
    title: "Payment Integration",
    desc: "Accept payments through the gateways your passengers already use. A bus booking API connects payments, SMS and maps, so ticket reservations are paid and confirmed in a single flow.",
  },
  {
    icon: HiOutlineViewGrid,
    title: "Operator Dashboard",
    desc: "Bus operators see bus bookings, revenue and booking trends in one place, and can tell which routes earn the most. Passenger management tools keep passenger details and passenger records organised, and handle refunds and rescheduling in a few clicks.",
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
            className="mx-auto mt-3 max-w-2xl text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            What Is <span className="text-gradient-brand">Bus Reservation Software?</span>
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            Bus reservation software is a cloud-based platform that runs the
            whole booking process: ticket sale, seat choice, payment, ticket
            delivery and ticket cancellation. CWTicketing is built for bus
            operators, transportation companies and marketplace owners who want
            online ticket booking without building a bus booking system from
            scratch.
          </p>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            It also suits a travel agency that resells seats from several bus
            companies. Because the platform is online, every booking, ticket and
            passenger record updates in real time, and seat availability is
            always accurate for bus travel across all your routes.
          </p>
        </div>

        {/* Numbered feature blurbs */}
        <h2
          data-gsap
          className="mx-auto mt-14 max-w-3xl text-center text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px] sm:leading-snug"
        >
          Core Features of{" "}
          <span className="text-gradient-brand">Our Platform</span>
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                data-gsap
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 text-[15px] font-medium tracking-tight text-text-dark">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-relaxed text-text-muted">{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* From search to ticket — flow rail */}
        <div className="mt-16 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 sm:p-10">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 data-gsap className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              How Passengers Complete{" "}
              <span className="text-gradient-brand">Bus Ticket Booking</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
            {/* Passenger rail */}
            <div data-gsap>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                Passenger
              </span>
              <div className="space-y-2.5">
                {passengerSteps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[13px] font-medium leading-snug text-text-dark">
                        {i + 1}. {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider arrow */}
            <div data-gsap className="hidden justify-center lg:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand">
                <HiOutlineTicket className="h-5 w-5" />
              </span>
            </div>

            {/* CWTicketing Platform panel */}
            <div
              data-gsap
              className="rounded-3xl border border-brand/20 bg-brand-light/30 p-5"
            >
              <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-brand">
                CWTicketing Platform
              </p>
              <div className="grid grid-cols-2 gap-2">
                {platformModules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-2.5 py-2"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="truncate text-[11px] font-semibold text-text-dark">
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
