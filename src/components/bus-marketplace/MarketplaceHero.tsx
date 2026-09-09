"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineCheckCircle } from "react-icons/hi";
import MarketplaceHub from "./MarketplaceHub";

const TRUST_ITEMS = ["Multi-operator ready", "Real-time sync across apps", "Built to scale with your network"];

export default function MarketplaceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const items = copyRef.current?.querySelectorAll(".gsap-hero-item");
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.15, ease: "power3.out" }
          );
        }

        const widget = visualRef.current?.querySelector(".gsap-hero-visual");
        if (widget) {
          gsap.fromTo(
            widget,
            { opacity: 0, y: 50, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.4, ease: "power3.out" }
          );
        }

        gsap.to(visualRef.current, {
          y: -26,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
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
      className="relative isolate overflow-hidden bg-[#FDF7F2] pt-32 sm:pt-40"
    >
      <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-light blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,106,28,0.10) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ── Left: copy ── */}
          <div ref={copyRef} className="max-w-2xl">
            <span className="gsap-hero-item inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-brand shadow-sm">
              <HiOutlineSparkles className="h-4 w-4" />
              Designed for those building the next big OTA or bus network
            </span>

            <h1 className="gsap-hero-item mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.6rem] lg:text-[2.75rem] xl:text-[50px]">
              Build Your Own{" "}
              <span className="bg-gradient-to-r from-brand via-brand to-brand-dark bg-clip-text text-transparent">
                Bus Booking Empire
              </span>
            </h1>

            <p className="gsap-hero-item mt-6 text-[15px] font-semibold uppercase tracking-widest text-brand">
              A Central Nerve System for Your Bus Network
            </p>

            <p className="gsap-hero-item mt-3 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-[16px]">
              One platform that syncs all operators, apps, and users in
              real-time — everything a marketplace owner needs to onboard,
              manage, and grow a bus ticketing network.
            </p>

            <div className="gsap-hero-item mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Start Free Consultation
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#control-centre"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-[14px] font-semibold text-text-dark shadow-sm transition-all hover:border-brand/30 hover:text-brand active:scale-[0.97]"
              >
                Explore the Platform
              </Link>
            </div>

            <div className="gsap-hero-item mt-10 flex flex-col gap-2.5 border-t border-gray-200/80 pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-2">
              {TRUST_ITEMS.map((t) => (
                <span key={t} className="flex items-center gap-2 text-[13.5px] font-medium text-text-body">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineCheckCircle className="h-4 w-4" />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: marketplace flowchart ── */}
          <div ref={visualRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <MarketplaceHub />
          </div>
        </div>
      </div>
    </section>
  );
}
