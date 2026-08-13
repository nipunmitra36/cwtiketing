"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineChevronDown,
  HiOutlineArrowRight,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

const faqs = [
    {
        q: "How long does it take to launch my booking platform?",
        a: "Most operators go live within 2–3 weeks. The timeline depends on your requirements, integrations, and data migration. We'll provide a clear timeline during our initial consultation.",
    },
    {
        q: "Can I customize the booking flow and branding?",
        a: "Absolutely. Every aspect of the booking experience — from the color scheme and logo to the checkout flow and email templates — is fully customizable to match your brand.",
    },
    {
        q: "What payment gateways do you support?",
        a: "We integrate with Stripe, PayPal, Square, Razorpay, and 20+ local payment providers. We also support cash-on-counter and mobile money options popular in specific markets.",
    },
    {
        q: "Do you offer mobile apps for my customers?",
        a: "Yes. We provide white-label Android and iOS apps that match your brand. Customers can book tickets, view schedules, select seats, and manage bookings on the go.",
    },
    {
        q: "Can I manage multiple routes, buses, and fare types?",
        a: "Yes. Our system supports unlimited routes, vehicles, fare classes (AC, non-AC, sleeper, etc.), and dynamic pricing. You can set different fares for peak/off-peak hours.",
    },
    {
        q: "What kind of support do you provide after launch?",
        a: "We offer 24/7 technical support, a dedicated account manager, and regular platform updates. Enterprise plans include SLA-backed support and priority issue resolution.",
    },
    {
        q: "What is a white label ticket booking platform?",
        a: "A white label ticket booking platform is a ready-made ticketing system you can rebrand as your own — with your logo, colors, domain, and apps. You get all the technology of a custom-built platform without the years of development time or cost.",
    },
    {
        q: "Can I launch my own branded booking app?",
        a: "Yes. We publish white-label Android and iOS apps under your brand on the Google Play Store and Apple App Store. Passengers download 'your' app to book, select seats, and manage trips, while you keep full ownership of the platform.",
    },
    {
        q: "Does it support multiple operators?",
        a: "Absolutely. The platform supports multi-operator and marketplace models — multiple transport companies can sell on one platform with separate dashboards, commissions, and reporting for each.",
    },
    {
        q: "Can I integrate my existing payment gateway?",
        a: "Yes. We support Stripe, PayPal, Square, Razorpay, and 20+ local providers out of the box, and we can connect your existing merchant account or custom gateway through our API during onboarding.",
    },
    {
        q: "How much does a booking system cost?",
        a: "Pricing depends on your routes, volumes, and features. Starter plans start at a modest monthly rate, while Growth and Enterprise are custom-quoted. Contact us for a free, no-obligation quote tailored to your operation.",
    },
];

const supportChips = ["24/7 Support", "99.9% Uptime SLA", "Dedicated Manager"];

export default function FAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const mm = gsap.matchMedia();
        let ctx: gsap.Context | null = null;

        const cancel = onSmootherReady(() => {
            ctx = gsap.context(() => {
                const el = sectionRef.current;
                if (!el) return;

                gsap.fromTo(
                    el.querySelectorAll("[data-gsap]"),
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.06,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                );

                // Make the left column behave like CSS `position: sticky` while the
                // FAQ accordion scrolls (desktop only). ScrollTrigger pins do not
                // work reliably inside ScrollSmoother (spacer/layout jumps), so we
                // emulate sticky by nudging the column with a transform: it stays at
                // the top offset while the accordion scrolls, then rides up together
                // with the last FAQ item instead of lingering until the section end.
                mm.add("(min-width: 1024px)", () => {
                const sticky = stickyRef.current;
                const accordion = accordionRef.current;
                const section = sectionRef.current;
                if (!sticky || !accordion || !section) return;

                // Visual offset from the viewport top (clears the fixed header).
                const offset = 96;
                let appliedY = 0;

                const apply = () => {
                    const rect = sticky.getBoundingClientRect();
                    const naturalTop = rect.top - appliedY;
                    if (
                        naturalTop > window.innerHeight + offset ||
                        rect.bottom < -offset
                    ) {
                        if (appliedY !== 0) {
                            appliedY = 0;
                            sticky.style.transform = "";
                        }
                        return;
                    }
                    const elH = sticky.offsetHeight;
                    const accBottom = accordion.getBoundingClientRect().bottom;
                    const desired = Math.min(
                        Math.max(naturalTop, offset),
                        accBottom - elH
                    );
                    const y = desired - naturalTop;
                    if (y !== appliedY) {
                        appliedY = y;
                        sticky.style.transform =
                            y === 0 ? "" : `translate3d(0, ${y}px, 0)`;
                    }
                };

                // Run on the global ticker every frame: ScrollTrigger callbacks
                // do not fire reliably for a plain (non-pinning) trigger inside
                // this ScrollSmoother setup.
                apply();
                gsap.ticker.add(apply);

                return () => {
                    gsap.ticker.remove(apply);
                    sticky.style.transform = "";
                };
            });
            }, sectionRef);
        });

        return () => {
            cancel();
            ctx?.revert();
            mm.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-light/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:items-start lg:gap-16">
                    {/* ── Pinned left column: heading + contact card ── */}
                    <div ref={stickyRef} className="lg:pt-2">
                        <div data-gsap>
                            <h2 className="mt-5 text-[22px] font-semibold leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug">
                                Frequently Asked{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">Questions</span>
                                    <span className="absolute bottom-1 left-0 z-0 h-3 w-full rounded bg-brand/15" />
                                </span>
                            </h2>
                            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-text-muted">
                                Everything operators ask before switching. Can&apos;t find
                                your answer? Our team replies within minutes.
                            </p>
                        </div>

                        {/* Contact card (desktop only) */}
                        <div
                            data-gsap
                            className="relative mt-8 hidden overflow-hidden rounded-3xl border border-blue-900 bg-blue-900 p-6 shadow-lg shadow-blue-900/30 lg:block"
                        >
                            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/30 blur-2xl" />

                            <div className="relative flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-lg shadow-blue-950/30">
                                    <HiOutlineChatAlt2 className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[16px] font-semibold text-white">
                                        Still have questions?
                                    </p>
                                    <p className="mt-1 text-[13px] leading-relaxed text-blue-200">
                                        Talk to a booking expert directly — no waiting,
                                        no forms.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-5 flex flex-col gap-2.5">
                                <a
                                    href="https://wa.me/8801614000401"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[13px] font-semibold text-white shadow-md shadow-emerald-500/25 transition-all hover:brightness-105 active:scale-[0.98]"
                                >
                                    <FaWhatsapp className="h-4 w-4" />
                                    Chat on WhatsApp
                                </a>
                                <a
                                    href="/contact"
                                    className="group flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-[13px] font-semibold text-white backdrop-blur transition-all hover:bg-white/20 active:scale-[0.98]"
                                >
                                    Book a Free Demo
                                    <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </a>
                            </div>

                            <div className="relative mt-5 flex flex-wrap gap-2">
                                {supportChips.map((chip) => (
                                    <span
                                        key={chip}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-text-muted"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── FAQ Accordion (scrolls) ── */}
                    <div ref={accordionRef} className="space-y-3">
                        {faqs.map((faq, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={i}
                                    data-gsap
                                    className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                                        isOpen
                                            ? "border-brand/30 bg-white shadow-lg shadow-brand/5"
                                            : "border-gray-200 bg-white hover:border-brand/25 hover:shadow-md hover:shadow-gray-100"
                                    }`}
                                >
                                    <button
                                        onClick={() =>
                                            setOpenIndex(isOpen ? null : i)
                                        }
                                        className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-5"
                                        aria-expanded={isOpen}
                                    >
                                        <span
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold transition-colors duration-300 ${
                                                isOpen
                                                    ? "bg-brand text-white"
                                                    : "bg-brand-light text-brand group-hover:bg-brand/10"
                                            }`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex-1 text-[14px] font-semibold leading-snug text-text-dark sm:text-[15px]">
                                            {faq.q}
                                        </span>
                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                                isOpen
                                                    ? "rotate-180 border-brand bg-brand text-white"
                                                    : "border-gray-200 text-text-muted group-hover:border-brand/40 group-hover:text-brand"
                                            }`}
                                        >
                                            <HiOutlineChevronDown className="h-4 w-4" />
                                        </span>
                                    </button>
                                    <div
                                        className={`grid transition-all duration-300 ease-out ${
                                            isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:pl-[76px] sm:pr-6">
                                                <p className="text-[14px] leading-relaxed text-text-muted">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom hint */}
                        <p data-gsap className="pt-2 text-center text-[13px] text-text-muted">
                            More questions?{" "}
                            <Link href="/contact" className="font-medium text-brand transition-colors hover:text-brand-hover">
                                Contact our team
                            </Link>{" "}
                            — we usually reply within a few hours.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
