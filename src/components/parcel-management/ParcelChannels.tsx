"use client";

import { useEffect, useRef, useState } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineTemplate,
  HiOutlineCheck,
  HiOutlineQrcode,
  HiOutlineCube,
  HiOutlineCash,
  HiOutlineSearch,
  HiOutlineTruck,
  HiOutlineChartBar,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import type { IconType } from "react-icons";

type ChannelId = "counter" | "rider" | "admin";

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
    id: "counter",
    tab: "Branch Counter",
    icon: HiOutlineDesktopComputer,
    title: "Counter & Branch Booking",
    desc: "The screen your booking staff live on. Register a parcel, weigh it, price it against your rate chart, take payment and print the barcoded waybill — all before the customer leaves the counter.",
    points: [
      "Fast parcel entry with saved customers",
      "Automatic weight and distance pricing",
      "Barcoded waybill printing",
      "Daily branch cash and stock reports",
    ],
  },
  {
    id: "rider",
    tab: "Rider App",
    icon: HiOutlineDeviceMobile,
    title: "Android App for Riders",
    desc: "Delivery agents carry their whole route in their pocket. They scan parcels at pickup, follow their delivery list, capture proof of delivery, and record the cash they collect on the doorstep.",
    points: [
      "Assigned delivery list per rider",
      "QR and barcode scanning at every handover",
      "Proof of delivery capture",
      "Cash on delivery recorded at the door",
    ],
  },
  {
    id: "admin",
    tab: "Admin Dashboard",
    icon: HiOutlineTemplate,
    title: "Central Admin Dashboard",
    desc: "Run the whole network from one panel. Watch parcel volume by branch, monitor what is stuck in transit, review rider performance, and see exactly how much cash on delivery is still outstanding.",
    points: [
      "Live volume and revenue by branch",
      "Outstanding COD tracking",
      "Rate chart and service configuration",
      "Staff roles and permissions",
    ],
  },
];

// ── Mock visuals ─────────────────────────────────────────────────────────────
function CounterMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-300/40">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          New Parcel Booking
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3">
          {[
            { l: "Sender", v: "Rahim Traders" },
            { l: "Receiver", v: "S. Ahmed" },
            { l: "From", v: "Dhaka Branch" },
            { l: "To", v: "Sylhet Branch" },
          ].map((f) => (
            <div key={f.l} className="rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-2">
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-text-muted">{f.l}</p>
              <p className="mt-0.5 truncate text-[12px] font-semibold text-text-dark">{f.v}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { l: "Weight", v: "2.4 kg" },
            { l: "Type", v: "Fragile" },
            { l: "Service", v: "Express" },
          ].map((f) => (
            <div key={f.l} className="rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-center">
              <p className="text-[9.5px] uppercase tracking-wide text-text-muted">{f.l}</p>
              <p className="text-[12px] font-bold text-text-dark">{f.v}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-light/50 p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <HiOutlineQrcode className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-text-dark">CW-8421-3097</p>
            <p className="text-[10.5px] text-text-muted">Waybill ready to print</p>
          </div>
          <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">
            Print
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3.5 py-2.5">
          <span className="text-[11.5px] font-medium text-text-muted">Total charge</span>
          <span className="text-[15px] font-black tracking-tight text-brand">৳ 320</span>
        </div>
      </div>
    </div>
  );
}

function RiderMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[228px] overflow-hidden rounded-[30px] border-[6px] border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
        <div className="flex justify-center bg-gray-900 pt-2">
          <span className="h-1.5 w-16 rounded-full bg-gray-700" />
        </div>

        <div className="px-3.5 pb-4 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
            My Deliveries
          </p>
          <p className="mt-0.5 text-[13px] font-semibold text-white">Today · 18 parcels</p>

          <div className="mt-3 space-y-2">
            {[
              { id: "CW-8421", area: "Zindabazar", status: "done" },
              { id: "CW-8434", area: "Amberkhana", status: "next" },
              { id: "CW-8440", area: "Subid Bazar", status: "queued" },
            ].map((p) => (
              <div
                key={p.id}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 ring-1 ${
                  p.status === "next"
                    ? "bg-brand/15 ring-brand/40"
                    : "bg-gray-800 ring-gray-700"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    p.status === "done"
                      ? "bg-emerald-500 text-white"
                      : p.status === "next"
                        ? "bg-brand text-white"
                        : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {p.status === "done" ? (
                    <HiOutlineCheck className="h-4 w-4" />
                  ) : (
                    <HiOutlineCube className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold text-white">{p.id}</span>
                  <span className="block truncate text-[10px] text-gray-400">{p.area}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/15 px-3 py-2.5 ring-1 ring-emerald-500/30">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <HiOutlineCash className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-emerald-300">COD collected</span>
              <span className="block truncate text-[10px] text-gray-400">৳ 14,200 today</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMock() {
  const stats = [
    { icon: HiOutlineCube, l: "Parcels", v: "3,412", d: "+12%" },
    { icon: HiOutlineTruck, l: "In transit", v: "486", d: "live" },
    { icon: HiOutlineCash, l: "COD due", v: "৳ 8.2L", d: "-6%" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-3 border-b border-gray-800 bg-gray-900/80 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
          <HiOutlineTemplate className="h-4 w-4" />
        </span>
        <p className="text-[12px] font-semibold text-white">Parcel Control Panel</p>
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

        <div className="rounded-xl border border-gray-800 bg-gray-800/50 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-300">Volume by branch</p>
            <p className="text-[9.5px] text-gray-500">Last 7 days</p>
          </div>
          <div className="mt-3 space-y-2.5">
            {[
              { n: "Dhaka", w: "94%" },
              { n: "Chattogram", w: "71%" },
              { n: "Sylhet", w: "58%" },
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

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: HiOutlineOfficeBuilding, l: "Branches" },
            { icon: HiOutlineSearch, l: "Trace" },
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
  counter: CounterMock,
  rider: RiderMock,
  admin: AdminMock,
};

export default function ParcelChannels() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ChannelId>("counter");

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
            One System, Three Screens
          </p>
          <h2
            data-gsap
            className="mt-3 text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]"
          >
            Built for the Counter, the Road and the Head Office
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            Every role gets the interface it actually needs — all reading and
            writing to the same parcel record.
          </p>
        </div>

        {/* Tabs */}
        <div data-gsap className="mb-10 flex justify-center lg:mb-12">
          <div
            role="tablist"
            aria-label="Parcel management platforms"
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
