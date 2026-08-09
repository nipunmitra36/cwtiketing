"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import {
    HiOutlineArrowRight,
    HiOutlineArrowLeft,
    HiOutlineArrowLongRight,
} from "react-icons/hi2";

type CaseStudy = {
    type: "quote" | "stat";
    name: string;
    country: string;
    category: string;
    gradient: string; // tailwind gradient classes for the photo panel
    quote?: string;
    quoteHighlight?: string;
    author?: string;
    stat?: string;
    statLabel?: string;
    desc: string;
    href: string;
};

const cases: CaseStudy[] = [
    {
        type: "quote",
        name: "Coachline UK",
        country: "United Kingdom",
        category: "Intercity coach",
        gradient: "from-gray-900 via-gray-800 to-gray-950",
        quote:
            "We replaced three separate booking tools with one platform that runs all 150 routes.",
        quoteHighlight: "one platform",
        author: "— Priya Shah, Head of Operations",
        desc: "Migrated from a legacy system, cutting booking time by 60% across the network.",
        href: "/case-studies/coachline-uk",
    },
    {
        type: "stat",
        name: "Lagos Move",
        country: "Nigeria",
        category: "Mobility marketplace",
        gradient: "from-brand-light via-brand-light to-white",
        stat: "3x",
        statLabel: "revenue growth in 6 months",
        desc: "Scaled from 50 to 500+ vehicles with real-time tracking and dispatch.",
        href: "/case-studies/lagos-move",
    },
    {
        type: "quote",
        name: "Falcon Shuttle",
        country: "UAE",
        category: "Airport transfers",
        gradient: "from-slate-900 via-slate-800 to-black",
        quote:
            "Automated dispatch and passenger alerts fixed our late-pickup problem in a week.",
        quoteHighlight: "in a week",
        author: "— Omar Al Farsi, Fleet Manager",
        desc: "On-time performance jumped after switching from manual radio dispatch.",
        href: "/case-studies/falcon-shuttle",
    },
];

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

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
                    duration: 0.9,
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

    const updateArrowState = () => {
        const el = scrollerRef.current;
        if (!el) return;
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };

    useEffect(() => {
        updateArrowState();
        const el = scrollerRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateArrowState, { passive: true });
        window.addEventListener("resize", updateArrowState);
        return () => {
            el.removeEventListener("scroll", updateArrowState);
            window.removeEventListener("resize", updateArrowState);
        };
    }, []);

    const scrollByCard = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const card = el.querySelector("[data-card]") as HTMLElement | null;
        const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="case-studies"
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header row */}
                <div
                    data-gsap
                    className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand">
                            Case studies
                        </span>
                        <h2 className="mt-4 text-3xl font-medium tracking-tight text-text-dark sm:text-5xl">
                            Operators achieve more
                        </h2>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-5 py-2.5 text-[13px] font-medium text-text-dark transition-colors hover:border-brand/30 hover:text-brand"
                    >
                        Contact sales
                        <HiOutlineArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* Scroll-snap carousel */}
                <div
                    ref={scrollerRef}
                    data-gsap
                    className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
                    style={{ scrollbarWidth: "none" }}
                >
                    {cases.map((c, i) => (
                        <div
                            key={i}
                            data-card
                            className="group relative flex w-[85vw] max-w-[560px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 sm:w-[70vw] md:w-[52vw] lg:w-[46%]"
                        >
                            {c.type === "quote" ? (
                                <>
                                    {/* Text half */}
                                    <div
                                        className={`flex w-[55%] shrink-0 flex-col justify-between bg-gradient-to-br ${c.gradient} p-6`}
                                    >
                                        <div>
                                            <span className="mb-3 inline-block text-4xl font-serif leading-none text-brand">
                                                &ldquo;
                                            </span>
                                            <p className="text-[15px] font-medium leading-snug text-white">
                                                {c.quote}
                                            </p>
                                            {c.author && (
                                                <p className="mt-4 text-[12px] text-gray-400">
                                                    {c.author}
                                                </p>
                                            )}
                                        </div>
                                        <Link
                                            href={c.href}
                                            className="mt-6 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-brand transition-colors hover:text-brand-hover"
                                        >
                                            Read case study
                                            <HiOutlineArrowLongRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                    {/* Photo half */}
                                    <div className="relative w-[45%] shrink-0 overflow-hidden bg-gray-900">
                                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_18px,rgba(255,255,255,0.04)_18px,rgba(255,255,255,0.04)_19px)]" />
                                        <div className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                                            {c.name}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Stat half */}
                                    <div
                                        className={`flex w-[55%] shrink-0 flex-col justify-between bg-gradient-to-br ${c.gradient} p-6`}
                                    >
                                        <div>
                                            <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-text-dark shadow-sm">
                                                {c.category}
                                            </span>
                                            <p className="mt-6 text-5xl font-semibold tracking-tight text-brand">
                                                {c.stat}
                                            </p>
                                            <p className="mt-1 text-[13px] font-medium leading-snug text-text-dark">
                                                {c.statLabel}
                                            </p>
                                        </div>
                                        <Link
                                            href={c.href}
                                            className="mt-6 inline-flex w-fit items-center gap-1.5 text-[12.5px] font-semibold text-brand transition-colors hover:text-brand-hover"
                                        >
                                            Read case study
                                            <HiOutlineArrowLongRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>
                                    {/* Photo half */}
                                    <div className="relative w-[45%] shrink-0 overflow-hidden bg-gray-950">
                                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_55%)]" />
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_18px,rgba(255,255,255,0.03)_18px,rgba(255,255,255,0.03)_19px)]" />
                                        <div className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                                            {c.name}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Arrow nav */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => scrollByCard(-1)}
                        disabled={atStart}
                        aria-label="Previous case study"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-dark transition-colors enabled:hover:border-brand/30 enabled:hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard(1)}
                        disabled={atEnd}
                        aria-label="Next case study"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-dark transition-colors enabled:hover:border-brand/30 enabled:hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <HiOutlineArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}