"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineViewGrid,
  HiOutlineTemplate,
  HiOutlineDesktopComputer,
  HiOutlineCreditCard,
  HiOutlineChartBar,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const offerings: { icon: IconType; title: string }[] = [
  { icon: HiOutlineViewGrid, title: "Real-time seat booking and route visibility" },
  { icon: HiOutlineTemplate, title: "Centralized backend control for schedule, fare, and trip management" },
  { icon: HiOutlineDesktopComputer, title: "Integrated counter panel interface for on-ground ticket agents" },
  { icon: HiOutlineCreditCard, title: "Secure digital payments with transparent transaction tracking" },
  { icon: HiOutlineChartBar, title: "Insightful reporting to guide data-driven decision making" },
];

export default function WhatWeOffer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            What We Offer
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            A Multi-Channel Ticketing Platform
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Bus, train, cruise, event, and more — combining functionality with
            flexibility. No matter the size of your business, our platform
            adapts to your needs.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.title}
                data-gsap
                className="group flex items-start gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-1.5 text-[14px] leading-relaxed text-text-dark">{o.title}</p>
              </div>
            );
          })}
        </div>

        <p
          data-gsap
          className="mx-auto mt-10 max-w-2xl text-center text-[13px] leading-relaxed text-text-muted"
        >
          Every feature is designed to reduce manual workload, eliminate errors,
          and help operators run smarter, more responsive businesses.
        </p>
      </div>
    </section>
  );
}
