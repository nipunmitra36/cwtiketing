"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTrendingUp,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineViewGrid,
  HiOutlineCurrencyDollar,
  HiOutlineMap,
  HiOutlineStar,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineBriefcase,
  HiOutlineDocumentReport,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Benefit {
  icon: IconType;
  title: string;
  desc: string;
}

const benefits: Benefit[] = [
  {
    icon: HiOutlineTrendingUp,
    title: "Increase online ticket sales",
    desc: "Let passengers book anytime, from any device, without visiting a counter.",
  },
  {
    icon: HiOutlinePencilAlt,
    title: "Reduce manual booking",
    desc: "Automate reservations, confirmations and ticket generation end to end.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Prevent double bookings",
    desc: "Live seat maps keep every channel in sync, so a seat can only be sold once.",
  },
  {
    icon: HiOutlineViewGrid,
    title: "Improve seat management",
    desc: "Control seat categories, occupancy and layouts for every bus in your fleet.",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Automate payment processing",
    desc: "Collect payments online through integrated gateways and mobile wallets.",
  },
  {
    icon: HiOutlineMap,
    title: "Manage multiple routes",
    desc: "Schedule and price all your routes from one centralized dashboard.",
  },
  {
    icon: HiOutlineStar,
    title: "Improve passenger experience",
    desc: "Fast search, live seat selection and instant e-tickets for every trip.",
  },
  {
    icon: HiOutlineCash,
    title: "Reduce operational costs",
    desc: "Cut paperwork, manual errors and the overhead of disconnected systems.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track sales in real time",
    desc: "See every sale, refund and cancellation the moment it happens.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Manage agents and counters",
    desc: "Control commissions, POS access and offline sales across your network.",
  },
  {
    icon: HiOutlineDocumentReport,
    title: "Generate business reports",
    desc: "Revenue, occupancy, channel and settlement reports on demand.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Expand into new markets",
    desc: "Go white-label and launch your platform in new cities and regions.",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.06 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="benefits-of-a-bus-ticketing-system"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Why Switch
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Benefits of Using a Bus Ticketing System
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            One platform for your routes, seats, sales and passengers — built to
            grow revenue and simplify daily operations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                data-gsap
                className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[15px] font-medium leading-snug tracking-tight text-text-dark">
                  {b.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
