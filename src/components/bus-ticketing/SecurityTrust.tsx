"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineEye,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Pillar {
  icon: IconType;
  title: string;
  desc: string;
}

const pillars: Pillar[] = [
  {
    icon: HiOutlineShieldCheck,
    title: "Enterprise-Grade Security",
    desc: "Passenger and payment data is encrypted at rest and in transit. You retain full ownership of your operational data, on infrastructure certified to enterprise standards.",
  },
  {
    icon: HiOutlineKey,
    title: "Permissioning & Management",
    desc: "Define exactly what each team member and role can view, edit or issue — from counter staff to fleet managers, with limits set by you.",
  },
  {
    icon: HiOutlineEye,
    title: "Control & Visibility",
    desc: "A real-time audit log of every booking, refund and schedule change — what happened, when, and by whom.",
  },
];

export default function SecurityTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security-and-trust"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Security &amp; Trust
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Your Operations, Your Control
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            Passenger records, fares and payments are sensitive. CW Ticketing is
            built to keep them that way.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-gsap
                className="group relative flex flex-col items-start overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[15px] font-medium tracking-tight text-text-dark">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
