"use client";

import { useRef } from "react";

/**
 * Sample roster — swap in your real client names, countries, categories,
 * and case-study links. Flags are emoji so no extra assets are needed.
 */
const clients = [
    { name: "Coachline UK", country: "United Kingdom", flag: "🇬🇧", label: "Bus Operator", caseStudy: "/case-studies/coachline-uk" },
    { name: "RiftLink Coaches", country: "Tanzania", flag: "🇹🇿", label: "Intercity Coach Network" },
    { name: "Emerald Coachways", country: "Ireland", flag: "🇮🇪", label: "Bus Operator", caseStudy: "/case-studies/emerald-coachways" },
    { name: "Sawa Transit", country: "Cameroon", flag: "🇨🇲", label: "Transport Marketplace" },
    { name: "Ruta Directa", country: "Mexico", flag: "🇲🇽", label: "Bus Operator" },
    { name: "Falcon Shuttle", country: "UAE", flag: "🇦🇪", label: "Airport Shuttle", caseStudy: "/case-studies/falcon-shuttle" },
    { name: "Pearl Transit", country: "Qatar", flag: "🇶🇦", label: "Airport Shuttle" },
    { name: "Dnipro Lines", country: "Ukraine", flag: "🇺🇦", label: "Rail Operator" },
    { name: "Lagos Move", country: "Nigeria", flag: "🇳🇬", label: "Transport Marketplace", caseStudy: "/case-studies/lagos-move" },
    { name: "Himalayan Yatra", country: "Nepal", flag: "🇳🇵", label: "Bus Operator" },
    { name: "Padma Transit", country: "Bangladesh", flag: "🇧🇩", label: "Bus Operator", caseStudy: "/case-studies/padma-transit" },
    { name: "Ferry Nova", country: "Ireland", flag: "🇮🇪", label: "Ferry Operator" },
];

const rowA = clients.slice(0, 6);
const rowB = clients.slice(6);

export default function Clients() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-16 lg:py-20"
        >
            <style jsx>{`
                @keyframes marquee-left {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @keyframes marquee-right {
                    from {
                        transform: translateX(-50%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .marquee-track {
                    width: max-content;
                    animation: marquee-left 42s linear infinite;
                }
                .marquee-track.reverse {
                    animation-name: marquee-right;
                    animation-duration: 48s;
                }
                .marquee-row:hover .marquee-track {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation: none;
                    }
                }
            `}</style>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-3 py-1 text-[12px] font-medium text-brand">
                        Global Trust
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl">
                        Trusted by Ticketing Businesses{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">Worldwide</span>
                            <span className="absolute bottom-1 left-0 right-0 h-3 rounded bg-brand/15" />
                        </span>
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
                        From bus operators to airport shuttles, ticketing businesses
                        across a dozen countries run their operations on our platform.
                    </p>
                </div>

                <div className="space-y-5">
                    <MarqueeRow items={rowA} reverse={false} />
                    <MarqueeRow items={rowB} reverse={true} />
                </div>
            </div>

            {/* Edge fades so the loop never looks like it "cuts" */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
        </section>
    );
}

function MarqueeRow({
    items,
    reverse,
}: {
    items: typeof clients;
    reverse: boolean;
}) {
    // Duplicate the row so translateX(-50%) loops seamlessly.
    const doubled = [...items, ...items];

    return (
        <div className="marquee-row overflow-hidden">
            <div className={`marquee-track flex gap-4 ${reverse ? "reverse" : ""}`}>
                {doubled.map((client, i) => (
                    <ClientCard key={`${client.name}-${i}`} client={client} />
                ))}
            </div>
        </div>
    );
}

function ClientCard({ client }: { client: (typeof clients)[number] }) {
    return (
        <div className="group flex h-[168px] w-[220px] shrink-0 flex-col justify-between rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm shadow-gray-200/40 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-200/70 sm:w-[240px]">
            <div>
                <div className="mb-3 text-[17px] font-bold tracking-tight text-text-dark">
                    {client.name}
                </div>
                <div className="flex items-center gap-1.5 text-[12.5px] text-text-muted">
                    <span className="text-[15px] leading-none">{client.flag}</span>
                    <span>{client.country}</span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex w-fit items-center rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-medium text-brand">
                    {client.label}
                </span>

                {client.caseStudy && (
                    <a
                        href={client.caseStudy}
                        className="flex shrink-0 translate-x-1 items-center gap-1 text-[12px] font-semibold text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                        Case study
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                )}
            </div>
        </div>
    );
}