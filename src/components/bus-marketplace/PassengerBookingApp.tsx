"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineRefresh,
  HiOutlineCurrencyDollar,
  HiOutlineSwitchHorizontal,
  HiOutlineBell,
  HiOutlineStar,
  HiOutlineTranslate,
  HiOutlineShoppingCart,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
  HiOutlineLocationMarker,
  HiOutlineQrcode,
  HiOutlineMap,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const passengerFeatures: { icon: IconType; label: string }[] = [
  { icon: HiOutlineSearch, label: "Smart Search" },
  { icon: HiOutlineViewGrid, label: "Interactive Seat Maps" },
  { icon: HiOutlineRefresh, label: "Real-Time Availability" },
  { icon: HiOutlineCurrencyDollar, label: "Multicurrency" },
  { icon: HiOutlineSwitchHorizontal, label: "Price and Route Comparison" },
  { icon: HiOutlineBell, label: "E-Tickets & Notifications" },
  { icon: HiOutlineStar, label: "Rating & Reviews" },
  { icon: HiOutlineTranslate, label: "Multilingual" },
  { icon: HiOutlineShoppingCart, label: "Ticket Purchase" },
  { icon: HiOutlineCreditCard, label: "Available Payment Gateways" },
  { icon: HiOutlineUserCircle, label: "User Profile" },
  { icon: HiOutlineLocationMarker, label: "Fleet Tracking" },
];

export default function PassengerBookingApp() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/3 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Fast, Flexible, and{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Friendly Bus Booking
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            With our easy-to-use platform, passengers can quickly find routes,
            check live seat availability, compare fares, and book tickets.
            Select a seat from an interactive map, choose a preferred payment
            method, and receive an e-ticket instantly — in their own language
            and currency, for a smooth, stress-free journey.
          </p>
        </div>

        {/* ── Phone mock + copy ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-gsap>
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-2xl shadow-gray-900/10">
                <div className="flex items-center justify-between px-5 pt-5">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                    <HiOutlineViewGrid className="h-3.5 w-3.5 text-brand" />
                    Booking App
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-semibold text-brand">
                    <HiOutlineMap className="h-3 w-3" />
                    3 routes found
                  </span>
                </div>

                <div className="mx-4 mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2.5">
                  <HiOutlineSearch className="h-4 w-4 text-brand" />
                  <span className="text-[12px] font-medium text-text-muted">Dhaka → Cox&apos;s Bazar</span>
                </div>

                <div className="mx-4 mt-3 flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-[11px] font-medium text-text-muted">Fare comparison</p>
                    <p className="text-[13px] font-bold text-text-dark">3 fares from ৳ 850</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineSwitchHorizontal className="h-4 w-4" />
                  </span>
                </div>

                <div className="mx-4 mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-4 text-white shadow-xl shadow-brand/30">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">
                      Instant E-Ticket
                    </p>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">
                      <HiOutlineQrcode className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 text-[22px] font-black leading-none tracking-tight">Seat 14 · A1</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-white/90">
                    <span>Dhaka → Cox&apos;s Bazar</span>
                    <span>৳ 1,200 · Confirmed</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 px-4 py-4">
                  {[
                    { icon: HiOutlineCreditCard, label: "Payments" },
                    { icon: HiOutlineStar, label: "Reviews" },
                    { icon: HiOutlineTranslate, label: "Language" },
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
            </div>
          </div>

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
              Digital-First Travel Experience
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {passengerFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
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
