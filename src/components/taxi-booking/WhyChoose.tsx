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
    title: "Dispatch That Never Sleeps",
    desc: "Rides are matched to the nearest free driver in seconds, around the clock, without a dispatcher working the phones. Your desk steps in only when it wants to.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Every Trip on Record",
    desc: "Route, distance, duration, driver and fare are logged for every single ride. Fare disputes and complaints get settled by opening the trip, not by taking someone's word for it.",
  },
  {
    icon: HiOutlineAdjustments,
    title: "Your Fares, Your Rules",
    desc: "Base fares, per-kilometre rates, waiting charges, night and surge multipliers, zone pricing and driver commission are all yours to define — and to change whenever the market does.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Built on Proven Transport Software",
    desc: "It runs on the same platform trusted by transport operators across more than twenty countries, so it is ready for local payment methods, multi-city fleets and real-world conditions.",
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
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2
            data-gsap
            className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              Taxi Booking Management Software
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
