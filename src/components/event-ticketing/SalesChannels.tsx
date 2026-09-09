"use client";

import { useEffect, useRef, useState } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineTemplate,
  HiOutlineCheck,
  HiOutlineQrcode,
  HiOutlineTicket,
  HiOutlineTrendingUp,
  HiOutlinePhotograph,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import type { IconType } from "react-icons";

type ChannelId = "website" | "app" | "admin";

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
    id: "website",
    tab: "Website",
    icon: HiOutlineGlobeAlt,
    title: "Website To Sell Tickets",
    desc: "A website is a powerful tool to maximize ticket sales. We build attractive, audience-driven event websites so your target audience can purchase tickets in a few taps and find every detail about your event in one place.",
    points: [
      "Audience-driven event landing pages",
      "Tier selection and live seat picking",
      "Checkout with your payment gateways",
      "Event details, lineup and gallery info",
    ],
  },
  {
    id: "app",
    tab: "Android App",
    icon: HiOutlineDeviceMobile,
    title: "Android App For Ticket Checking",
    desc: "Android apps let your audience purchase tickets straight from their smartphones and learn about your event on the way. Your gate team uses the same app to scan tickets with the built-in QR scanner.",
    points: [
      "Buy tickets from any smartphone",
      "QR scanner for gate check-in",
      "Works fast in busy entry queues",
      "Instant valid / invalid feedback",
    ],
  },
  {
    id: "admin",
    tab: "Admin Dashboard",
    icon: HiOutlineTemplate,
    title: "Admin Dashboard",
    desc: "Manage everything single-handedly from the admin dashboard. Handle ticket sales, fares, the gallery and everything ticket-sale related remotely — from wherever you happen to be running the show.",
    points: [
      "Remote control of ticket sales",
      "Fare and tier management",
      "Gallery and seat map setup",
      "Live sales reports and exports",
    ],
  },
];

// ── Mock visuals ─────────────────────────────────────────────────────────────
function WebsiteMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-300/40">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10.5px] text-text-muted ring-1 ring-gray-200">
          yourevent.com/tickets
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* event banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand via-brand to-brand-dark p-4 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl" />
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
            12 Feb 2026 · Army Stadium
          </p>
          <p className="mt-1 text-[17px] font-semibold leading-tight">Winter Live Fest</p>
          <p className="mt-1 text-[11px] text-white/85">Doors open 6:00 PM</p>
        </div>

        {/* tiers */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { n: "Early Bird", p: "৳ 850" },
            { n: "General", p: "৳ 1,500" },
            { n: "VIP", p: "৳ 3,200" },
          ].map((t, i) => (
            <div
              key={t.n}
              className={`rounded-xl border p-2.5 text-center transition-colors ${
                i === 2 ? "border-brand bg-brand-light" : "border-gray-200 bg-gray-50"
              }`}
            >
              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                {t.n}
              </p>
              <p
                className={`mt-1 text-[13px] font-bold ${
                  i === 2 ? "text-brand" : "text-text-dark"
                }`}
              >
                {t.p}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex-1 rounded-lg bg-brand py-2.5 text-center text-[12px] font-semibold text-white">
            Buy Tickets
          </span>
          <span className="rounded-lg border border-gray-200 px-3.5 py-2.5 text-[12px] font-medium text-text-body">
            Details
          </span>
        </div>
      </div>
    </div>
  );
}

function AppMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[228px] overflow-hidden rounded-[30px] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
        {/* notch */}
        <div className="flex justify-center bg-gray-900 pt-2">
          <span className="h-1.5 w-16 rounded-full bg-gray-700" />
        </div>

        <div className="px-3.5 pb-4 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            Gate Scanner
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-white">Winter Live Fest</p>

          {/* viewfinder */}
          <div className="relative mt-3 aspect-square overflow-hidden rounded-2xl bg-gray-800 ring-1 ring-gray-700">
            <div className="absolute inset-5 rounded-xl border border-dashed border-gray-600" />
            <span className="absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-brand" />
            <span className="absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-brand" />
            <span className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-brand" />
            <span className="absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-brand" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600">
              <HiOutlineQrcode className="h-14 w-14" />
            </span>
          </div>

          {/* result */}
          <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/15 px-3 py-2.5 ring-1 ring-emerald-500/30">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <HiOutlineCheck className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-emerald-300">
                Valid · VIP Pass
              </span>
              <span className="block truncate text-[10px] text-gray-400">
                Seat A-07 · checked in
              </span>
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {[
              { l: "Scanned", v: "1,284" },
              { l: "Remaining", v: "716" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-gray-800 px-2.5 py-2 ring-1 ring-gray-700">
                <p className="text-[9.5px] uppercase tracking-wide text-gray-500">{s.l}</p>
                <p className="text-[12.5px] font-bold text-white">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMock() {
  const stats = [
    { icon: HiOutlineTicket, l: "Tickets Sold", v: "2,000", d: "+18%" },
    { icon: HiOutlineCurrencyDollar, l: "Revenue", v: "৳ 31.4L", d: "+24%" },
    { icon: HiOutlineTrendingUp, l: "Conversion", v: "7.9%", d: "+2.1%" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3 border-b border-gray-800 bg-gray-900/80 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
          <HiOutlineTemplate className="h-4 w-4" />
        </span>
        <p className="text-[12px] font-semibold text-white">Event Control Panel</p>
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
              <div
                key={s.l}
                className="rounded-xl border border-gray-800 bg-gray-800/50 p-2.5"
              >
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

        {/* sales bars */}
        <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-300">Sales by tier</p>
            <p className="text-[9.5px] text-gray-500">Last 7 days</p>
          </div>
          <div className="mt-3 space-y-2.5">
            {[
              { n: "VIP Pass", w: "82%" },
              { n: "General", w: "64%" },
              { n: "Early Bird", w: "97%" },
            ].map((b) => (
              <div key={b.n} className="flex items-center gap-2.5">
                <span className="w-16 shrink-0 truncate text-[10px] text-gray-400">{b.n}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-700">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-brand to-amber-400"
                    style={{ width: b.w }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right text-[10px] font-semibold text-gray-300">
                  {b.w}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* quick manage row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: HiOutlineCurrencyDollar, l: "Fares" },
            { icon: HiOutlinePhotograph, l: "Gallery" },
            { icon: HiOutlineTicket, l: "Tickets" },
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
  website: WebsiteMock,
  app: AppMock,
  admin: AdminMock,
};

export default function SalesChannels() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ChannelId>("website");

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
      id="sales-channels"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-light/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <p
            data-gsap
            className="text-[13px] font-semibold uppercase tracking-widest text-brand"
          >
            Multiple Platforms
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Three Channels That Maximize Your Ticket Sales
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            Sell on the web, check in at the gate, and run the whole thing from
            one panel — every channel connected to the same ticket inventory.
          </p>
        </div>

        {/* Tabs */}
        <div data-gsap className="mb-10 flex justify-center lg:mb-12">
          <div
            role="tablist"
            aria-label="Ticket sales platforms"
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
        <div
          data-gsap
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          role="tabpanel"
        >
          {/* copy */}
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

          {/* mock */}
          <div key={`mock-${active}`} className="order-1 animate-panel-in lg:order-2">
            <Mock />
          </div>
        </div>
      </div>
    </section>
  );
}
