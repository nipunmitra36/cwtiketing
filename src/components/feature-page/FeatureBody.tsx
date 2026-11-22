"use client";

import { useEffect, useRef } from "react";
import { createSectionReveal } from "@/lib/gsap/reveal";
import { HiOutlineArrowRight, HiOutlineCheck } from "react-icons/hi";
import { ICONS } from "./icons";
import type { FeaturePageData } from "./types";

const Heading = ({ lead, highlight }: { lead: string; highlight: string }) => (
  <div data-gsap>
    <h2 className="text-[26px] font-semibold leading-[1.12] tracking-tight text-text-dark sm:text-[32px] lg:text-[36px]">
      {lead} <span className="text-gradient-brand">{highlight}</span>
    </h2>
    <span className="mt-5 block h-1 w-14 rounded-full bg-gradient-to-r from-brand to-amber-400" />
  </div>
);

/** Overview: what the module is, four pillars, and the problems it removes. */
export function FeatureOverview({ data }: { data: FeaturePageData }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return createSectionReveal(ref.current, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section ref={ref} id="overview" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <Heading lead={data.overviewLead} highlight={data.overviewHighlight} />
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            {data.overviewText}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <div
                key={p.title}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:bg-white hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[76px] font-black leading-none tracking-tighter text-brand/10 transition-colors duration-300 group-hover:text-brand/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-gray-100 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 text-[16px] font-semibold tracking-tight text-text-dark">{p.title}</h3>
                <p className="relative mt-2 text-[13.5px] leading-relaxed text-text-muted">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 rounded-[2rem] border border-gray-100 bg-gray-50/60 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:p-10">
          <div data-gsap>
            <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-text-dark sm:text-[22px]">
              {data.problemsTitle}
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">{data.problemsIntro}</p>
          </div>
          <ul data-gsap className="grid gap-3 sm:grid-cols-2">
            {data.problems.map((p) => (
              <li key={p} className="flex items-start gap-2.5 rounded-2xl border border-gray-100 bg-white p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <HiOutlineCheck className="h-3 w-3" />
                </span>
                <span className="text-[12.5px] leading-snug text-text-body">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Feature cards, plus optional name groups (payment gateways). */
export function FeatureGrid({ data }: { data: FeaturePageData }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return createSectionReveal(ref.current, { y: 32, stagger: 0.05 });
  }, []);

  return (
    <section ref={ref} id="features" className="relative overflow-hidden bg-gray-50 py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-light blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <Heading lead="Key Features of" highlight={data.featuresHighlight} />
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            {data.featuresIntro}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {data.features.map((f, i) => {
            const Icon = ICONS[f.icon];
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
                    {String(i + 1).padStart(2, "0")}
                    <HiOutlineArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-text-dark">{f.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">{f.desc}</p>
              </article>
            );
          })}
        </div>

        {data.groups && (
          <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {data.groups.map((g) => (
              <div key={g.title} data-gsap className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-[15px] font-semibold tracking-tight text-text-dark">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-brand/15 bg-brand-light px-3 py-1.5 text-[12px] font-medium text-text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** How the module is used, step by step. */
export function FeatureWorkflow({ data }: { data: FeaturePageData }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return createSectionReveal(ref.current, { y: 32, stagger: 0.08 });
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <Heading lead="How It Works:" highlight={data.stepsTitle} />
          <p data-gsap className="max-w-xl text-[14px] leading-relaxed text-text-muted sm:text-[15px] lg:justify-self-end">
            {data.stepsIntro}
          </p>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {data.steps.map((s, i) => (
            <li
              key={s.title}
              data-gsap
              className="relative rounded-3xl border border-gray-100 bg-gray-50/60 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white shadow-lg shadow-brand/30">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-text-dark">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
