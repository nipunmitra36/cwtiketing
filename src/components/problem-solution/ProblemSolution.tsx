"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
} from "react-icons/hi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Flowchart primitives ──────────────────────────────────────────

function FlowLine() {
  return <div data-gsap className="mx-auto h-6 w-px bg-gray-200" />;
}

function FlowNode({
  icon: Icon,
  label,
  badgeClass,
  round = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badgeClass: string;
  round?: boolean;
}) {
  return (
    <div
      data-gsap
      className="mx-auto flex w-full max-w-[230px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm sm:max-w-[240px]"
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center text-white shadow-sm ${round ? "rounded-full" : "rounded-lg"
          } bg-gradient-to-br ${badgeClass}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="text-[12.5px] font-semibold leading-tight text-text-dark">
        {label}
      </p>
    </div>
  );
}

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
  // flowchart scrolls into view.
  useEffect(() => {
    const ctx = gsap.context(() => {
      forkPathRefs.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: path, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-cw-ticketing"
      className="relative overflow-hidden bg-white py-16 lg:py-24"
    >
      <div className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-brand-light/60 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── About: flowing editorial text with floated badges ── */}
        <div data-gsap className="mb-20">
          

          <h2 className="mb-2 max-w-3xl text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[30px] sm:leading-snug">
            What is{" "}
            <span className="relative inline-block">
              <span className="relative z-10">CW Ticketing System</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
            </span>
            ?
          </h2>
          <p className="mb-8 max-w-2xl text-[14px] font-medium text-brand sm:text-[15px]">
            A white-label booking platform for transport &amp; mobility
            businesses
          </p>

          <div className="relative">
            <p className="text-[16px] leading-[1.9] text-text-muted sm:text-[18px]">
              CW Ticketing System is a complete white-label online ticket
              booking platform designed for transport operators, travel
              companies, and mobility businesses. It helps businesses launch
              their own branded booking system where passengers can search
              routes, check seat availability, make payments, and manage
              bookings through web and mobile apps. From bus and train
              reservations to taxi, cruise, event, and other transportation
              services, CW Ticketing provides the tools operators need to
              automate ticket sales, manage daily operations, and deliver a
              better passenger experience — from one centralized platform.
            </p>
          </div>
          <div className="clear-both" />
        </div>

        {/* ── How it works: branching flowchart ── */}
        <div>
          <div data-gsap className="mx-auto mb-14 max-w-2xl text-center">
            <h3 className="text-[20px] font-medium leading-snug tracking-tight text-text-dark sm:text-[24px]">
              From search to ticket, in one flow
            </h3>
          </div>

          <div className="mx-auto max-w-3xl">
            {/* Decision */}
            <FlowNode
              icon={HiOutlineCreditCard}
              label="Platform"
              badgeClass="from-brand to-brand-hover"
              round
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
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
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
                  className="w-full rounded-3xl border border-brand/20 bg-white p-4 shadow-xl shadow-brand/10"
                >
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-brand">
                      <HiOutlineSparkles className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-[13px] font-semibold text-text-dark">
                      CW Ticketing Platform
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {platformModules.map((mod) => {
                      const Icon = mod.icon;
                      return (
                        <div
                          key={mod.label}
                          data-gsap
                          className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/60 px-2.5 py-2 transition-colors duration-200 hover:border-brand/30 hover:bg-brand-light/50"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm ring-1 ring-brand/15">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <p className="text-[11px] font-semibold leading-tight text-text-dark">
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