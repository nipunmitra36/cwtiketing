"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineChevronDown,
  HiOutlineArrowRight,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

export interface FaqSectionItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqSectionItem[];
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  description: string;
}

const supportChips = ["24/7 Support", "99.9% Uptime SLA", "Dedicated Manager"];

export default function FaqSection({
  items,
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  highlight,
  description,
}: FaqSectionProps) {
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
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-light/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* ── Left column: heading + contact card ── */}
          <div className="lg:pt-2">
            <div data-gsap>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
                {eyebrow}
              </p>
              <h2 className="mt-5 text-[22px] font-semibold leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                {highlight ? (
                  <>
                    {heading.replace(highlight, "")}
                    <span className="relative inline-block">
                      <span className="relative z-10">{highlight}</span>
                      <span className="absolute bottom-1 left-0 z-0 h-3 w-full rounded bg-brand/15" />
                    </span>
                  </>
                ) : (
                  heading
                )}
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-muted">
                {description}
              </p>
            </div>

            {/* Contact card (desktop only) */}
            <div
              data-gsap
              className="relative mt-8 hidden overflow-hidden rounded-3xl border border-blue-900 bg-blue-900 p-6 shadow-lg shadow-blue-900/30 lg:block"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/30 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-lg shadow-blue-950/30">
                  <HiOutlineChatAlt2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-white">
                    Still have questions?
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-blue-200">
                    Talk to a booking expert directly — no waiting, no forms.
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex flex-col gap-2.5">
                <a
                  href="https://wa.me/8801614000401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-white shadow-md shadow-emerald-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white backdrop-blur transition-all hover:bg-white/20 active:scale-[0.98]"
                >
                  Book a Free Demo
                  <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {supportChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-text-muted"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── FAQ Accordion ── */}
          <div className="space-y-3">
            {items.map((faq, i) => {
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
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
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

            {/* Bottom hint */}
            <p data-gsap className="pt-2 text-center text-[13px] text-text-muted">
              More questions?{" "}
              <Link
                href="/contact"
                className="font-medium text-brand transition-colors hover:text-brand-hover"
              >
                Contact our team
              </Link>{" "}
              — we usually reply within a few hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
