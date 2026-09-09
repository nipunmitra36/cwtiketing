"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineAdjustments,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const reasons: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineLightningBolt,
    title: "Fast at the Counter",
    desc: "Booking a parcel takes seconds, not minutes. Saved customers, automatic pricing and one-tap waybill printing keep the queue moving even at peak hours.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Accountable at Every Handover",
    desc: "Every scan records who held the parcel, where, and when. When something goes missing you know the exact branch, vehicle and rider to ask — backed by a full audit trail.",
  },
  {
    icon: HiOutlineAdjustments,
    title: "Configured Around Your Rates",
    desc: "Your weight slabs, your zones, your service types, your commission and COD rules. The parcel management system adapts to how you already price, not the other way round.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Built on Proven Transport Software",
    desc: "It runs on the same platform trusted by transport operators across more than twenty countries — so it is ready for multi-branch networks, local payment methods and real-world conditions.",
  },
];

const gradientRing: Record<number, string> = {
  0: "from-brand to-amber-400",
  1: "from-emerald-500 to-teal-400",
  2: "from-sky-500 to-indigo-400",
  3: "from-brand to-brand-dark",
};

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            data-gsap
            className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Why Choose CW Ticketing&apos;s{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              Parcel Management System
            </span>
          </h2>
          <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand/10"
              >
                <span
                  className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradientRing[i]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`}
                />

                <div className="relative flex items-center gap-4">
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${gradientRing[i]} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[17px] font-medium tracking-tight text-text-dark">{r.title}</h3>
                </div>
                <p className="relative mt-4 text-[13.5px] leading-relaxed text-text-muted">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
