"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineCube,
  HiOutlineQrcode,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineCash,
  HiOutlineScale,
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineSwitchHorizontal,
  HiOutlineShieldCheck,
  HiOutlineDeviceMobile,
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
    icon: HiOutlineCube,
    title: "Parcel Booking & Waybills",
    desc: "Register a consignment in seconds — sender, receiver, weight, contents and service type — then print a barcoded waybill on the spot.",
  },
  {
    icon: HiOutlineQrcode,
    title: "Barcode & QR Scanning",
    desc: "Every handover is a scan. Booking, hub arrival, dispatch and delivery each write a timestamped entry against the parcel.",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Real-Time Parcel Tracking",
    desc: "One status trail your staff and your customers both see, so nobody has to ring the branch to ask where a shipment is.",
  },
  {
    icon: HiOutlineOfficeBuilding,
    title: "Branch & Hub Management",
    desc: "Run every branch, agent point and sorting hub under one system with its own stock, staff and daily accounts.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Rider & Delivery Agent Management",
    desc: "Assign parcels to riders, watch delivery progress, and hold each agent accountable for what they are carrying.",
  },
  {
    icon: HiOutlineCash,
    title: "Cash on Delivery Settlement",
    desc: "COD is captured against the exact parcel that earned it, then reconciled branch by branch — no more end-of-day guesswork.",
  },
  {
    icon: HiOutlineScale,
    title: "Weight & Distance Based Pricing",
    desc: "Set rate charts by weight slab, distance, route or parcel category, and let the system price every booking automatically.",
  },
  {
    icon: HiOutlineBell,
    title: "SMS & Email Notifications",
    desc: "Senders and receivers get automatic updates at pickup, transit and delivery — fewer calls, fewer disputes.",
  },
  {
    icon: HiOutlineSwitchHorizontal,
    title: "Returns & Reschedule Handling",
    desc: "Failed deliveries, reattempts and return-to-sender parcels all follow a tracked workflow instead of a phone call.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Reports & Analytics",
    desc: "Volume by branch, revenue by route, rider performance and COD outstanding — exportable whenever you need them.",
  },
  {
    icon: HiOutlineDeviceMobile,
    title: "Customer & Rider Mobile Apps",
    desc: "Customers book and track from their phone; riders run their delivery list, scan and collect from the same app.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Role-Based Access Control",
    desc: "Counter staff, branch managers and admins each see exactly what their role allows, with a full audit trail behind it.",
  },
];

export default function ParcelFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.05 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parcel-features"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Split header ── */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div data-gsap>
            <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
              Everything a Parcel Management{" "}
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
                Solution Should Do
              </span>
            </h2>
            <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
          </div>
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            Twelve capabilities that cover the whole parcel lifecycle — from
            the counter where it is booked to the doorstep where the cash is
            collected.
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
