"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineCreditCard, HiOutlineCheck, HiOutlineLockClosed } from "react-icons/hi";
import { SiGooglepay, SiApplepay } from "react-icons/si";
import type { IconType } from "react-icons";

const featured: { icon: IconType; label: string }[] = [
  { icon: SiGooglepay, label: "Google Pay" },
  { icon: SiApplepay, label: "Apple Pay" },
];

const wallets = ["bKash", "Nagad", "M-Pesa", "Wave", "AmarPay"];

export default function PaymentGateway() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 28, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            data-gsap
            className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Payment{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              Gateway
            </span>
          </h2>
          <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          <p data-gsap className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            Cards, wallets, and local rails — every operator on the
            marketplace accepts the payments their passengers already use.
          </p>
        </div>

        <div
          data-gsap
          className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50/60 p-8 shadow-2xl shadow-gray-900/5 sm:p-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

          <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
            <div className="flex gap-3">
              {featured.map((m) => {
                const Icon = m.icon;
                return (
                  <span
                    key={m.label}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-brand shadow-sm"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {["Visa", "Mastercard"].map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold text-text-dark shadow-sm"
                >
                  <HiOutlineCreditCard className="h-4 w-4 text-brand" />
                  {m}
                </span>
              ))}
              {wallets.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand/15 bg-brand-light px-4 py-2 text-[13px] font-semibold text-brand"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
            <p className="text-center text-[12.5px] leading-relaxed text-text-muted sm:text-left">
              Plus bank transfers and regional mobile wallets — configured
              around every market your operators sell in.
            </p>
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-700">
              <HiOutlineCheck className="h-4 w-4" />
              PCI-secure
            </div>
          </div>
        </div>

        <p data-gsap className="mx-auto mt-6 flex items-center justify-center gap-1.5 text-[11.5px] text-text-muted">
          <HiOutlineLockClosed className="h-3.5 w-3.5" />
          Encrypted end-to-end payments across every operator and channel
        </p>
      </div>
    </section>
  );
}
