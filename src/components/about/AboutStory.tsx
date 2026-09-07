"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCube, HiOutlineLightBulb } from "react-icons/hi";

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.1 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* What is CW Ticketing System */}
          <div data-gsap>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand">
              <HiOutlineCube className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              What Is CW Ticketing System?
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CW Ticketing System is a modern SaaS (Software as a Service)
              solution designed to simplify how transportation businesses
              operate. Developed by Codeware Ltd., our system combines advanced
              technology with practical design to make ticketing and fleet
              management more efficient and reliable.
            </p>
          </div>

          {/* Why We Exist */}
          <div data-gsap>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand">
              <HiOutlineLightBulb className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Why We Exist
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              While many industries have embraced digital transformation,
              transportation services still struggle with fragmented workflows
              and outdated systems. CW Ticketing System was created to offer a
              more streamlined, modern approach to managing transport
              operations. We offer an intelligent platform where admins, bus
              operators, counter agents, and passengers can interact smoothly,
              with up-to-the-minute updates keeping everyone connected.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              Our goal is to support transport businesses at their core while
              enhancing the end-user experience for travelers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
