"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineSearch,
  HiOutlineTruck,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineTicket,
  HiOutlineQrcode,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Step {
  num: string;
  icon: IconType;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: "1",
    icon: HiOutlineSearch,
    title: "Search Routes",
    desc: "Passengers select their departure location, destination and travel date.",
  },
  {
    num: "2",
    icon: HiOutlineTruck,
    title: "Select a Bus",
    desc: "Available buses and schedules are displayed.",
  },
  {
    num: "3",
    icon: HiOutlineViewGrid,
    title: "Choose a Seat",
    desc: "Passengers select their preferred available seat.",
  },
  {
    num: "4",
    icon: HiOutlineCreditCard,
    title: "Make Payment",
    desc: "The system processes the payment through an integrated payment gateway.",
  },
  {
    num: "5",
    icon: HiOutlineTicket,
    title: "Receive E-Ticket",
    desc: "The passenger receives a digital ticket through the website, app, email or SMS.",
  },
  {
    num: "6",
    icon: HiOutlineQrcode,
    title: "Validate the Ticket",
    desc: "Staff or drivers can validate the ticket using QR-code scanning.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-does-a-bus-ticketing-system-work"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            How It Works
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            How Does a Bus Ticketing System Work?
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            From route search to QR validation at boarding, the entire booking
            journey runs through one connected platform.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                data-gsap
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                {/* Number watermark */}
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[64px] font-black leading-none text-brand/[0.06] transition-colors duration-300 group-hover:text-brand/15">
                  {step.num}
                </span>

                <span className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-brand/20 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[9.5px] font-bold text-white shadow-md shadow-brand/30">
                    {step.num}
                  </span>
                </span>

                <h3 className="relative mt-5 text-[15px] font-medium tracking-tight text-text-dark">
                  Step {step.num}: {step.title}
                </h3>
                <p className="relative mt-2 text-[13px] leading-relaxed text-text-muted">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
