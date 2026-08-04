"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import {
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";

const cases = [
    {
        name: "Coachline UK",
        country: "United Kingdom",
        flag: "🇬🇧",
        before: "Old manual booking",
        result: "40%",
        resultLabel: "increase in online bookings",
        desc: "Migrated from a legacy system to our platform, cutting booking time by 60% across 150+ routes.",
        href: "/case-studies/coachline-uk",
    },
    {
        name: "Lagos Move",
        country: "Nigeria",
        flag: "🇳🇬",
        before: "Scattered phone bookings",
        result: "3x",
        resultLabel: "revenue growth in 6 months",
        desc: "A transport marketplace that scaled from 50 to 500+ vehicles with real-time tracking.",
        href: "/case-studies/lagos-move",
    },
    {
        name: "Falcon Shuttle",
        country: "UAE",
        flag: "🇦🇪",
        before: "Late airport pickups",
        result: "98%",
        resultLabel: "on-time performance",
        desc: "Automated dispatching and passenger notifications fixed the airport shuttle experience.",
        href: "/case-studies/falcon-shuttle",
    },
];

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = sectionRef.current;
            if (!el) return;

            gsap.fromTo(
                el.querySelectorAll("[data-gsap]"),
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.12,
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
            id="case-studies"
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-brand-light/60 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        Case studies
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
                    >
                        Trusted by Operators{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Worldwide</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
                        </span>
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                    >
                        Operators who made the switch.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            data-gsap
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/80"
                        >
                            {/* Gradient top edge */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-hover" />

                            <div className="p-6 pb-4">
                                {/* Logo */}
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-950 text-lg shadow-md">
                                        {c.flag}
                                    </span>
                                    <div>
                                        <h3 className="text-[16px] font-bold text-text-dark">
                                            {c.name}
                                        </h3>
                                        <p className="text-[12px] text-text-muted">
                                            {c.country}
                                        </p>
                                    </div>
                                </div>

                                {/* Before / After */}
                                <div className="mb-5 space-y-2.5">
                                    <div className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                                            <HiOutlineX className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                                Before
                                            </p>
                                            <p className="truncate text-[12.5px] font-medium text-gray-500">
                                                {c.before}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-brand/15 bg-brand-light/60 px-3 py-2.5">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                                            <HiOutlineCheck className="h-3.5 w-3.5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                                                After
                                            </p>
                                            <p className="truncate text-[12.5px] font-semibold text-text-dark">
                                                <span className="text-brand">{c.result}</span>{" "}
                                                {c.resultLabel}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[13px] leading-relaxed text-text-muted">
                                    {c.desc}
                                </p>
                            </div>

                            <div className="mt-auto border-t border-gray-100 px-6 py-4">
                                <Link
                                    href={c.href}
                                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand transition-colors hover:text-brand-hover"
                                >
                                    Read case study
                                    <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
