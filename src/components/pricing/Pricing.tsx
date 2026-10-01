"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCheck, HiOutlineArrowRight } from "react-icons/hi";
import { industries } from "@/components/industries/industry-data";

// The travel-agency marketplace card carries the full platform, so it gets the
// highlight treatment (accent border + "Full platform" badge).
const HIGHLIGHTED = 2;

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-brand-light/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h1
            data-gsap
            className="mt-4 text-[28px] font-semibold leading-tight tracking-tight text-text-dark sm:text-[36px] lg:text-[44px]"
          >
            Packages Built For{" "}
            <span className="text-gradient-brand">Every Operator</span>
          </h1>
          <p
            data-gsap
            className="mt-4 text-[15px] leading-relaxed text-text-muted sm:text-[16px]"
          >
            Every package is tailored to your routes and volumes. Tell us what
            you need and we&apos;ll quote it precisely.
          </p>
        </div>

        <div className="mx-auto grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3 lg:items-start">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            const highlighted = i === HIGHLIGHTED;
            return (
              <div
                key={industry.title}
                data-gsap
                className={`relative flex h-full flex-col rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-2 sm:p-7 ${
                  highlighted
                    ? "border-brand/40 shadow-xl shadow-brand/15"
                    : "border-gray-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/80"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white shadow-md shadow-brand/30">
                    Full platform
                  </span>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      highlighted
                        ? "bg-brand text-white shadow-md shadow-brand/30"
                        : "bg-brand-light text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-medium leading-snug text-text-dark">
                      {industry.title}
                    </h3>
                    <p className="text-[12px] font-medium text-brand">{industry.tagline}</p>
                  </div>
                </div>

                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  {industry.desc}
                </p>

                <ul className="mb-7 space-y-2">
                  {industry.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                          highlighted ? "bg-brand text-white" : "bg-brand-light text-brand"
                        }`}
                      >
                        <HiOutlineCheck className="h-3 w-3" />
                      </span>
                      <span className="text-[13px] leading-snug text-text-body">{m}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-2.5 pt-2">
                  <Link
                    href="/contact"
                    className={`flex w-full items-center justify-center rounded-xl px-5 py-3 text-[13.5px] font-semibold transition-all active:scale-[0.98] ${
                      highlighted
                        ? "bg-brand text-white shadow-lg shadow-brand/30 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40"
                        : "border border-gray-200 bg-white text-text-dark hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                    }`}
                  >
                    Get Custom Quote
                  </Link>
                  <Link
                    href={industry.href}
                    className="group flex w-full items-center justify-center gap-2 py-1 text-[13px] font-semibold text-brand transition-colors hover:text-brand-hover"
                  >
                    Explore {industry.title}
                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p data-gsap className="mt-8 text-center text-[12.5px] text-text-muted">
          No long-term contracts. Volume pricing for large fleets.{" "}
          <Link
            href="/contact"
            className="-my-2.5 inline-flex items-center py-2.5 font-semibold text-brand hover:text-brand-hover"
          >
            Talk to sales →
          </Link>
        </p>
      </div>
    </section>
  );
}
