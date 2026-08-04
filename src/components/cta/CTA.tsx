"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollSmoother } from "@/lib/gsap";
import { HiOutlineArrowRight, HiOutlinePlay } from "react-icons/hi";

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const isHome = usePathname() === "/";

    const scrollToHash = (href: string) => {
        const hash = href.split("#")[1];
        if (!hash) return;
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTo(hash, true);
        else {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                    duration: 0.7,
                    stagger: 0.15,
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
            className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark py-16 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
            <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <p
                    data-gsap
                    className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-white/70"
                >
                    Final stop
                </p>
                <h2
                    data-gsap
                    className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                >
                    Ready to Take Your Operation Online?
                </h2>
                <p
                    data-gsap
                    className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:text-[16px]"
                >
                    Talk to us about your routes, fleet, and passengers — we&apos;ll
                    show you a platform built around them.
                </p>
                <div data-gsap className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-brand shadow-lg shadow-black/20 transition-all hover:bg-gray-100 hover:shadow-xl active:scale-95"
                    >
                        Start Free Consultation
                        <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                        href="/#platform"
                        onClick={(e) => {
                            if (isHome) {
                                e.preventDefault();
                                scrollToHash("/#platform");
                            }
                        }}
                        className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-brand">
                            <HiOutlinePlay className="ml-px h-3 w-3 text-white" />
                        </span>
                        Watch Platform Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}