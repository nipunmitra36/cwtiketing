"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTrendingUp,
  HiOutlineShieldCheck,
  HiOutlineAdjustments,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const reasons: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineTrendingUp,
    title: "Simple to Use, Ready to Scale",
    desc: "CWTicketing keeps things easy for you and your team. From assigning seats in real-time to tracking buses live, everything works smoothly, whether you're running a few shuttles or growing your fleet.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Full Control, Zero Compromise",
    desc: "Your routes, your brand, your rules. CWTicketing gives you full control to set fares, manage your operations, and customize your passenger experience—without handing over your business to a third party.",
  },
  {
    icon: HiOutlineAdjustments,
    title: "Flexible to Fit Your Business",
    desc: "CWTicketing has helped operators worldwide run their ticketing exactly the way they want. Whether managing one route or multiple networks, they've created branded portals, set custom commissions, and accepted digital payments—all without any coding.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Trusted by Shuttle Operators Worldwide",
    desc: "Operators across cities, towns, and suburbs around the globe rely on CWTicketing every day. It's a proven, reliable system that meets real transit needs no matter where their routes run.",
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
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            data-gsap
            className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              CW Ticketing
            </span>
          </h2>
          <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          <p data-gsap className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            Everything a short-distance operator needs to run routes, keep
            passengers happy, and grow — without rebuilding your process from
            scratch.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                {/* corner accent */}
                <span className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${gradientRing[i]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25`} />

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