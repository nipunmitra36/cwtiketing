"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineChevronDown, HiOutlineArrowRight } from "react-icons/hi";
import { ICONS } from "./icons";
import type { FeaturePageData } from "./types";

export function FeatureFaq({ data }: { data: FeaturePageData }) {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!ref.current) return;
    return createSectionReveal(ref.current, { y: 30, stagger: 0.04 });
  }, []);

  return (
    <section ref={ref} id="faq" className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div data-gsap className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Frequently Asked Questions About <span className="text-gradient-brand">{data.faqHighlight}</span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-text-muted sm:text-[15px]">{data.faqIntro}</p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-[14px] font-semibold text-text-dark">Still have a question?</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-text-muted">
                Talk to our team about setup, configuration and launch timelines.
              </p>
              <Link
                href="/contact-us"
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
              >
                Contact Our Team
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, i) => {
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
                        isOpen ? "bg-brand text-white" : "bg-brand-light text-brand group-hover:bg-brand/10"
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

export function FeatureCta({ data }: { data: FeaturePageData }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return createSectionReveal(ref.current, { y: 32, stagger: 0.08 });
  }, []);

  const trust = [
    { icon: "template", title: "Branded as Yours", desc: "Your portal, your apps, your identity" },
    { icon: "office", title: "Multi-Branch Ready", desc: "Counters, agents and branches under one roof" },
    { icon: "trend", title: "Scales With You", desc: "From a single route to a national network" },
    { icon: "shield", title: "Secure by Design", desc: "Role-based access and an audit trail" },
  ] as const;

  return (
    <section ref={ref} id="book-a-demo" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => {
            const Icon = ICONS[t.icon];
            return (
              <div
                key={t.title}
                data-gsap
                className="flex flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand shadow-sm ring-1 ring-gray-100">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[14px] font-semibold text-text-dark">{t.title}</p>
                <p className="text-[12.5px] leading-snug text-text-muted">{t.desc}</p>
              </div>
            );
          })}
        </div>

        <div
          data-gsap
          className="relative mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-center shadow-2xl shadow-brand/30 sm:px-12 lg:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%)]" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-black/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              {data.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/80">{data.ctaDesc}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-brand shadow-lg shadow-black/20 transition-all hover:bg-gray-100 active:scale-95"
              >
                Book a Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
