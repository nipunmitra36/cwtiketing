"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineTruck,
  HiOutlineMap,
  HiOutlinePaperAirplane,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineOfficeBuilding,
  HiOutlineFlag,
  HiOutlineSun,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Logo {
  name: string;
  icon: IconType;
  color: string;
}

// Single row — scrolls right → left, full width
const logos: Logo[] = [
  { name: "Coachline UK", icon: HiOutlineTruck, color: "text-emerald-600" },
  { name: "Ruta Directa", icon: HiOutlineMap, color: "text-brand" },
  { name: "Falcon Shuttle", icon: HiOutlinePaperAirplane, color: "text-sky-600" },
  { name: "Emerald Coachways", icon: HiOutlineLocationMarker, color: "text-emerald-500" },
  { name: "Pearl Transit", icon: HiOutlineShieldCheck, color: "text-rose-500" },
  { name: "Atlas Coachlines", icon: HiOutlineOfficeBuilding, color: "text-indigo-500" },
  { name: "Union Roadways", icon: HiOutlineFlag, color: "text-amber-500" },
  { name: "Meridian Transit", icon: HiOutlineSun, color: "text-orange-500" },
];

function MarqueeRow({
  logos,
  direction,
  speed = 32,
}: {
  logos: Logo[];
  direction: "left" | "right";
  speed?: number;
}) {
  // duplicate the array so the loop is seamless
  const track = [...logos, ...logos];

  return (
    <div className="group/row relative overflow-hidden">
      <div
        className={`flex w-max items-center gap-4 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
          } [animation-duration:var(--marquee-duration)] group-hover/row:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {track.map((logo, i) => {
          const Icon = logo.icon;
          return (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-gray-100 bg-white px-5 py-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] grayscale transition-all duration-300 ease-out hover:-translate-y-0.5 hover:grayscale-0 hover:shadow-[0_8px_20px_rgba(16,24,40,0.08)]"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 transition-colors duration-300 ${logo.color}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-[14px] font-semibold text-gray-400 transition-colors duration-300 hover:text-text-dark">
                {logo.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
          stagger: 0.1,
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
      className="relative overflow-hidden border-b border-gray-100 bg-white py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p
          data-gsap
          className="mb-10 text-center text-[12px] font-medium uppercase tracking-widest text-text-muted sm:text-[13px]"
        >
          Trusted by transport companies worldwide
        </p>
      </div>

      {/* ── Full-width marquee ── */}
      <div data-gsap className="relative">
        {/* edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <MarqueeRow logos={logos} direction="left" speed={40} />
      </div>
    </section>
  );
}
