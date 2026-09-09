"use client";

import { useEffect, useRef, useState } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineDeviceMobile,
  HiOutlineTruck,
  HiOutlineTemplate,
  HiOutlineCheck,
  HiOutlineStar,
  HiOutlineCreditCard,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import type { IconType } from "react-icons";

type ChannelId = "rider" | "driver" | "dispatch";

interface Channel {
  id: ChannelId;
  tab: string;
  icon: IconType;
  title: string;
  desc: string;
  points: string[];
}

const CHANNELS: Channel[] = [
  {
    id: "rider",
    tab: "Passenger App",
    icon: HiOutlineDeviceMobile,
    title: "Branded Passenger App & Web Booking",
    desc: "Your riders book in your colours, under your name. They set pickup and drop-off, see the fare before they confirm, watch the car approach, and pay however they like — app, web, or a quick call to your desk.",
    points: [
      "Instant and scheduled ride booking",
      "Upfront fare estimate before confirming",
      "Live driver tracking and arrival alerts",
      "Saved addresses, trip history and receipts",
    ],
  },
  {
    id: "driver",
    tab: "Driver App",
    icon: HiOutlineTruck,
    title: "Android App for Drivers",
    desc: "Drivers go online, accept the trips they are offered, navigate to the pickup, and close the fare at the drop-off. Duty hours, earnings and commission are all tracked from the same app.",
    points: [
      "One-tap online / offline duty status",
      "Ride offers with pickup distance and fare",
      "Turn-by-turn navigation handoff",
      "Daily earnings and commission summary",
    ],
  },
  {
    id: "dispatch",
    tab: "Dispatch & Admin",
    icon: HiOutlineTemplate,
    title: "Dispatch Console & Admin Dashboard",
    desc: "Your control room on one screen. Watch every vehicle on a live map, take phone bookings straight into the queue, reassign a trip when a driver drops out, and keep an eye on revenue, drivers and fleet health.",
    points: [
      "Live fleet map with vehicle status",
      "Manual dispatch and trip reassignment",
      "Fare rules, zones and surge configuration",
      "Driver, vehicle and revenue reporting",
    ],
  },
];

// ── Mock visuals ─────────────────────────────────────────────────────────────
function RiderMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[228px] overflow-hidden rounded-[30px] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
        <div className="flex justify-center bg-gray-900 pt-2">
          <span className="h-1.5 w-16 rounded-full bg-gray-700" />
        </div>

        <div className="bg-white px-3.5 pb-4 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            Book a Ride
          </p>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-brand" />
              <span className="truncate text-[11px] font-medium text-text-dark">Gulshan 2 Circle</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-text-dark" />
              <span className="truncate text-[11px] font-medium text-text-dark">Shahjalal Airport</span>
            </div>
          </div>

          {/* car options */}
          <div className="mt-3 space-y-2">
            {[
              { n: "Economy", eta: "4 min", p: "৳ 620", active: true },
              { n: "Premium", eta: "7 min", p: "৳ 940", active: false },
            ].map((c) => (
              <div
                key={c.n}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 ${
                  c.active ? "bg-brand-light ring-1 ring-brand/40" : "bg-gray-50 ring-1 ring-gray-200"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    c.active ? "bg-brand text-white" : "bg-white text-text-muted"
                  }`}
                >
                  <HiOutlineTruck className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-bold text-text-dark">{c.n}</span>
                  <span className="block text-[9.5px] text-text-muted">{c.eta} away</span>
                </span>
                <span className="shrink-0 text-[12px] font-black text-text-dark">{c.p}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-brand py-2.5 text-center text-[12px] font-semibold text-white">
            Confirm Ride
          </div>
        </div>
      </div>
    </div>
  );
}

function DriverMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[228px] overflow-hidden rounded-[30px] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
        <div className="flex justify-center bg-gray-900 pt-2">
          <span className="h-1.5 w-16 rounded-full bg-gray-700" />
        </div>

        <div className="px-3.5 pb-4 pt-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
              Driver
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9.5px] font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ONLINE
            </span>
          </div>

          {/* incoming ride */}
          <div className="mt-3 rounded-2xl bg-brand p-3 text-white shadow-lg shadow-brand/30">
            <p className="text-[9.5px] font-bold uppercase tracking-wide text-white/80">
              New ride request
            </p>
            <p className="mt-1.5 text-[13px] font-bold leading-tight">Gulshan 2 → Airport</p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/90">
              <span>2.1 km away</span>
              <span className="font-bold">৳ 620</span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <span className="rounded-lg bg-white/20 py-1.5 text-center text-[10px] font-semibold">
                Decline
              </span>
              <span className="rounded-lg bg-white py-1.5 text-center text-[10px] font-bold text-brand">
                Accept
              </span>
            </div>
          </div>

          {/* today stats */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { l: "Trips", v: "14" },
              { l: "Earnings", v: "৳ 4,280" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-gray-800 px-2.5 py-2 ring-1 ring-gray-700">
                <p className="text-[9.5px] uppercase tracking-wide text-gray-500">{s.l}</p>
                <p className="text-[12.5px] font-bold text-white">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-gray-800 px-3 py-2.5 ring-1 ring-gray-700">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <HiOutlineStar className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-white">4.9 rating</span>
              <span className="block truncate text-[9.5px] text-gray-400">Last 30 days</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DispatchMock() {
  const stats = [
    { icon: HiOutlineTruck, l: "Active cars", v: "48", d: "live" },
    { icon: HiOutlineLightningBolt, l: "Ongoing", v: "31", d: "+8%" },
    { icon: HiOutlineCreditCard, l: "Revenue", v: "৳ 1.4L", d: "+16%" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3 border-b border-gray-800 bg-gray-900/80 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
          <HiOutlineTemplate className="h-4 w-4" />
        </span>
        <p className="text-[12px] font-semibold text-white">Dispatch Console</p>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.l} className="rounded-xl border border-gray-800 bg-gray-800/50 p-2.5">
                <Icon className="h-4 w-4 text-brand" />
                <p className="mt-1.5 truncate text-[9.5px] uppercase tracking-wide text-gray-500">
                  {s.l}
                </p>
                <p className="text-[13px] font-bold text-white">{s.v}</p>
                <p className="text-[9.5px] font-semibold text-emerald-400">{s.d}</p>
              </div>
            );
          })}
        </div>

        {/* live trip queue */}
        <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-300">Live trips</p>
            <p className="text-[9.5px] text-gray-500">Auto-dispatch on</p>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { id: "TR-2041", r: "Banani → Uttara", s: "En route", c: "text-emerald-400" },
              { id: "TR-2042", r: "Dhanmondi → Motijheel", s: "Assigning", c: "text-amber-400" },
              { id: "TR-2043", r: "Mirpur → Gulshan", s: "Pickup", c: "text-sky-400" },
            ].map((t) => (
              <div key={t.id} className="flex items-center gap-2.5">
                <span className="w-14 shrink-0 truncate text-[10px] font-semibold text-gray-300">
                  {t.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-[10px] text-gray-400">{t.r}</span>
                <span className={`shrink-0 text-[9.5px] font-bold ${t.c}`}>{t.s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: HiOutlineUserGroup, l: "Drivers" },
            { icon: HiOutlineClock, l: "Shifts" },
            { icon: HiOutlineChartBar, l: "Reports" },
          ].map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.l}
                className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-800/50 px-2.5 py-2"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-brand" />
                <span className="truncate text-[10.5px] text-gray-300">{q.l}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MOCKS: Record<ChannelId, () => React.JSX.Element> = {
  rider: RiderMock,
  driver: DriverMock,
  dispatch: DispatchMock,
};

export default function TaxiChannels() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ChannelId>("rider");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 32, stagger: 0.08 });
  }, []);

  const channel = CHANNELS.find((c) => c.id === active)!;
  const Mock = MOCKS[active];

  return (
    <section
      ref={sectionRef}
      id="platforms"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-light/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            One System, Three Apps
          </p>
          <h2
            data-gsap
            className="mt-3 text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Built for Riders, Drivers and Dispatchers
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Three interfaces, one live trip record — what the rider sees, what
            the driver taps, and what your control room manages.
          </p>
        </div>

        {/* Tabs */}
        <div data-gsap className="mb-10 flex justify-center lg:mb-12">
          <div
            role="tablist"
            aria-label="Taxi booking platforms"
            className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm"
          >
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition-all duration-200 sm:px-5 sm:text-[13px] ${
                    isActive
                      ? "bg-brand text-white shadow-md shadow-brand/25"
                      : "text-text-muted hover:bg-brand-light hover:text-brand"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {c.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div data-gsap className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" role="tabpanel">
          <div key={`copy-${active}`} className="order-2 animate-panel-in lg:order-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand">
              <channel.icon className="h-5.5 w-5.5" />
            </span>
            <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-text-dark sm:text-[22px]">
              {channel.title}
            </h3>
            <p className="mt-3.5 max-w-lg text-[14px] leading-relaxed text-text-muted">
              {channel.desc}
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {channel.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13px] leading-snug text-text-body">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div key={`mock-${active}`} className="order-1 animate-panel-in lg:order-2">
            <Mock />
          </div>
        </div>
      </div>
    </section>
  );
}
