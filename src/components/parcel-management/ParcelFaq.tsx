"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineChevronDown, HiOutlineArrowRight } from "react-icons/hi";
import { parcelFaqs } from "./faq-data";

export default function ParcelFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 30, stagger: 0.04 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* ── Left: intro ── */}
          <div data-gsap className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              Straight answers about running parcel booking, tracking, rider
              delivery and cash-on-delivery settlement with CW Ticketing.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/60 p-6 shadow-sm">
              <p className="text-[14px] font-semibold text-text-dark">Still have a question?</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-text-muted">
                Talk to our team about branch setup, rate charts and launch
                timelines for your parcel operation.
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
              >
                Contact Our Team
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* ── Right: accordion ── */}
          <div className="space-y-3">
            {parcelFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.q}
                  data-gsap
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-brand/30 bg-white shadow-lg shadow-brand/5"
                      : "border-gray-200 bg-white hover:border-brand/25 hover:shadow-md hover:shadow-gray-100"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold transition-colors duration-300 ${
                        isOpen
                          ? "bg-brand text-white"
                          : "bg-brand-light text-brand group-hover:bg-brand/10"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[14px] font-semibold leading-snug text-text-dark sm:text-[15px]">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-brand bg-brand text-white"
                          : "border-gray-200 text-text-muted group-hover:border-brand/40 group-hover:text-brand"
                      }`}
                    >
                      <HiOutlineChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:pl-[76px] sm:pr-6">
                        <p className="text-[14px] leading-relaxed text-text-muted">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
