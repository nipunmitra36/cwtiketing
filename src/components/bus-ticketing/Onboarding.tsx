"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineChat,
  HiOutlineColorSwatch,
  HiOutlineLink,
  HiOutlinePaperAirplane,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineChatAlt2,
  HiOutlineViewGrid,
  HiOutlineCurrencyDollar,
  HiOutlineCreditCard,
  HiOutlineGlobeAlt,
  HiOutlineDeviceMobile,
  HiOutlineChartBar,
  HiOutlineMap,
  HiOutlineServer,
  HiOutlineColorSwatch as HiOutlineColorSwatchIcon,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Step {
  num: string;
  icon: IconType;
  title: string;
  desc: string;
  tags: { icon: IconType; label: string }[];
}

const steps: Step[] = [
  {
    num: "1",
    icon: HiOutlineChat,
    title: "Discovery",
    desc: "We learn about your routes, prices, passenger types, sales channels, fleet and operational requirements.",
    tags: [
      { icon: HiOutlineMap, label: "Routes" },
      { icon: HiOutlineCurrencyDollar, label: "Pricing" },
    ],
  },
  {
    num: "2",
    icon: HiOutlineColorSwatch,
    title: "Customisation",
    desc: "We configure your brand colours, seat layouts, ticket rules, user permissions and customer journey.",
    tags: [
      { icon: HiOutlineColorSwatchIcon, label: "Brand" },
      { icon: HiOutlineViewGrid, label: "Seat layouts" },
    ],
  },
  {
    num: "3",
    icon: HiOutlineLink,
    title: "Integration",
    desc: "We connect payment gateways, SMS services, mapping tools and any agreed external systems.",
    tags: [
      { icon: HiOutlineCreditCard, label: "Payments" },
      { icon: HiOutlineChatAlt2, label: "SMS" },
      { icon: HiOutlineServer, label: "ERP" },
    ],
  },
  {
    num: "4",
    icon: HiOutlinePaperAirplane,
    title: "Launch",
    desc: "Your branded web platform, mobile products, staff tools and administrative dashboard are prepared for use.",
    tags: [
      { icon: HiOutlineGlobeAlt, label: "Web" },
      { icon: HiOutlineDeviceMobile, label: "Apps" },
      { icon: HiOutlineChartBar, label: "Dashboard" },
    ],
  },
];

export default function Onboarding() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const el = sectionRef.current;
        if (!el) return;

        gsap.fromTo(
          el.querySelectorAll("[data-gsap]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", once: true },
          }
        );

        const lineH = el.querySelector<HTMLElement>("[data-gsap-line]");
        const lineV = el.querySelector<HTMLElement>("[data-gsap-line-v]");
        const draw = {
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector("[data-gsap-grid]"),
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        };
        if (lineH) {
          gsap.set(lineH, { scaleX: 0 });
          gsap.to(lineH, { scaleX: 1, transformOrigin: "left", ...draw });
        }
        if (lineV) {
          gsap.set(lineV, { scaleY: 0 });
          gsap.to(lineV, { scaleY: 1, transformOrigin: "top", ...draw });
        }
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
      id="onboarding"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Onboarding
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            Launch Your Platform in 4 Simple Steps
          </h2>
          <p
            data-gsap
            className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-text-muted sm:text-[14px]"
          >
            From discovery to launch, our team guides you through each stage of
            setting up your ticketing platform.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector (mobile) */}
          <div className="absolute bottom-8 left-6 top-8 w-0.5 lg:hidden">
            <div className="h-full w-full rounded-full bg-gray-200" />
            <div data-gsap-line-v className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand via-brand/70 to-brand/30" />
          </div>

          {/* Horizontal connector (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 lg:block">
            <div className="h-full w-full rounded-full bg-gray-200" />
            <div data-gsap-line className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand via-brand/70 to-brand/30" />
          </div>

          <div data-gsap-grid className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  data-gsap
                  className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-md shadow-brand/10 ring-1 ring-brand/20">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-md shadow-brand/30">
                      {step.num}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="relative flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-xl hover:shadow-brand/10 lg:mt-6 lg:w-full">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-brand">
                      Step {step.num}
                    </p>
                    <h3 className="mt-1 text-[15px] font-medium tracking-tight text-text-dark">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-text-muted">
                      {step.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {step.tags.map((t) => {
                        const TagIcon = t.icon;
                        return (
                          <span
                            key={t.label}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-text-body"
                          >
                            <TagIcon className="h-3 w-3 text-brand" />
                            {t.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA row */}
        <div
          data-gsap
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:flex-row sm:gap-5 sm:text-left"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand">
            <HiOutlineChatAlt2 className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-text-dark">
              Not sure where to start?
            </p>
            <p className="mt-0.5 text-[13px] text-text-muted">
              Tell us about your routes and fleet — we&apos;ll map out your launch.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13.5px] font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
          >
            Discuss Your Launch Plan
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Completion line */}
        <div data-gsap className="mt-8 flex items-center justify-center gap-2 text-[12px] font-medium text-text-muted">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <HiOutlineCheck className="h-3 w-3" />
          </span>
          Average onboarding takes 2–4 weeks, depending on scope.
        </div>
      </div>
    </section>
  );
}
