"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineQrcode,
  HiOutlineCube,
  HiOutlineCheck,
  HiOutlineTruck,
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineCash,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Step {
  icon: IconType;
  label: string;
  meta: string;
  done: boolean;
}

const STEPS: Step[] = [
  { icon: HiOutlineCube, label: "Parcel booked", meta: "Dhaka Branch · 09:12 AM", done: true },
  { icon: HiOutlineOfficeBuilding, label: "Arrived at hub", meta: "Central Hub · 02:40 PM", done: true },
  { icon: HiOutlineTruck, label: "In transit", meta: "Route 24 · Dhaka → Sylhet", done: true },
  { icon: HiOutlineLocationMarker, label: "Out for delivery", meta: "Rider: Karim H. · 08:05 AM", done: false },
];

export default function ParcelTrackingCard() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.45 });

      tl.fromTo(
        el.querySelector(".gsap-parcel-card"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      tl.fromTo(
        el.querySelectorAll(".gsap-parcel-step"),
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        el.querySelectorAll(".gsap-parcel-chip"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(2)" },
        "-=0.2"
      );

      // Progress rail fills to the active step
      const rail = el.querySelector<HTMLElement>(".gsap-parcel-rail");
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.1, delay: 0.9, ease: "power2.inOut", transformOrigin: "top" }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="gsap-hero-visual relative mx-auto w-full max-w-[430px] py-4 sm:py-6">
      <div className="gsap-parcel-card relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
        {/* Waybill header */}
        <div className="relative bg-gradient-to-br from-brand to-brand-dark p-5 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                Waybill No.
              </p>
              <p className="mt-1 truncate text-[19px] font-black tracking-tight">CW-8421-3097</p>
              <p className="mt-1 text-[11px] text-white/85">Dhaka → Sylhet · 2.4 kg</p>
            </div>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-text-dark">
              <HiOutlineQrcode className="h-8 w-8" />
            </span>
          </div>
        </div>

        {/* Tracking timeline */}
        <div className="relative p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
            Live Tracking
          </p>

          <div className="relative">
            {/* rail */}
            <span className="absolute left-[15px] top-2 h-[calc(100%-24px)] w-0.5 bg-gray-100" />
            <span className="gsap-parcel-rail absolute left-[15px] top-2 h-[calc(100%-24px)] w-0.5 origin-top bg-gradient-to-b from-brand to-amber-400" />

            <ul className="relative space-y-4">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label} className="gsap-parcel-step flex items-start gap-3.5">
                    <span
                      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${
                        s.done
                          ? "bg-brand text-white shadow-md shadow-brand/30"
                          : "bg-white text-brand ring-4 ring-white outline outline-2 outline-dashed outline-brand/40"
                      }`}
                    >
                      {s.done ? <HiOutlineCheck className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block truncate text-[13px] font-semibold text-text-dark">
                        {s.label}
                      </span>
                      <span className="block truncate text-[11px] text-text-muted">{s.meta}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COD row */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-light/50 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
              <HiOutlineCash className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                Cash on Delivery
              </span>
              <span className="block text-[13px] font-bold text-text-dark">৳ 1,850 · to collect</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating: delivered chip */}
      <div className="gsap-parcel-chip absolute -bottom-5 -left-2 z-20 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 shadow-lg shadow-brand/10 backdrop-blur-xl sm:-left-6">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <HiOutlineCheck className="h-4.5 w-4.5" />
        </span>
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wide text-text-dark">
            1,284 delivered
          </span>
          <span className="block text-[10px] text-text-muted">This week</span>
        </span>
      </div>

      {/* Floating: SMS chip */}
      <div className="gsap-parcel-chip absolute -right-1 top-4 z-20 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/95 px-3 py-2 shadow-lg shadow-brand/10 backdrop-blur-xl sm:flex lg:-right-5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
          <HiOutlineTruck className="h-4 w-4" />
        </span>
        <span className="text-[10.5px] font-semibold leading-tight text-text-dark">
          SMS sent
          <span className="block font-normal text-text-muted">to receiver</span>
        </span>
      </div>
    </div>
  );
}
