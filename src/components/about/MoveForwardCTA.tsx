"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function MoveForwardCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 30, stagger: 0.1 });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          data-gsap
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-14 text-center shadow-2xl shadow-brand/30 sm:px-12 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%)]" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-black/10 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-white/70">
              Move Forward With Us
            </p>
            <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              From chaos to clarity, from guesswork to data, from fragmentation
              to flow.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-white/80">
              CW Ticketing System isn&apos;t a product you plug in — it&apos;s a
              mindset shift. Want a system that works smarter, scales faster,
              and puts you in control? Partner with us, and let&apos;s simplify
              your transport operations together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-brand shadow-lg shadow-black/20 transition-all hover:bg-gray-100 active:scale-95"
              >
                Partner With Us
                <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
