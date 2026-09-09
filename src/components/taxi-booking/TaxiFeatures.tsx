"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCalculator,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineStar,
  HiOutlineChartBar,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: HiOutlineDeviceMobile,
    title: "Multi-Channel Ride Booking",
    desc: "Passengers book from your branded app, your website, or by calling the desk — every request lands in the same queue.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Automatic Driver Dispatch",
    desc: "The system finds the nearest free driver and assigns the trip in seconds, with manual override whenever dispatchers need it.",
  },
  {
    icon: HiOutlineCalendar,
    title: "Instant & Scheduled Rides",
    desc: "Take a ride right now or book one for next Tuesday at 6 AM — airport runs and recurring trips included.",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Live GPS Trip Tracking",
    desc: "Riders watch their car approach; your control room sees every vehicle, route and trip status on one live map.",
  },
  {
    icon: HiOutlineCalculator,
    title: "Fare Estimation & Metering",
    desc: "Quote the fare before the ride, then meter it by distance, time and waiting — with surge, night and zone rules you define.",
  },
  {
    icon: HiOutlineCreditCard,
    title: "Cash, Card & Wallet Payments",
    desc: "Passengers pay however they prefer, in-app or in the car, and every trip closes with a digital receipt.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Driver Management & Commission",
    desc: "Onboard drivers, verify documents, track duty hours, and calculate commission or rental automatically each cycle.",
  },
  {
    icon: HiOutlineTruck,
    title: "Fleet & Vehicle Management",
    desc: "Track vehicles, registration and fitness expiry, service schedules and which car is assigned to which driver.",
  },
  {
    icon: HiOutlineStar,
    title: "Ratings & Rider Feedback",
    desc: "Two-way ratings after every trip, so you know which drivers earn repeat riders and which need attention.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Corporate & Account Billing",
    desc: "Give companies, hotels and hospitals their own accounts with monthly invoicing instead of per-trip payment.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Reports & Analytics",
    desc: "Trips per driver, revenue by zone, peak hours, cancellations and idle time — exportable whenever you need them.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Safety & SOS Controls",
    desc: "Trip sharing, an in-app emergency button, and a complete trip history behind every ride you operate.",
  },
];

export default function TaxiFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="taxi-features"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Everything Your Taxi Booking{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Software Should Do
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Twelve capabilities covering the whole ride cycle — from the moment
            a passenger opens the app to the day you pay your drivers.
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <article
                key={f.title}
                data-gsap
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-dark transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold tracking-widest text-text-muted/60">
                    {idx}
                    <HiOutlineArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </span>
                </div>

                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-text-dark">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
