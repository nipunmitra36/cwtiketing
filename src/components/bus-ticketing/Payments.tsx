"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCreditCard,
  HiOutlineOfficeBuilding,
  HiOutlineDeviceMobile,
  HiOutlineCurrencyDollar,
  HiOutlineGlobeAlt,
  HiOutlineCash,
  HiOutlineLink,
  HiOutlineDocumentText,
  HiOutlineAdjustments,
  HiOutlineCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const features: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineLink,
    title: "Multiple gateways",
    desc: "Connect international, regional or local payment providers.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Central transaction records",
    desc: "Review booking and payment activity from your administrative dashboard.",
  },
  {
    icon: HiOutlineDeviceMobile,
    title: "Mobile-friendly checkout",
    desc: "Create a simple payment journey for passengers using smartphones.",
  },
  {
    icon: HiOutlineAdjustments,
    title: "Market-specific configuration",
    desc: "Configure payment options around the countries and regions you serve.",
  },
];

const methods: { icon: IconType; label: string; sub: string }[] = [
  { icon: HiOutlineCreditCard, label: "Card payments", sub: "Visa, Mastercard & more" },
  { icon: HiOutlineOfficeBuilding, label: "Online banking", sub: "Bank login & net banking" },
  { icon: HiOutlineDeviceMobile, label: "Mobile wallets", sub: "bKash, mPesa, Paytm…" },
  { icon: HiOutlineCurrencyDollar, label: "Bank transfer", sub: "Direct account settlement" },
  { icon: HiOutlineGlobeAlt, label: "Regional gateways", sub: "Local providers by market" },
  { icon: HiOutlineCash, label: "Cash on collection", sub: "Counter & onboard cash" },
];

export default function Payments() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="payments"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: copy + features ── */}
          <div>
            <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
              Flexible Payments
            </p>
            <h2
              data-gsap
              className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
            >
              Accept the Payment Methods Your Market Uses
            </h2>
            <p
              data-gsap
              className="mt-4 max-w-lg text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
            >
              Connect your preferred payment gateways and give passengers familiar
              ways to pay online or through mobile devices.
            </p>

            <div className="mt-9 space-y-5">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} data-gsap className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium text-text-dark">
                        {f.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-text-muted">
                        {f.desc}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: method tiles ── */}
          <div data-gsap className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-amber-200/30 blur-xl" />
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {methods.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
                        <HiOutlineCheck className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <p className="text-[15px] font-medium leading-tight text-text-dark">
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-text-muted">{m.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footnote card */}
            <div className="relative mt-4 flex items-center justify-between rounded-2xl border border-dashed border-brand/30 bg-brand-light/50 px-4 py-3">
              <p className="text-[12.5px] font-medium leading-snug text-text-body">
                Every method posts to the same central transaction record.
              </p>
              <HiOutlineArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
