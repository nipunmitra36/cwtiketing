"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineCheck,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineLibrary,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Plan {
  name: string;
  tagline: string;
  icon: IconType;
  audience: string;
  features: string[];
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Small operators",
    icon: HiOutlineSparkles,
    audience: "For single-route operators getting their first bookings online.",
    features: [
      "Online booking engine",
      "Mobile-optimized booking page",
      "Seat selection & e-tickets",
      "1 admin + 5 staff users",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "Growing fleets",
    icon: HiOutlineLightningBolt,
    audience: "For multi-route fleets scaling sales and adding channels.",
    features: [
      "Everything in Starter",
      "White-label branding",
      "Agent & reseller portal",
      "Coupons & promotions",
      "Reports & analytics",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Large transport networks",
    icon: HiOutlineLibrary,
    audience: "For groups, national networks, and multi-country operations.",
    features: [
      "Everything in Growth",
      "Android & iOS mobile apps",
      "ERP & payment integrations",
      "Multi-language & multi-currency",
      "SLA-backed 24/7 support",
      "Dedicated account manager",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
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
          stagger: 0.1,
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
      id="pricing"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-brand-light/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span
            data-gsap
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
          >
            Pricing
          </span>
          <h2
            data-gsap
            className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
          >
            Plans Built For Every Operator
          </h2>
          <p
            data-gsap
            className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
          >
            Every plan is tailored to your routes and volumes. Tell us what you
            need and we&apos;ll quote it precisely.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                data-gsap
                className={`relative flex flex-col rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-2 sm:p-7 ${
                  plan.highlighted
                    ? "border-brand/40 shadow-xl shadow-brand/15"
                    : "border-gray-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/80"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-brand/30">
                    Most popular
                  </span>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      plan.highlighted
                        ? "bg-brand text-white shadow-md shadow-brand/30"
                        : "bg-brand-light text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark">{plan.name}</h3>
                    <p className="text-[12px] font-medium text-brand">{plan.tagline}</p>
                  </div>
                </div>

                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  {plan.audience}
                </p>

                <ul className="mb-7 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px] text-text-body">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.highlighted ? "bg-brand text-white" : "bg-brand-light text-brand"
                        }`}
                      >
                        <HiOutlineCheck className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    href="/contact"
                    className={`flex w-full items-center justify-center rounded-xl px-5 py-3 text-[13.5px] font-semibold transition-all active:scale-[0.98] ${
                      plan.highlighted
                        ? "bg-brand text-white shadow-lg shadow-brand/30 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-xl hover:shadow-brand/40"
                        : "border border-gray-200 bg-white text-text-dark hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand"
                    }`}
                  >
                    Get Custom Quote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p data-gsap className="mt-8 text-center text-[12.5px] text-text-muted">
          No long-term contracts. Volume pricing for large fleets.{" "}
          <Link href="/contact" className="font-semibold text-brand hover:text-brand-hover">
            Talk to sales →
          </Link>
        </p>
      </div>
    </section>
  );
}
