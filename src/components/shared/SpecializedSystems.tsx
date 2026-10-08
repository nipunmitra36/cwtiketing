"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCheck, HiOutlineArrowRight } from "react-icons/hi";
import { FaShuttleVan } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { LuBusFront } from "react-icons/lu";
import type { IconType } from "react-icons";

export type SystemIcon = "intercity" | "marketplace" | "shuttle";

interface System {
  icon: SystemIcon;
  title: string;
  subtitle: string;
  items: string[];
  href: string;
}

export interface SpecializedSystemsProps {
  systems?: System[];
}

const ICONS: Record<SystemIcon, IconType> = {
  intercity: LuBusFront,
  marketplace: IoTicketOutline,
  shuttle: FaShuttleVan,
};

const defaultSystems: System[] = [
  {
    icon: "intercity",
    title: "Intercity Coach Booking System",
    subtitle: "Long-distance travel made simple",
    href: "/intercity-coach-booking-software",
    items: [
      "Multi-city route planning",
      "Advanced seat selection",
      "Meal & amenity booking",
      "Real-time GPS tracking",
      "Flexible cancellation policy",
    ],
  },
  {
    icon: "marketplace",
    title: "Bus Ticketing Marketplace",
    subtitle: "Connecting bus operators under one platform",
    href: "/bus-terminal-ticketing-system",
    items: [
      "Multi-Operator Management Dashboard",
      "Dynamic Pricing & Seat Plan Engine",
      "Real-Time Analytics & Reports",
      "POS-Compatible & QR-Based Ticketing",
      "Passenger Experience Tools",
    ],
  },
];

export default function SpecializedSystems({
  systems = defaultSystems,
}: SpecializedSystemsProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Specialized{" "}
              <span className="text-gradient-brand">
                Booking Systems
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            The same platform powers everything from long-distance networks to
            multi-operator marketplaces — ready when you are.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {systems.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Link
                key={s.title}
                href={s.href}
                data-gsap
                className="group relative block overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-light/40 to-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
              >
                {/* left gradient rail */}
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

                <span className="relative mt-7 inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition-colors group-hover:bg-brand-hover">
                  Explore {s.title}
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}