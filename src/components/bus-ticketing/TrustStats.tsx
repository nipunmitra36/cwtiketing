"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";

const logos = ["Metrolane", "TransitOne"];

const stats = [
  { value: "50+", label: "Operators" },
  { value: "10+", label: "Countries" },
  { value: "1M+", label: "Bookings processed" },
  { value: "99.9%", label: "Uptime" },
];

export default function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 24, stagger: 0.08, start: "top 85%" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trusted-by-operators"
      className="relative border-y border-gray-100 bg-white py-12 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          data-gsap
          className="text-center text-[12px] font-medium uppercase tracking-widest text-text-muted sm:text-[13px]"
        >
          Trusted by transport companies worldwide
        </p>

        <div
          data-gsap
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-14 gap-y-5"
        >
          {logos.map((name) => (
            <span
              key={name}
              className="text-[19px] font-black tracking-tight text-gray-300 transition-colors duration-300 hover:text-text-dark sm:text-[22px]"
            >
              {name}
            </span>
          ))}
        </div>

        <div
          data-gsap
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-5 text-center">
              <p className="text-[28px] font-black leading-none tracking-tight text-text-dark sm:text-[32px]">
                {s.value}
              </p>
              <p className="mt-2 text-[12px] font-medium text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
