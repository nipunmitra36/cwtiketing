"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiOutlineBadgeCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const reasons: { icon: IconType; title: string; desc: string }[] = [
  {
    icon: HiOutlineCog,
    title: "Built for Real-World Bus Operations",
    desc: "CWTicketing takes the hassle out of running intercity routes. You can manage schedules, track seat availability, set flexible pricing, handle bookings, and so on. It's everything you need to keep your daily operations smooth and your passengers happy.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Stay in Charge of Your Business",
    desc: "You decide how your system works. With CWTicketing, you keep full control over routes, fares, passenger data, and branding. You don't have to change how you work, we just help you do it better, faster, and with less stress.",
  },
  {
    icon: HiOutlineTrendingUp,
    title: "Fits Your Business, Grows With You",
    desc: "Whether you're managing one fleet or working with multiple operators, the system adjusts to your needs. Create branded portals, add new agents or routes, and connect mobile payment systems without any technical work. As your network grows, CWTicketing grows with you.",
  },
  {
    icon: HiOutlineBadgeCheck,
    title: "Proven, Reliable, and Easy to Use",
    desc: "Bus companies around the world use CWTicketing to power their intercity ticketing systems. Operators, agents, and terminals trust it to run daily bookings smoothly. It's reliable, built for real transport needs, and easy for any team to use. If you're ready to stop dealing with paper tickets and phone calls, CWTicketing is here to help.",
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.08 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Why Choose CW Ticketing
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                data-gsap
                className="group relative flex flex-col rounded-3xl border border-gray-100 bg-gray-50/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[16px] font-medium tracking-tight text-text-dark">{r.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
