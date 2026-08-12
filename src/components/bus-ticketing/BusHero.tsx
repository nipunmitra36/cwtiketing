"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineArrowRight,
  HiOutlinePlay,
  HiOutlineTicket,
  HiOutlineUsers,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import BusLiveMap from "./BusLiveMap";

const STATS: { value: string; label: string; icon: IconType }[] = [
  { value: "150K+", label: "Tickets daily", icon: HiOutlineTicket },
  { value: "350+", label: "Operators", icon: HiOutlineUsers },
  { value: "Multi", label: "International markets", icon: HiOutlineLocationMarker },
];

export default function BusHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        // Intro: staggered copy entrance
        const items = copyRef.current?.querySelectorAll(".gsap-hero-item");
        if (items?.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              delay: 0.15,
              ease: "power3.out",
            }
          );
        }

        // Visual: live map panel scales in
        const widget = visualRef.current?.querySelector(".gsap-hero-widget");
        if (widget) {
          gsap.fromTo(
            widget,
            { opacity: 0, y: 50, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.45, ease: "power3.out" }
          );
        }

        // Parallax drift
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
      {/* ── Ambient blobs ── */}
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
              <HiOutlineTicket className="h-4 w-4" />
              Bus Ticketing System
            </span>

            <h1 className="gsap-hero-item mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[2.6rem] lg:text-[2.75rem] xl:text-[50px]">
              Bus Ticketing System for{" "}
              <span className="bg-gradient-to-r from-brand via-brand to-brand-dark bg-clip-text text-transparent">
                Online Booking &amp; Reservation
              </span>{" "}
              Software Solution
            </h1>

            <p className="gsap-hero-item mt-6 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-[16px]">
              Sell tickets online, at the counter, through agents and onboard the
              bus — all sharing the same routes, schedules, seats and payments.
              No separate systems, no double bookings.
            </p>

            <div className="gsap-hero-item mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Book a Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/features"
                className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-[14px] font-semibold text-text-dark shadow-sm transition-all hover:border-brand/30 hover:text-brand active:scale-[0.97]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <HiOutlinePlay className="ml-px h-3 w-3" />
                </span>
                Explore the Platform
              </Link>
            </div>

            {/* Trust stats */}
            <div className="gsap-hero-item mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-gray-200/80 pt-7">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[18px] font-semibold leading-none text-text-dark">
                        {s.value}
                      </span>
                      <span className="mt-1 block text-[12px] text-text-muted">{s.label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: live bus tracking map ── */}
          <div ref={visualRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <BusLiveMap />
          </div>
        </div>
      </div>
    </section>
  );
}
