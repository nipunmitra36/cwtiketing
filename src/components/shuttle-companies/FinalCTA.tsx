"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineGlobeAlt,
  HiOutlineTemplate,
  HiOutlineDatabase,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const trustPoints: { icon: IconType; title: string; desc: string }[] = [
  { icon: HiOutlineGlobeAlt, title: "Trusted Locally", desc: "Proven by city and suburban operators" },
  { icon: HiOutlineTemplate, title: "White-Label Ready", desc: "Custom portals with your branding" },
  { icon: HiOutlineDatabase, title: "You Own the Data", desc: "Full control over routes and pricing" },
  { icon: HiOutlineTrendingUp, title: "Scales With You", desc: "Fits any fleet size or route type" },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Trust strip */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                data-gsap
                className="flex flex-col items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="text-[14px] font-semibold text-text-dark">{t.title}</p>
                <p className="text-[12.5px] leading-snug text-text-muted">{t.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Final CTA band */}
        <div
          data-gsap
          className="relative mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-center shadow-2xl shadow-brand/30 sm:px-12 lg:py-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%)]" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-black/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Ready to Transform Your Local Bus Network?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/80">
              Let&apos;s help you digitise city routes, speed up sales, and
              serve passengers better.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-brand shadow-lg shadow-black/20 transition-all hover:bg-gray-100 active:scale-95"
              >
                Book a Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}