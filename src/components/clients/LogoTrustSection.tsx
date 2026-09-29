"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import LogoWall from "./LogoWall";
import CountryMarquee from "./CountryMarquee";
import { clients } from "./clients-data";

export default function LogoTrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 24, stagger: 0.1, start: "top 85%" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="customers"
      className="relative overflow-hidden border-b border-gray-100 bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <p
            data-gsap
            className="text-[12px] font-semibold uppercase tracking-widest text-brand sm:text-[13px]"
          >
            Our clients
          </p>
          <h2
            data-gsap
            className="mt-3 text-[24px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] lg:text-[32px]"
          >
            Trusted by transport companies worldwide
          </h2>
        </div>

        <LogoWall logos={clients} />

        <CountryMarquee className="mt-10 sm:mt-12 lg:mt-14" />
      </div>
    </section>
  );
}
