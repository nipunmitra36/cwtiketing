"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineX,
  HiOutlineCheck,
  HiOutlinePhone,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineTicket,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineChartBar,
} from "react-icons/hi";

const problems = [
  { icon: HiOutlinePhone, label: "Manual booking calls", desc: "Phone, WhatsApp, and paper logs eat hours every day." },
  { icon: HiOutlineDocumentText, label: "Spreadsheet schedules", desc: "Outdated timetables that nobody trusts." },
  { icon: HiOutlineClock, label: "No real-time availability", desc: "Sold-out confusion and double bookings." },
  { icon: HiOutlineCurrencyDollar, label: "Payment tracking problems", desc: "Missed revenue and cash reconciliation headaches." },
];

const solutions = [
  { icon: HiOutlineTicket, label: "Automated booking", desc: "Online bookings 24/7 with instant confirmation." },
  { icon: HiOutlineViewGrid, label: "Live seat availability", desc: "Real-time seat maps that always match reality." },
  { icon: HiOutlineCreditCard, label: "Online payments", desc: "Multiple secure gateways accepted automatically." },
  { icon: HiOutlineChartBar, label: "Business analytics", desc: "See sales and revenue at a glance, daily." },
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      gsap.fromTo(
        el.querySelectorAll("[data-gsap]"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
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
      id="why-cw-ticketing"
      className="relative overflow-hidden bg-gradient-to-b from-white to-surface py-16 lg:py-24"
    >
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-light/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            data-gsap
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
          >
            Before / After
          </span>
          <h2
            data-gsap
            className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
          >
            Why Operators Move to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">CW Ticketing</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
            </span>
          </h2>
          <p
            data-gsap
            className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
          >
            The way most transport operators sell tickets is broken. Here is
            what changes with CW Ticketing.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ── Before ── */}
          <div
            data-gsap
            className="relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-6 shadow-lg shadow-rose-100/50 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-50 blur-2xl" />
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <HiOutlineX className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-rose-400">
                  Before
                </p>
                <h3 className="text-lg font-bold text-text-dark">Old-School Ticketing</h3>
              </div>
            </div>
            <ul className="space-y-3.5">
              {problems.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-500">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-text-dark">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] text-text-muted">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── After ── */}
          <div
            data-gsap
            className="relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand-light to-white p-6 shadow-xl shadow-brand/10 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/30">
                <HiOutlineCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">
                  After
                </p>
                <h3 className="text-lg font-bold text-text-dark">CW Ticketing</h3>
              </div>
            </div>
            <ul className="space-y-3.5">
              {solutions.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-xl border border-brand/10 bg-white px-4 py-3.5 shadow-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-text-dark">{item.label}</p>
                      <p className="mt-0.5 text-[12.5px] text-text-muted">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
