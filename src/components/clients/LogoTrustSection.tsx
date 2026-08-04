"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlinePaperAirplane,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineGlobe,
  HiOutlineTicket,
  HiOutlineTrendingUp,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Logo {
  name: string;
  icon: IconType;
  color: string;
}

const logos: Logo[] = [
  { name: "Coachline UK", icon: HiOutlineTruck, color: "text-emerald-600" },
  { name: "Ruta Directa", icon: HiOutlineMap, color: "text-brand" },
  { name: "Falcon Shuttle", icon: HiOutlinePaperAirplane, color: "text-sky-600" },
  { name: "Emerald Coachways", icon: HiOutlineLocationMarker, color: "text-emerald-500" },
  { name: "Pearl Transit", icon: HiOutlineShieldCheck, color: "text-rose-500" },
];

const stats = [
  { icon: HiOutlineUsers, value: "50+", label: "Operators" },
  { icon: HiOutlineGlobe, value: "10+", label: "Countries" },
  { icon: HiOutlineTicket, value: "1M+", label: "Bookings processed" },
  { icon: HiOutlineTrendingUp, value: "99.9%", label: "Uptime" },
];

export default function LogoTrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll("[data-gsap]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="customers"
      className="relative border-b border-gray-100 bg-white py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          data-gsap
          className="mb-10 text-center text-[12px] font-medium uppercase tracking-widest text-text-muted sm:text-[13px]"
        >
          Trusted by transport companies worldwide
        </p>

        {/* ── Logo wall ── */}
        <div
          data-gsap
          className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5"
        >
          {logos.map((logo) => {
            const Icon = logo.icon;
            return (
              <div
                key={logo.name}
                className="group flex items-center justify-center gap-2.5 grayscale transition-all duration-300 hover:grayscale-0"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-300 group-hover:bg-white ${logo.color}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[14px] font-semibold text-gray-400 transition-colors duration-300 group-hover:text-text-dark">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Stats ── */}
        <div
          data-gsap
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white px-6 py-6 text-center">
                <Icon className="mx-auto mb-2 h-5 w-5 text-brand" />
                <p className="text-2xl font-bold tracking-tight text-text-dark lg:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[12px] text-text-muted sm:text-[13px]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
