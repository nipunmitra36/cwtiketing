"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineEye, HiOutlineUserGroup } from "react-icons/hi";

export default function VisionTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.1 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Our Vision */}
          <div
            data-gsap
            className="rounded-3xl border border-gray-100 bg-gray-50/60 p-8 sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
              <HiOutlineEye className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Our Vision
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              We envision a future where transport management is no longer a
              struggle with disconnected systems, but a streamlined operation
              supported by intelligent tools. CW Ticketing System combines
              useful features with a simple, easy-to-use design, so operators
              can work efficiently without dealing with complicated tools.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              As transportation evolves, we remain committed to building tools
              that evolve with it. Our roadmap is guided by user feedback,
              industry shifts, and a constant pursuit of better.
            </p>
          </div>

          {/* The People Behind the Platform */}
          <div
            data-gsap
            className="rounded-3xl border border-brand/20 bg-gradient-to-br from-brand-light/60 to-white p-8 sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-brand/20">
              <HiOutlineUserGroup className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              The People Behind the Platform
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CW Ticketing System is powered by a multidisciplinary team of
              engineers, designers, and strategists. With deep field knowledge
              and a focus on practical outcomes, we bring clarity to complex
              workflows and make sure every update serves a real business need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
