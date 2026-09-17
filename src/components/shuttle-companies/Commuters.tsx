"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlineQrcode,
  HiOutlineRefresh,
  HiOutlineStar,
  HiOutlineDeviceMobile,
  HiOutlineMap,
  HiOutlineSearch,
} from "react-icons/hi";

const MEDIA = "/media/suttle/Travel Made Effortless";

const commuterFeatures: { image: string; label: string }[] = [
  { image: `${MEDIA}/Location-Based Stop Finde.svg`, label: "Location-Based Stop Finder" },
  { image: `${MEDIA}/Quick Buy & Ride.svg`, label: "Quick Buy & Ride" },
  { image: `${MEDIA}/Wallet Integration.svg`, label: "Wallet Integration" },
  { image: `${MEDIA}/Trip Reminders.svg`, label: "Trip Reminders" },
  { image: `${MEDIA}/Instant QR Ticket.svg`, label: "Instant QR Ticket" },
  { image: `${MEDIA}/Live Bus Status Updates.svg`, label: "Live Bus Status Updates" },
  { image: `${MEDIA}/Save Favorite Routes.svg`, label: "Save Favorite Routes" },
  { image: `${MEDIA}/Ride History & Rebooking.svg`, label: "Ride History & Rebooking" },
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
        {/* ── Split header with section image (image left) ── */}
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-gsap className="order-1 overflow-hidden rounded-3xl ring-1 ring-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/suttle/Smarter-Travel-for-Daily-Commuters.jpg"
              alt="Smarter travel for daily commuters"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[400px]"
            />
          </div>
          <div data-gsap className="order-2">
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Smarter Travel for{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Daily Commuters
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
            <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              CWTicketing helps riders hop on and off without the hassle. They can
              check nearby stops, track buses in real time, and buy tickets
              straight from their phone.
            </p>
          </div>
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
            {commuterFeatures.map((f) => {
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-brand-light/30 p-6 text-center shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/15"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-center scale-x-0 bg-gradient-to-r from-brand via-amber-400 to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light via-white to-white p-2 shadow-inner ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-110">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.image}
                      alt={f.label}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="text-[13px] font-semibold leading-snug tracking-tight text-text-dark">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}