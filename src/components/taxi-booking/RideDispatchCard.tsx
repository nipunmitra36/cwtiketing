"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlineCreditCard,
  HiOutlineClock,
  HiOutlineTruck,
} from "react-icons/hi";

export default function RideDispatchCard() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.45 });

      tl.fromTo(
        el.querySelector(".gsap-ride-card"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      // Route line draws in
      const path = el.querySelector<SVGPathElement>(".gsap-ride-path");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "-=0.3");
      }

      tl.fromTo(
        el.querySelectorAll(".gsap-ride-pin"),
        { opacity: 0, scale: 0.5, y: -8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.15, ease: "back.out(2.4)" },
        "-=0.9"
      );

      tl.fromTo(
        el.querySelector(".gsap-ride-driver"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        el.querySelectorAll(".gsap-ride-chip"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(2)" },
        "-=0.2"
      );

      // Car glides along the route, looping
      const car = el.querySelector(".gsap-ride-car");
      if (car && path) {
        gsap.fromTo(
          car,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, delay: 1.9 }
        );
        gsap.to(car, {
          duration: 4.5,
          repeat: -1,
          delay: 1.9,
          ease: "none",
          keyframes: [
            { x: 0, y: 0 },
            { x: 96, y: -34 },
            { x: 186, y: -18 },
            { x: 258, y: -78 },
          ],
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="gsap-hero-visual relative mx-auto w-full max-w-[430px] py-4 sm:py-6">
      <div className="gsap-ride-card relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
        {/* Map area */}
        <div className="relative h-[210px] overflow-hidden bg-[#F3F4F6]">
          <svg viewBox="0 0 400 210" className="absolute inset-0 h-full w-full" aria-hidden>
            {/* city blocks */}
            <rect x="16" y="18" width="92" height="58" rx="8" fill="#E9EDF2" />
            <rect x="292" y="26" width="94" height="52" rx="8" fill="#E9EDF2" />
            <rect x="28" y="132" width="104" height="58" rx="8" fill="#E9EDF2" />
            <rect x="272" y="128" width="112" height="62" rx="8" fill="#E9EDF2" />
            {/* streets */}
            <g stroke="#DDE2E9" strokeWidth="8" strokeLinecap="round">
              <line x1="0" y1="105" x2="400" y2="105" />
              <line x1="150" y1="0" x2="150" y2="210" />
              <line x1="258" y1="0" x2="258" y2="210" />
            </g>
            {/* route */}
            <path
              className="gsap-ride-path"
              d="M62 158 C 110 150, 118 120, 150 112 S 214 106, 258 92 S 310 62, 330 44"
              fill="none"
              stroke="#FF6A1C"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* pickup pin */}
          <span className="gsap-ride-pin absolute left-[13%] top-[70%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-brand">
              <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
          </span>

          {/* drop pin */}
          <span className="gsap-ride-pin absolute left-[82%] top-[20%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-dark text-white shadow-lg">
              <HiOutlineLocationMarker className="h-4 w-4" />
            </span>
          </span>

          {/* moving car */}
          <span className="gsap-ride-car absolute left-[13%] top-[70%] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand text-white opacity-0 shadow-lg shadow-brand/40">
            <HiOutlineTruck className="h-4 w-4" />
          </span>

          {/* ETA chip on map */}
          <span className="gsap-ride-chip absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-text-dark shadow-md backdrop-blur">
            <HiOutlineClock className="h-3.5 w-3.5 text-brand" />
            ETA 4 min
          </span>
        </div>

        {/* Trip details */}
        <div className="p-5">
          {/* Stops */}
          <div className="relative pl-6">
            <span className="absolute left-[5px] top-2.5 h-[calc(100%-22px)] w-0.5 bg-gray-200" />
            <div className="relative">
              <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-brand bg-white" />
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-text-muted">Pickup</p>
              <p className="truncate text-[13px] font-semibold text-text-dark">Gulshan 2 Circle</p>
            </div>
            <div className="relative mt-3.5">
              <span className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-text-dark" />
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-text-muted">Drop-off</p>
              <p className="truncate text-[13px] font-semibold text-text-dark">Hazrat Shahjalal Airport</p>
            </div>
          </div>

          {/* Driver row */}
          <div className="gsap-ride-driver mt-5 flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-[13px] font-bold text-white shadow-md shadow-brand/30">
              RK
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[13px] font-bold text-text-dark">Rakib Hasan</span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-amber-500">
                  <HiOutlineStar className="h-3 w-3 fill-current" />
                  4.9
                </span>
              </span>
              <span className="block truncate text-[11px] text-text-muted">
                Toyota Axio · DHA-GA-14-2091
              </span>
            </span>
            <span className="shrink-0 rounded-lg bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">
              On the way
            </span>
          </div>

          {/* Fare row */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-light/50 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
              <HiOutlineCreditCard className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                Estimated fare
              </span>
              <span className="block text-[13px] font-bold text-text-dark">৳ 620 · 14.2 km</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating: drivers nearby */}
      <div className="gsap-ride-chip absolute -bottom-5 -left-2 z-20 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 shadow-lg shadow-brand/10 backdrop-blur-xl sm:-left-6">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <HiOutlineTruck className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-text-dark">
            12 cars nearby
          </span>
          <span className="block text-[10px] text-text-muted">Auto-dispatch on</span>
        </span>
      </div>
    </div>
  );
}
