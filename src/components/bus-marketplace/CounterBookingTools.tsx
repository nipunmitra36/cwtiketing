"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineTicket,
  HiOutlineClipboardList,
  HiOutlineMap,
  HiOutlinePrinter,
  HiOutlineCash,
  HiOutlineDesktopComputer,
  HiOutlineUserGroup,
  HiOutlineSwitchHorizontal,
  HiOutlineCalculator,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import type { IconType } from "react-icons";

const counterFeatures: { icon: IconType; label: string }[] = [
  { icon: HiOutlineTicket, label: "Walk-in Ticket Issuance" },
  { icon: HiOutlineClipboardList, label: "Passenger Manifest" },
  { icon: HiOutlineMap, label: "Route & Schedule Access" },
  { icon: HiOutlinePrinter, label: "E-Ticket Printing & SMS Confirmation" },
  { icon: HiOutlineCash, label: "Booking by Cash, Card, or QR Code" },
  { icon: HiOutlineDesktopComputer, label: "POS-Compatible Interface" },
  { icon: HiOutlineUserGroup, label: "Fleet/Staff Assignment" },
  { icon: HiOutlineSwitchHorizontal, label: "Ticket Management (Cancellation + Rescheduling)" },
  { icon: HiOutlineCalculator, label: "Counter Expense Management" },
];

const SEAT_STATES = ["sold", "free", "free", "sold", "selected", "free", "sold", "free", "free", "sold", "free", "free"] as const;

export default function CounterBookingTools() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Sell Smarter and{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Serve Faster
              </span>{" "}
              with Less Effort
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Help passengers quickly, manage bookings with ease, and keep lines
            moving. CWTicketing lets your team book seats, check availability,
            assign tickets, and print or issue e-tickets in real time. Designed
            for busy terminals, it keeps your operations smooth, even during
            rush hours.
          </p>
        </div>

        {/* ── Copy + POS terminal ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-gsap>
            <p className="text-[15px] leading-relaxed text-text-body sm:text-[16px]">
              Your terminal staff gets everything needed to issue, manage and
              settle tickets — without ever leaving the counter screen.
            </p>

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

          {/* POS terminal mock */}
          <div data-gsap>
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </span>
                    <span className="ml-1 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                      Terminal POS
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <HiOutlineDesktopComputer className="h-3 w-3" />
                    Android
                  </span>
                </div>

                <div className="flex items-center justify-between px-5 pt-4">
                  <p className="text-[13px] font-bold text-text-dark">Route 24 · Intercity Express</p>
                  <p className="text-[11px] text-text-muted">Boarding · 09:15 AM</p>
                </div>

                <div className="mx-5 mt-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                      Seat Availability
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600">6 seats left</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {SEAT_STATES.map((s, i) => (
                      <span
                        key={i}
                        className={`flex h-8 items-center justify-center rounded-lg text-[10px] font-bold ${
                          s === "sold"
                            ? "bg-gray-200 text-gray-400"
                            : s === "selected"
                              ? "bg-brand text-white shadow-md shadow-brand/30"
                              : "bg-white text-text-muted ring-1 ring-gray-200"
                        }`}
                      >
                        {i + 1}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mx-5 my-4 flex items-center gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-light/50 p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <HiOutlineTicket className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold text-text-dark">Seat 5 · One Way</p>
                    <p className="text-[10.5px] text-text-muted">Cash / Card / QR</p>
                  </div>
                  <span className="hidden items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-600 sm:flex">
                    <HiOutlineCurrencyDollar className="h-3 w-3" />
                    Issued
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="mt-16">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              On-the-Spot Booking &amp; Ticketing Tools
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {counterFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-[12.5px] font-medium leading-snug text-text-dark">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
