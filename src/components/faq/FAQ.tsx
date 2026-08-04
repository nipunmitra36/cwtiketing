"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { HiOutlineChevronDown } from "react-icons/hi";

const faqs = [
    {
        q: "How long does it take to launch my booking platform?",
        a: "Most operators go live within 4–6 weeks. The timeline depends on your requirements, integrations, and data migration. We'll provide a clear timeline during our initial consultation.",
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

const supportItems = [
    { label: "24/7 Support", desc: "Round-the-clock assistance" },
    { label: "SLA-Backed", desc: "99.9% uptime guarantee" },
    { label: "Dedicated Manager", desc: "Personal account executive" },
];

export default function FAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const el = sectionRef.current;
            if (!el) return;

            gsap.fromTo(
                el.querySelectorAll("[data-gsap]"),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.06,
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
            id="faq"
            className="relative overflow-hidden bg-white py-16 lg:py-24"
        >
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-light/60 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center lg:hidden">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        FAQ
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                    >
                        Questions operators ask before switching.
                    </p>
                </div>
                <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
                    {/* ── FAQ Accordion ── */}
                    <div>
                        <div className="mb-8 hidden lg:block">
                            <span
                                data-gsap
                                className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand"
                            >
                                FAQ
                            </span>
                            <h2
                                data-gsap
                                className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-5xl"
                            >
                                Frequently Asked Questions
                            </h2>
                            <p
                                data-gsap
                                className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]"
                            >
                                Questions operators ask before switching.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => {
                                const isOpen = openIndex === i;
                                return (
                                    <div
                                        key={i}
                                        data-gsap
                                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-md"
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : i)
                                            }
                                            className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="pr-4 text-[14px] font-semibold text-text-dark sm:text-[15px]">
                                                {faq.q}
                                            </span>
                                            <span
                                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                                    isOpen
                                                        ? "bg-brand text-white"
                                                        : "bg-gray-100 text-text-muted"
                                                }`}
                                            >
                                                <HiOutlineChevronDown
                                                    className={`h-4 w-4 transition-transform duration-300 ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </span>
                                        </button>
                                        <div
                                            className={`transition-all duration-300 ease-out ${
                                                isOpen
                                                    ? "max-h-80 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
                                                <p className="text-[14px] leading-relaxed text-text-muted">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Premium Image Panel ── */}
                    <div
                        data-gsap
                        className="relative hidden lg:block"
                    >
                        <div className="sticky top-28 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl shadow-gray-900/30">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,106,28,0.12)_0%,_transparent_60%)]" />

                            {/* Decorative circles */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/5" />
                            <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full border border-white/5" />

                            <div className="relative px-6 pb-8 pt-8">
                                {/* Illustration area */}
                                <div className="mb-8 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-brand to-brand-dark shadow-lg shadow-brand/30">
                                            <svg
                                                className="h-12 w-12 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                                            <svg
                                                className="h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-bold text-white">
                                        Still have questions?
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
                                        Our support team is ready to help you 24/7.
                                    </p>
                                </div>

                                {/* Support features */}
                                <div className="space-y-3">
                                    {supportItems.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/20">
                                                <svg
                                                    className="h-4 w-4 text-brand"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-semibold text-white">
                                                    {item.label}
                                                </p>
                                                <p className="text-[11px] text-gray-500">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <a
                                    href="/contact"
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-brand-hover active:scale-[0.98]"
                                >
                                    Contact Support
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
