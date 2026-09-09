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
    title: "Built for Simplicity, Designed for Scale",
    desc: "CWTicketing makes complex tasks easy. From real-time seat blocking and dynamic pricing to agent management and live tracking, every feature is designed to streamline operations. Whether you're running one route or managing a large fleet, the system scales with your business.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "You're Always in Control",
    desc: "Keep full control over your routes, bookings, customer data, and brand. Set your own fares, customize your portal, and run your operation your way. CW Ticketing gives you the tools without taking over your business.",
  },
  {
    icon: HiOutlineAdjustments,
    title: "Flexible, Customizable, Future-Ready",
    desc: "No rigid templates or one-size-fits-all restrictions. Launch multiple operator profiles, create branded portals, accept mobile payments, and set your own commission structure, no coding needed.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Trusted by Operators Across Regions",
    desc: "Used by intercity and local operators, agents, and networks across the world. With reliable performance, localized features, and strong real-world results, CWTicketing is built for the realities of transport business.",
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
            Why Choose{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              CW Ticketing
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
