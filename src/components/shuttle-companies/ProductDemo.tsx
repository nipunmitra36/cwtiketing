"use client";

import { useEffect, useRef, useState } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineDesktopComputer,
  HiOutlineTruck,
  HiOutlineCheck,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Slide {
  icon: IconType;
  label: string;
  title: string;
}

const slides: Slide[] = [
  { icon: HiOutlineGlobeAlt, label: "Website", title: "Book from any browser" },
  { icon: HiOutlineDeviceMobile, label: "Passenger App", title: "Buy tickets on the go" },
  { icon: HiOutlineDesktopComputer, label: "Counter Panel", title: "Serve walk-ins fast" },
  { icon: HiOutlineTruck, label: "Driver App", title: "Scan, board, depart" },
];

const highlights = [
  "Live seat maps & instant booking",
  "Real-time bus tracking for every route",
  "Counter and agent tools built in",
  "Branded apps for web, Android & POS",
];

const AUTO_MS = 3500;

export default function ProductDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.06 });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Product{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Demo
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            One platform, every surface your business runs on — from the
            passenger&apos;s phone to the counter to the driver&apos;s seat.
          </p>
        </div>

        {/* ── Content + auto-sliding visual ── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-gsap>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13.5px] leading-snug text-text-dark">{h}</span>
                </li>
              ))}
            </ul>

            {/* Slide switcher (mirrors the auto-advancing image) */}
            <div className="mt-7 flex flex-wrap gap-2">
              {slides.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-300 ${
                      isActive
                        ? "border-brand bg-brand text-white shadow-md shadow-brand/30"
                        : "border-gray-200 bg-white text-text-muted hover:border-brand/30 hover:text-brand"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            data-gsap
            className="relative mx-auto w-full max-w-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
              <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-5 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                <span className="ml-2 flex flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-text-muted ring-1 ring-gray-200">
                  cwticketing.com
                </span>
              </div>

              <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-brand-light/60 to-white sm:h-[320px]">
                {slides.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center transition-opacity duration-700 ease-in-out ${
                        i === active ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand text-white shadow-xl shadow-brand/30">
                        <Icon className="h-10 w-10" />
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold uppercase tracking-wide text-brand">
                          {s.label}
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-text-dark">{s.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-label={`Show ${s.label} slide`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-6 bg-brand" : "w-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
