"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, playOnce } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import { createSectionReveal } from "@/lib/gsap/reveal";
import {
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineCreditCard,
  HiOutlineTemplate,
  HiOutlineMap,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineTicket,
  HiOutlineCube,
} from "react-icons/hi";
import { FaBus, FaTrain, FaTaxi, FaShip } from "react-icons/fa";

// ── Flowchart primitives ──────────────────────────────────────────

function FlowLine() {
  return <div data-gsap className="mx-auto h-6 w-px bg-gray-200" />;
}

function FlowNode({
  icon: Icon,
  label,
  badgeClass,
  round = false,
  centered = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badgeClass: string;
  round?: boolean;
  centered?: boolean;
}) {
  return (
    <div
      data-gsap
      className={`mx-auto flex w-full max-w-[230px] items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm sm:max-w-[240px] sm:gap-3 sm:px-4 sm:py-3 ${centered ? "justify-center" : ""
        }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center text-white shadow-sm ${round ? "rounded-full" : "rounded-lg"
          } bg-gradient-to-br ${badgeClass}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="min-w-0 text-[12px] font-semibold leading-tight text-text-dark sm:text-[12.5px]">
        {label}
      </p>
    </div>
  );
}

function MobileConnector() {
  return (
    <div data-gsap aria-hidden="true" className="flex flex-col items-center py-1">
      <span className="h-5 w-0.5 rounded-full bg-gradient-to-b from-brand/60 to-brand/20" />
      <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
    </div>
  );
}

// Modes named in the About copy
const transportModes = [
  { icon: FaBus, label: "Bus" },
  { icon: FaTrain, label: "Train" },
  { icon: FaTaxi, label: "Taxi" },
  { icon: FaShip, label: "Cruise" },
  { icon: HiOutlineTicket, label: "Event" },
  { icon: HiOutlineCube, label: "Parcel" },
];

// Same figures as the home hero
const aboutStats = [
  { value: "2500+", label: "Transport companies" },
  { value: "99.9%", label: "Platform uptime" },
  { value: "24/7", label: "Support" },
];

const passengerSteps = [
  { icon: HiOutlineSearch, label: "Search Route", badgeClass: "from-brand to-brand-hover" },
  { icon: HiOutlineViewGrid, label: "Select Seat", badgeClass: "from-brand to-brand-hover" },
  { icon: HiOutlineCreditCard, label: "Online Payment", badgeClass: "from-brand to-brand-hover" },
];

const platformModules = [
  { icon: HiOutlineTemplate, label: "Dashboard" },
  { icon: HiOutlineMap, label: "Routes" },
  { icon: HiOutlineCurrencyDollar, label: "Revenue" },
  { icon: HiOutlineChartBar, label: "Analytics" },
  { icon: HiOutlineUserGroup, label: "Drivers" },
  { icon: HiOutlineClipboardList, label: "Reports" },
];

export default function AboutHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const forkPathRefs = useRef<Array<SVGPathElement | null>>([]);

  // Base scroll-reveal for every [data-gsap] element in the section.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 28, stagger: 0.06 });
  }, []);

  // Draw the fork (decision → PASSENGER / ADMIN) connectors in as the
  // flowchart scrolls into view. Waits for the smoother so trigger positions
  // are measured against the smoothed scroller (otherwise they misfire on phones).
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        forkPathRefs.current.forEach((path) => {
          // Skip when the desktop flowchart is hidden (phone layout)
          if (!path || !path.ownerSVGElement?.getClientRects().length) return;
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: path, start: "top 85%", ...playOnce },
          });
        });
      }, sectionRef);
    });

    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-cw-ticketing"
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-24"
    >
      <div className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-brand-light/60 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── About: premium two-column intro ── */}
        <div className="mb-16 grid items-center gap-10 sm:mb-20 lg:mb-24 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-7">
            <span
              data-gsap
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-brand shadow-sm backdrop-blur"
            >
              <HiOutlineSparkles className="h-3.5 w-3.5" />
              About CWTicketing
            </span>

            <h2
              data-gsap
              className="mt-5 text-[28px] font-semibold leading-[1.15] tracking-tight text-text-dark sm:text-[36px] lg:text-[44px]"
            >
              Complete White-Label Online Ticket Booking System for{" "}
              <span className="text-gradient-brand">
                Transport &amp; Mobility
              </span>{" "}
              Businesses
            </h2>

            <div data-gsap className="mt-6 space-y-4 text-[15px] leading-[1.8] text-text-muted sm:text-[16.5px]">
              <p>
                <span className="font-medium text-text-dark">CWTicketing</span> is a
                complete white-label online ticket booking system designed for transport
                operators, travel companies, and mobility businesses. It helps businesses
                launch their own branded booking system where passengers can search routes,
                check seat availability, make payments, and manage bookings through web and
                mobile apps.
              </p>
              <p>
                From bus and train reservations to taxi, cruise, event, and other
                transportation services, CWTicketing provides the tools operators need to
                automate ticket sales, manage daily operations, and deliver a better passenger
                experience — from one centralized system.
              </p>
            </div>

            <div data-gsap className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact-us"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40 active:scale-[0.97]"
              >
                Book a Demo
                <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Showcase card */}
          <div data-gsap className="relative lg:col-span-5">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/20 via-amber-200/30 to-transparent blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/90 p-5 shadow-2xl shadow-gray-900/10 backdrop-blur sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

              <div className="flex items-center justify-between">
                <p className="text-[15px] font-semibold text-text-dark">One platform, every mode</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  White-label
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                {transportModes.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50/70 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-brand-light/60"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm ring-1 ring-brand/15 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[12.5px] font-semibold text-text-dark">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-5">
                {aboutStats.map((s) => (
                  <div key={s.label} className="px-2 text-center first:pl-0 last:pr-0">
                    <p className="text-[20px] font-semibold tracking-tight text-text-dark sm:text-[24px]">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-text-muted sm:text-[12px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── How it works: branching flowchart ── */}
        <div>
          <div data-gsap className="mx-auto mb-8 max-w-2xl text-center sm:mb-12 lg:mb-14">
            <h3 className="text-balance text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px] lg:text-[28px]">
              From search to ticket, <span className="text-gradient-brand">in one flow</span>
            </h3>
          </div>

          {/* ── Phone: vertical hub → passenger journey → admin console ── */}
          <div className="mx-auto max-w-md sm:hidden">
            {/* Hub */}
            <div
              data-gsap
              className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-brand/20 bg-white py-1.5 pl-1.5 pr-4 shadow-lg shadow-brand/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover text-white shadow-sm">
                <HiOutlineCreditCard className="h-4 w-4" />
              </span>
              <p className="text-[13px] font-semibold text-text-dark">
                CWTicketing Platform
              </p>
            </div>

            <MobileConnector />

            {/* Passenger journey */}
            <div
              data-gsap
              className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  PASSENGER
                </span>
                <span className="text-[11.5px] text-text-muted">Books in 3 steps</span>
              </div>

              <ol className="relative grid grid-cols-3">
                <span
                  aria-hidden="true"
                  className="absolute left-[16.66%] right-[16.66%] top-5 h-0.5 rounded-full bg-gradient-to-r from-brand/30 via-brand/60 to-brand/30"
                />
                {passengerSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.label} className="relative flex flex-col items-center px-1 text-center">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-hover text-white shadow-md shadow-brand/25 ring-4 ring-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="mt-2 text-[10.5px] font-semibold uppercase tracking-wide text-brand">
                        Step {i + 1}
                      </span>
                      <span className="mt-0.5 text-[12.5px] font-semibold leading-tight text-text-dark">
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <MobileConnector />

            {/* Admin console */}
            <div
              data-gsap
              className="rounded-2xl border border-brand/20 bg-white p-4 shadow-xl shadow-brand/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-md border border-brand/20 bg-brand-light px-2.5 py-1 text-[11px] font-semibold text-brand">
                  ADMIN
                </span>
                <span className="flex items-center gap-1.5 text-[11.5px] text-text-muted">
                  <HiOutlineSparkles className="h-3.5 w-3.5 text-brand" />
                  Runs the operation
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {platformModules.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={mod.label}
                      className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-gray-50/70 px-1 py-3 text-center"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand shadow-sm ring-1 ring-brand/15">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="w-full truncate text-[11.5px] font-semibold leading-tight text-text-dark">
                        {mod.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Tablet & up: branching flowchart ── */}
          <div className="mx-auto hidden max-w-3xl sm:block">
            {/* Decision */}
            <FlowNode
              icon={HiOutlineCreditCard}
              label="Platform"
              badgeClass="from-brand to-brand-hover"
              round
              centered
            />

            {/* Fork */}
            <div className="relative h-14 sm:h-16">
              <svg
                viewBox="0 0 720 64"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <path
                  ref={(elm) => {
                    forkPathRefs.current[0] = elm;
                  }}
                  d="M360,0 C360,32 180,32 180,64"
                  fill="none"
                  stroke="#FF9A5C"
                  strokeWidth="2"
                />
                <path
                  ref={(elm) => {
                    forkPathRefs.current[1] = elm;
                  }}
                  d="M360,0 C360,32 540,32 540,64"
                  fill="none"
                  stroke="#FF9A5C"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* PASSENGER / ADMIN branches */}
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-6">
              <div className="flex flex-col items-center">
                <span
                  data-gsap
                  className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
                >
                  PASSENGER
                </span>
                {passengerSteps.map((node, i) => (
                  <div key={node.label} className="w-full">
                    <FlowNode {...node} />
                    {i < passengerSteps.length - 1 && <FlowLine />}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <span
                  data-gsap
                  className="mb-3 rounded-md border border-brand/20 bg-brand-light px-2.5 py-1 text-[11px] font-semibold text-brand"
                >
                  ADMIN
                </span>
                <div
                  data-gsap
                  className="w-full rounded-2xl border border-brand/20 bg-white p-3 shadow-xl shadow-brand/10 sm:rounded-3xl sm:p-4"
                >
                  <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-brand">
                      <HiOutlineSparkles className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-[12px] font-semibold leading-tight text-text-dark sm:text-[13px]">
                      CWTicketing Platform
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {platformModules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div
                          key={mod.label}
                          data-gsap
                          className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-2 py-1.5 transition-colors sm:px-2.5 sm:py-2 duration-200 hover:border-brand/30 hover:bg-brand-light/50"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm ring-1 ring-brand/15 sm:h-7 sm:w-7">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <p className="truncate text-[11.5px] font-semibold leading-tight text-text-dark sm:text-[12px]">
                            {mod.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
