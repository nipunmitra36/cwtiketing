"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCloudUpload,
  HiOutlineCog,
  HiOutlineShieldCheck,
  HiOutlineSupport,
  HiOutlineArrowRight,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Pillar {
  icon: IconType;
  title: string;
  desc: string;
}

const pillars: Pillar[] = [
  {
    icon: HiOutlineCloudUpload,
    title: "Cloud-Based Access",
    desc: "Authorised teams can access operational tools from supported devices and locations.",
  },
  {
    icon: HiOutlineCog,
    title: "Role-Based Control",
    desc: "Give administrators, agents, drivers and counter staff access to the functions relevant to their roles.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Secure Transactions",
    desc: "Protect passenger, booking and payment information through appropriate security controls.",
  },
  {
    icon: HiOutlineSupport,
    title: "Customer Support",
    desc: "Provide assistance during setup and after the platform launches.",
  },
];

export default function BuiltForOperations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 40, stagger: 0.1 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="built-for-daily-operations"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Built for Daily Operations
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            A Platform Your Team Can Depend On
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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

        {/* Fine print */}
        <p
          data-gsap
          className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-text-muted"
        >
          Uptime targets, hosting regions, backup frequency, encryption standards
          and support response times are confirmed during onboarding.
        </p>

        {/* Final CTA band */}
        <div
          data-gsap
          className="relative mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-center shadow-2xl shadow-brand/30 sm:px-12 lg:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%)]" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-black/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Ready to bring your bus operation online?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/80">
              Tell us about your routes, fleet and passengers — we&apos;ll show you
              a platform built around them.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-brand shadow-lg shadow-black/20 transition-all hover:bg-gray-100 active:scale-95"
              >
                Book a Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://wa.me/8801614000401"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Chat on WhatsApp
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-white/75">
              {["Free consultation", "No obligation", "Live product walkthrough"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <HiOutlineCheck className="h-3.5 w-3.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
