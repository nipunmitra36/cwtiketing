"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineArrowRight, HiOutlineTruck } from "react-icons/hi";
import { FaShuttleVan } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import type { IconType } from "react-icons";

interface IndustryCard {
  icon: IconType;
  title: string;
  desc: string;
  href: string;
}

const cards: IndustryCard[] = [
  {
    icon: HiOutlineTruck,
    title: "Bus Operators",
    desc: "Intercity and coach lines selling seats online under their own brand.",
    href: "/intercity-coach-booking-software",
  },
  {
    icon: FaShuttleVan,
    title: "Shuttle Companies",
    desc: "Airport and point-to-point shuttles taking bookings and payments online.",
    href: "/shuttle-booking-system",
  },
  {
    icon: IoTicketOutline,
    title: "Travel Agencies",
    desc: "Multi-operator ticket retail from one counter, app and dashboard.",
    href: "/bus-terminal-ticketing-system",
  },
];

export default function IndustryLinks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="built-for-your-business"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Industries
          </p>
          <h2
            data-gsap
            className="mt-3 text-balance text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Built for <span className="text-gradient-brand">Your Type of Business</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                href={c.href}
                data-gsap
                className="group relative flex flex-col items-start overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[15px] font-medium tracking-tight text-text-dark">{c.title}</h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-text-muted">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                  Learn more
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
