"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { HiOutlineArrowRight } from "react-icons/hi";

const cases = [
    {
        name: "Coachline UK",
        country: "United Kingdom",
        flag: "🇬🇧",
        result: "40%",
        resultLabel: "More online bookings",
        desc: "Migrated from a legacy system to our platform, cutting booking time by 60% and increasing direct online sales across 150+ routes.",
        href: "/case-studies/coachline-uk",
    },
    {
        name: "Lagos Move",
        country: "Nigeria",
        flag: "🇳🇬",
        result: "3x",
        resultLabel: "Revenue growth",
        desc: "A transport marketplace that scaled from 50 to 500+ vehicles on the platform within 6 months of launch with real-time tracking.",
        href: "/case-studies/lagos-move",
    },
    {
        name: "Falcon Shuttle",
        country: "UAE",
        flag: "🇦🇪",
        result: "98%",
        resultLabel: "On-time performance",
        desc: "Airport shuttle operator serving Dubai. Automated dispatching and passenger notifications improved on-time performance dramatically.",
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
                        Success stories
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl"
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
                        See how ticketing businesses transformed their operations.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            data-gsap
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/80"
                        >
                            <div className="p-6 pb-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                                        Client story
                                    </span>
                                    <span className="text-2xl leading-none">{c.flag}</span>
                                </div>

                                <h3 className="mb-1 text-[17px] font-bold text-text-dark">
                                    {c.name}
                                </h3>
                                <p className="mb-4 text-[12.5px] text-text-muted">
                                    {c.country}
                                </p>

                                <div className="mb-4 flex items-baseline gap-1.5">
                                    <span className="text-4xl font-bold tracking-tight text-brand">
                                        {c.result}
                                    </span>
                                    <span className="text-[12px] font-medium text-text-body">
                                        {c.resultLabel}
                                    </span>
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
