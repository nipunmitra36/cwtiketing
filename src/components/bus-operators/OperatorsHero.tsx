"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import { HiOutlineArrowRight, HiOutlineGlobeAlt } from "react-icons/hi";

export default function OperatorsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const items = copyRef.current?.querySelectorAll(".gsap-hero-item");
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.1, ease: "power3.out" }
          );
        }
      }, sectionRef);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#FDF7F2] pt-32 pb-20 sm:pt-40 sm:pb-24"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,106,28,0.10) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div ref={copyRef} className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="gsap-hero-item inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
          <HiOutlineGlobeAlt className="h-4 w-4" />
          Intercity Bus Operators
        </span>

        <h1 className="gsap-hero-item mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.6rem] lg:text-[2.9rem]">
          Power Your Intercity Bus Operations with{" "}
          <span className="bg-gradient-to-r from-brand via-brand to-brand-dark bg-clip-text text-transparent">
            Smart Ticketing
          </span>
        </h1>

        <p className="gsap-hero-item mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-[16px]">
          Automate bookings, expand your reach and take control of the
          long-distance market.
        </p>

        <div className="gsap-hero-item mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
          >
            Book a Demo
            <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#smart-features"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-[14px] font-semibold text-text-dark shadow-sm transition-all hover:border-brand/30 hover:text-brand active:scale-[0.97]"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
