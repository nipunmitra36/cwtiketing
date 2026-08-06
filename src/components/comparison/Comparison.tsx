"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";

const rows = [
  { old: "Manual booking", new: "Online booking" },
  { old: "Paper tickets", new: "QR tickets" },
  { old: "Limited payments", new: "Multiple gateways" },
  { old: "No analytics", new: "Real-time dashboard" },
  { old: "Separate apps", new: "One platform" },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll("[data-gsap]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-brand-light/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            data-gsap
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
          >
            Comparison
          </span>
          <h2
            data-gsap
            className="mt-4 text-3xl font-medium tracking-tight text-text-dark sm:text-5xl"
          >
            Why Operators Move From Old Systems
          </h2>
          <p
            data-gsap
            className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
          >
            Compare what you are working with today to what CW Ticketing
            replaces it with.
          </p>
        </div>

        <div
          data-gsap
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/60"
        >
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-gray-100">
            <div className="px-5 py-4 sm:px-6">
              <span className="flex items-center gap-2 text-[13px] font-medium text-text-muted sm:text-[14px]">
                <HiOutlineX className="h-4 w-4 text-rose-500" />
                Old System
              </span>
            </div>
            <div className="border-l border-gray-100 bg-brand-light/60 px-5 py-4 sm:px-6">
              <span className="flex items-center gap-2 text-[13px] font-medium text-brand sm:text-[14px]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                  <HiOutlineCheck className="h-3 w-3" />
                </span>
                CW Ticketing
              </span>
            </div>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, i) => (
              <div
                key={row.old}
                className={`grid grid-cols-2 items-center ${
                  i !== rows.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="px-5 py-4 sm:px-6">
                  <span className="flex items-center gap-3 text-[13px] font-medium text-gray-400 sm:text-[14px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                      <HiOutlineX className="h-3.5 w-3.5" />
                    </span>
                    {row.old}
                  </span>
                </div>
                <div className="border-l border-gray-100 bg-gradient-to-r from-white to-brand-light/50 px-5 py-4 sm:px-6">
                  <span className="flex items-center gap-3 text-[13px] font-medium text-text-dark sm:text-[14px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <HiOutlineCheck className="h-3.5 w-3.5" />
                    </span>
                    {row.new}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-gsap className="mt-8 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/35 active:scale-95"
          >
            Make the switch
            <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
