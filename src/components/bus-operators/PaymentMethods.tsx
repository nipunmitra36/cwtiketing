"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCreditCard } from "react-icons/hi";
import { SiGooglepay, SiApplepay } from "react-icons/si";
import type { IconType } from "react-icons";

const namedMethods: { icon: IconType; label: string }[] = [
  { icon: SiGooglepay, label: "Google Pay" },
  { icon: SiApplepay, label: "Apple Pay" },
];

export default function PaymentMethods() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 28, stagger: 0.08 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-20">
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
          Payment Gateway
        </h2>

        <div data-gsap className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
          {namedMethods.map((m) => {
            const Icon = m.icon;
            return (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-text-dark shadow-sm"
              >
                <Icon className="h-4 w-4 text-brand" />
                {m.label}
              </span>
            );
          })}
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-text-dark shadow-sm">
            <HiOutlineCreditCard className="h-4 w-4 text-brand" />
            AmarPay
          </span>
        </div>

        <p data-gsap className="mx-auto mt-5 max-w-md text-[12.5px] leading-relaxed text-text-muted">
          Plus cards, bank transfers, and regional mobile wallets — configured
          around the markets you operate in.
        </p>
      </div>
    </section>
  );
}
