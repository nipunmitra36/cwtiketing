"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import type { IconType } from "react-icons";

interface Feature {
  icon: IconType;
  label: string;
}

interface ChannelSectionProps {
  id?: string;
  tone: "white" | "gray";
  title: string;
  paragraph: string;
  availableOn: string[];
  illustrationIcon: IconType;
  illustrationLabel: string;
  featuresHeading: string;
  features: Feature[];
  reverse?: boolean;
}

export default function ChannelSection({
  id,
  tone,
  title,
  paragraph,
  availableOn,
  illustrationIcon: Illustration,
  illustrationLabel,
  featuresHeading,
  features,
  reverse = false,
}: ChannelSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return createSectionReveal(el, { y: 36, stagger: 0.07 });
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden py-16 lg:py-24 ${tone === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div data-gsap className={reverse ? "lg:order-2" : ""}>
            <h2 className="text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
              {paragraph}
            </p>

            <div className="mt-6">
              <p className="text-[11.5px] font-semibold uppercase tracking-widest text-brand">
                Available on
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {availableOn.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-text-body"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div data-gsap className={reverse ? "lg:order-1" : ""}>
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
              <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-light/60 to-white px-8 py-14">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand text-white shadow-xl shadow-brand/30">
                  <Illustration className="h-10 w-10" />
                </span>
                <p className="text-center text-[12.5px] font-medium leading-snug text-text-muted">
                  {illustrationLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="mt-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h3 className="text-[19px] font-medium leading-snug tracking-tight text-text-dark sm:text-[22px]">
              {featuresHeading}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  data-gsap
                  className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-3.5 py-3 shadow-sm shadow-gray-200/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[12.5px] font-medium leading-snug text-text-dark">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
