"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineSparkles } from "react-icons/hi";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 30, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#FDF7F2] pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,106,28,0.10) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span
          data-gsap
          className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm"
        >
          <HiOutlineSparkles className="h-4 w-4" />
          About Us
        </span>

        <h1
          data-gsap
          className="mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.6rem] lg:text-[2.9rem]"
        >
          Rethinking Ticketing,{" "}
          <span className="bg-gradient-to-r from-brand via-brand to-brand-dark bg-clip-text text-transparent">
            Redefining Traveling
          </span>
          .
        </h1>

        <p
          data-gsap
          className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-[16px]"
        >
          CW Ticketing System is a modern SaaS solution designed to simplify how
          transportation businesses operate — developed by Codeware Ltd. to
          combine advanced technology with practical design.
        </p>
      </div>
    </section>
  );
}
