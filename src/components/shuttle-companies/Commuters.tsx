"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineLocationMarker,
  HiOutlineLightningBolt,
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlineQrcode,
  HiOutlineRefresh,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineDeviceMobile,
  HiOutlineMap,
  HiOutlineSearch,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const commuterFeatures: { icon: IconType; label: string }[] = [
  { icon: HiOutlineLocationMarker, label: "Location-Based Stop Finder" },
  { icon: HiOutlineLightningBolt, label: "Quick Buy & Ride" },
  { icon: HiOutlineCreditCard, label: "Wallet Integration" },
  { icon: HiOutlineBell, label: "Trip Reminders" },
  { icon: HiOutlineQrcode, label: "Instant QR Ticket" },
  { icon: HiOutlineRefresh, label: "Live Bus Status Updates" },
  { icon: HiOutlineStar, label: "Save Favorite Routes" },
  { icon: HiOutlineClock, label: "Ride History & Rebooking" },
];

export default function Commuters() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.06 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/3 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Smarter Travel for{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Daily Commuters
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            CWTicketing helps riders hop on and off without the hassle. They can
            check nearby stops, track buses in real time, and buy tickets
            straight from their phone.
          </p>
        </div>

        {/* ── Phone mock + copy ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone visual */}
          <div data-gsap>
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-2xl shadow-gray-900/10">
                {/* status row */}
                <div className="flex items-center justify-between px-5 pt-5">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                    <HiOutlineDeviceMobile className="h-3.5 w-3.5 text-brand" />
                    Ride App
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-semibold text-brand">
                    <HiOutlineMap className="h-3 w-3" />
                    Nearby
                  </span>
                </div>

                {/* stop search */}
                <div className="mx-4 mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2.5">
                  <HiOutlineSearch className="h-4 w-4 text-brand" />
                  <span className="text-[12px] font-medium text-text-muted">Central Station</span>
                </div>

                {/* live status */}
                <div className="mx-4 mt-3 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-[11px] font-medium text-text-muted">Bus 12 · Maple St</p>
                    <p className="text-[13px] font-bold text-text-dark">Arriving in 4 min</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineRefresh className="h-4 w-4" />
                  </span>
                </div>

                {/* QR ticket */}
                <div className="mx-4 mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-4 text-white shadow-xl shadow-brand/30">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                      Instant QR Ticket
                    </p>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">
                      <HiOutlineQrcode className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 text-[22px] font-black leading-none tracking-tight">Morning Commute</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/90">
                    <span>Central → Riverside</span>
                    <span>$1.80 · Valid 60 min</span>
                  </div>
                </div>

                {/* quick actions */}
                <div className="grid grid-cols-3 gap-2.5 px-4 py-4">
                  {[
                    { icon: HiOutlineCreditCard, label: "Wallet" },
                    { icon: HiOutlineStar, label: "Favorites" },
                    { icon: HiOutlineBell, label: "Reminders" },
                  ].map((a) => {
                    const Icon = a.icon;
                    return (
                      <div
                        key={a.label}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white py-2.5 transition-colors hover:border-brand/25"
                      >
                        <Icon className="h-4 w-4 text-brand" />
                        <span className="text-[10px] font-medium text-text-muted">{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-5 max-w-[260px] text-[12.5px] font-medium leading-snug text-text-muted">
                Urban commuters boarding a city bus in a structured queue
              </p>
            </div>
          </div>

          {/* Copy */}
          <div data-gsap>
            <div className="mt-6">
              <p className="text-[11.5px] font-semibold uppercase tracking-widest text-text-muted">
                Available on
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["Web Portal", "Android App", "Android POS"].map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-text-body shadow-sm transition-colors hover:border-brand/30 hover:text-brand"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature tiles ── */}
        <div className="mt-16">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              Travel Made Effortless
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commuterFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-brand/10"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-black tracking-widest text-gray-300 transition-colors group-hover:text-brand/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 text-[13.5px] font-medium leading-snug text-text-dark">{f.label}</p>
                  <span className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-amber-400 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}