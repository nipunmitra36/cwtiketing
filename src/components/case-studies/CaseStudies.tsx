"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSectionReveal } from "@/lib/gsap/reveal";
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
    logo: string;
    gradient: string; // tailwind gradient classes for the highlight panel
    quote?: string;
    stat?: string;
    statLabel?: string;
    desc: string;
    href: string;
};

const cases: CaseStudy[] = [
    {
        type: "quote",
        name: "TopBus",
        country: "United Kingdom",
        category: "Intercity coach",
        logo: "/media/client/topbus.webp",
        gradient: "from-gray-900 via-gray-800 to-gray-950",
        quote:
            "We replaced three separate booking tools with one platform that runs all 150 routes.",
        desc: "Migrated from a legacy system, cutting booking time by 60% across the network.",
        href: "/case-studies/topbus",
    },
    {
        type: "stat",
        name: "BusBora",
        country: "Tanzania",
        category: "Mobility marketplace",
        logo: "/media/client/busbora.webp",
        gradient: "from-brand-light via-brand-light to-white",
        stat: "3x",
        statLabel: "revenue growth in 6 months",
        desc: "Scaled from 50 to 500+ vehicles with real-time tracking and dispatch.",
        href: "/case-studies/busbora",
    },
    {
        type: "quote",
        name: "Canvey Xpress",
        country: "United Kingdom",
        category: "Airport transfers",
        logo: "/media/client/canvey.webp",
        gradient: "from-slate-900 via-slate-800 to-black",
        quote:
            "Automated dispatch and passenger alerts fixed our late-pickup problem in a week.",
        desc: "On-time performance jumped after switching from manual radio dispatch.",
        href: "/case-studies/canvey-xpress",
    },
];

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        return createSectionReveal(el, { y: 40, stagger: 0.12 });
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
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
        el.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    return (
        <section
            ref={sectionRef}
            id="case-studies"
            className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-24"
        >
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header row */}
                <div
                    data-gsap
                    className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end sm:gap-6"
                >
                    <div>
                        <h2 className="text-[24px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug lg:text-[32px]">
                            Operators <span className="text-gradient-brand">achieve more</span>
                        </h2>
                    </div>
                    <Link
                        href="/contact-us"
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
                    className="scrollbar-hide -mx-4 flex scroll-px-4 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
                    style={{ scrollbarWidth: "none" }}
                >
                    {cases.map((c) => (
                        <article
                            key={c.name}
                            data-card
                            className="group relative flex w-[86%] max-w-[600px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50 sm:w-[78%] sm:flex-row md:w-[68%] lg:w-[calc(50%-12px)]"
                        >
                            {/* Highlight: customer quote or headline metric */}
                            <div
                                className={`flex flex-col justify-between bg-gradient-to-br ${c.gradient} p-5 sm:w-[56%] sm:shrink-0 sm:p-6`}
                            >
                                {c.type === "quote" ? (
                                    <div>
                                        <span className="mb-2 block font-serif text-4xl leading-none text-brand">
                                            &ldquo;
                                        </span>
                                        <p className="text-[15px] font-medium leading-snug text-white sm:text-[16px]">
                                            {c.quote}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-5xl font-semibold tracking-tight text-brand sm:text-6xl">
                                            {c.stat}
                                        </p>
                                        <p className="mt-2 text-[14px] font-medium leading-snug text-text-dark">
                                            {c.statLabel}
                                        </p>
                                    </div>
                                )}
                                <Link
                                    href={c.href}
                                    className="mt-6 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-brand transition-colors hover:text-brand-hover"
                                >
                                    Read case study
                                    <HiOutlineArrowLongRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </Link>
                            </div>

                            {/* Customer details */}
                            <div className="flex flex-1 flex-col gap-4 border-t border-gray-100 p-5 sm:border-l sm:border-t-0 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-1">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={c.logo}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-contain"
                                        />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-[14px] font-semibold text-text-dark">
                                            {c.name}
                                        </p>
                                        <p className="truncate text-[12px] text-text-muted">
                                            {c.country}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[13.5px] leading-relaxed text-text-body sm:flex-1">
                                    {c.desc}
                                </p>
                                <span className="inline-flex w-fit items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11.5px] font-medium text-text-muted">
                                    {c.category}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Arrow nav */}
                <div className="mt-4 flex justify-end gap-3 sm:mt-6">
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
