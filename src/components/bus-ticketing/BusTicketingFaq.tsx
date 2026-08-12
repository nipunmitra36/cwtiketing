"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineChevronDown, HiOutlineArrowRight } from "react-icons/hi";
import { busFaqs } from "./faq-data";

export default function BusTicketingFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 30, stagger: 0.06 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Frequently Asked Questions
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Bus Ticketing System FAQ
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            Quick answers to the questions operators ask before switching to CW
            Ticketing System.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-3">
            {busFaqs.map((faq, i) => {
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

          <div
            data-gsap
            className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-100 bg-gray-50/60 px-6 py-7 text-center sm:flex-row sm:text-left"
          >
            <p className="text-[14px] font-medium text-text-dark">
              Still have a question about our bus ticketing system?
            </p>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
            >
              Contact Our Team
              <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
