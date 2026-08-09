"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import {
    HiOutlineCalendar,
    HiOutlineChartSquareBar,
    HiOutlineCog,
    HiOutlineCreditCard,
    HiOutlineDeviceMobile,
    HiOutlineLockClosed,
    HiOutlineSearch,
    HiOutlineTicket,
    HiOutlineTrendingUp,
    HiOutlineUser,
    HiOutlineUsers,
    HiOutlineViewGrid,
    HiOutlineCash,
    HiOutlineLink,
    HiOutlineLocationMarker,
    HiOutlineMap,
    HiOutlinePhone,
    HiOutlineQrcode,
    HiOutlineStatusOnline,
} from "react-icons/hi";

const tabs = [
    { id: "admin", label: "Admin Dashboard", icon: HiOutlineChartSquareBar },
    { id: "passenger", label: "Passenger App", icon: HiOutlineDeviceMobile },
    { id: "agent", label: "Agent Portal", icon: HiOutlineCash },
    { id: "driver", label: "Driver App", icon: HiOutlineMap },
];

export default function DashboardPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("admin");

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
                    stagger: 0.1,
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
            id="platform"
            className="relative overflow-hidden bg-gray-950 py-16 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,106,28,0.08)_0%,_transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span
                        data-gsap
                        className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[12px] font-medium text-brand"
                    >
                        Product demo
                    </span>
                    <h2
                        data-gsap
                        className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl"
                    >
                        One Platform, Four Surfaces
                    </h2>
                    <p
                        data-gsap
                        className="mt-3 text-[14px] leading-relaxed text-gray-400 sm:text-[15px]"
                    >
                        Every stakeholder gets a screen built for their job — all
                        reading from the same live data.
                    </p>
                </div>

                <div data-gsap className="mb-8 flex justify-center">
                    <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-xl border border-gray-800 bg-gray-900 p-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[12px] font-medium transition-all duration-200 sm:px-4 sm:text-[13px] ${
                                        isActive
                                            ? "bg-brand text-white shadow-sm"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div data-gsap className="relative">
                    {activeTab === "admin" && <AdminPanel />}
                    {activeTab === "passenger" && <PassengerApp />}
                    {activeTab === "agent" && <AgentPortal />}
                    {activeTab === "driver" && <DriverApp />}
                </div>
            </div>
        </section>
    );
}

/* ── Browser chrome wrapper ─────────────────────────────────────────────── */
function BrowserFrame({
    url,
    badge,
    children,
}: {
    url: string;
    badge?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-3 border-b border-gray-800 bg-gray-900/80 px-4 py-3">
                <div className="flex -space-x-1 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mx-auto flex max-w-sm items-center justify-center gap-1.5 truncate rounded-lg bg-gray-800 px-3 py-1.5 text-[10px] text-gray-400 sm:text-[11px]">
                        <HiOutlineLockClosed className="h-3 w-3 shrink-0 text-emerald-400" />
                        <span className="truncate">{url}</span>
                    </div>
                </div>
                {badge && (
                    <span className="hidden shrink-0 items-center gap-1.5 text-[11px] text-emerald-400 sm:flex">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

function StatCard({
    icon: Icon,
    value,
    label,
    delta,
    color,
}: {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
    delta: string;
    color: string;
}) {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-3.5">
            <div className="mb-2 flex items-center justify-between">
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 ${color}`}>
                    <Icon className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-0.5 rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                    <HiOutlineTrendingUp className="h-2.5 w-2.5" />
                    {delta}
                </span>
            </div>
            <p className="text-lg font-medium text-white">{value}</p>
            <p className="text-[10px] text-gray-500">{label}</p>
        </div>
    );
}

function AdminPanel() {
    const week = [
        { d: "Mon", v: 42 },
        { d: "Tue", v: 56 },
        { d: "Wed", v: 48 },
        { d: "Thu", v: 70 },
        { d: "Fri", v: 92 },
        { d: "Sat", v: 80 },
        { d: "Sun", v: 64 },
    ];
    const events = [
        { day: "08", mon: "AUG", name: "Tech Fest 2026", sold: "1,240" },
        { day: "09", mon: "AUG", name: "Jazz Night", sold: "860" },
        { day: "15", mon: "AUG", name: "City Marathon", sold: "2,300" },
    ];
    const bookings = [
        { customer: "John D.", type: "Bus", route: "NYC → Boston", amount: "$65.00", status: "Paid" },
        { customer: "Sara M.", type: "Event", route: "Tech Fest 2026", amount: "$120.00", status: "Paid" },
        { customer: "R. Ahmed", type: "Train", route: "Dhaka → Chattogram", amount: "$35.00", status: "Pending" },
        { customer: "Liam K.", type: "Bus", route: "LA → San Francisco", amount: "$78.00", status: "Paid" },
        { customer: "Emma T.", type: "Event", route: "Jazz Night", amount: "$50.00", status: "Refunded" },
    ];
    const sidebarIcons = [
        HiOutlineViewGrid,
        HiOutlineTicket,
        HiOutlineUsers,
        HiOutlineCreditCard,
        HiOutlineCalendar,
        HiOutlineCog,
    ];
    const statusStyles: Record<string, string> = {
        Paid: "text-emerald-400 bg-emerald-400/10",
        Pending: "text-amber-400 bg-amber-400/10",
        Refunded: "text-rose-400 bg-rose-400/10",
    };
    const typeStyles: Record<string, string> = {
        Bus: "text-brand bg-brand/10",
        Train: "text-sky-400 bg-sky-400/10",
        Event: "text-violet-400 bg-violet-400/10",
    };

    return (
        <BrowserFrame url="admin.cwticketingsystem.com/dashboard" badge="Live">
            <div className="flex">
                {/* Sidebar */}
                <aside className="hidden w-14 shrink-0 flex-col items-center gap-5 border-r border-gray-800 bg-gray-900/60 py-5 md:flex">
                    {sidebarIcons.map((Icon, i) => (
                        <span
                            key={i}
                            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                                i === 0 ? "bg-brand/20 text-brand" : "text-gray-600 hover:text-gray-300"
                            }`}
                        >
                            <Icon className="h-[18px] w-[18px]" />
                        </span>
                    ))}
                </aside>

                {/* Main */}
                <main className="min-w-0 flex-1 space-y-4 p-4 sm:p-5">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <StatCard icon={HiOutlineUsers} value="1,247" label="Today's Bookings" delta="12%" color="text-brand" />
                        <StatCard icon={HiOutlineCreditCard} value="$84K" label="Revenue" delta="8%" color="text-emerald-400" />
                        <StatCard icon={HiOutlineViewGrid} value="76%" label="Seats Filled" delta="4%" color="text-sky-400" />
                        <StatCard icon={HiOutlineTicket} value="8,420" label="Events Sold" delta="21%" color="text-violet-400" />
                    </div>

                    {/* Chart + events */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 lg:col-span-2">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-[11px] font-semibold text-gray-300">
                                    Weekly Bookings
                                </p>
                                <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                    <span className="h-2 w-2 rounded-full bg-brand" />
                                    Tickets sold
                                </span>
                            </div>
                            <div className="flex h-28 items-end gap-2 sm:h-32">
                                {week.map((day, i) => (
                                    <div key={day.d} className="group flex h-full flex-1 flex-col justify-end">
                                        <div
                                            className={`w-full rounded-t-md transition-all ${
                                                i === 4
                                                    ? "bg-gradient-to-t from-brand to-brand-hover shadow-lg shadow-brand/30"
                                                    : "bg-gray-700/80 group-hover:bg-gray-600"
                                            }`}
                                            style={{ height: `${day.v}%` }}
                                        />
                                        <span className="mt-1.5 text-center text-[9px] text-gray-500">
                                            {day.d}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                            <p className="mb-3 text-[11px] font-semibold text-gray-300">
                                Upcoming Events
                            </p>
                            <div className="space-y-2.5">
                                {events.map((ev) => (
                                    <div key={ev.name} className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950 p-2.5">
                                        <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-brand/10 text-brand">
                                            <span className="text-[12px] font-medium leading-none">{ev.day}</span>
                                            <span className="text-[8px] font-semibold uppercase">{ev.mon}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-[11px] font-semibold text-white">{ev.name}</p>
                                            <p className="text-[9px] text-gray-500">{ev.sold} tickets sold</p>
                                        </div>
                                        <HiOutlineTicket className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent bookings */}
                    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50">
                        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                            <p className="text-[11px] font-semibold text-gray-300">Recent Bookings</p>
                            <span className="text-[10px] text-brand">View all →</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[480px] text-left">
                                <thead>
                                    <tr className="border-b border-gray-800 text-[9px] uppercase tracking-wider text-gray-500">
                                        <th className="px-4 py-2.5 font-medium">Customer</th>
                                        <th className="px-4 py-2.5 font-medium">Type</th>
                                        <th className="px-4 py-2.5 font-medium">Route / Event</th>
                                        <th className="hidden px-4 py-2.5 font-medium sm:table-cell">Amount</th>
                                        <th className="px-4 py-2.5 text-right font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((b, i) => (
                                        <tr key={i} className="border-b border-gray-800/60 last:border-0">
                                            <td className="px-4 py-2.5 text-[11px] font-medium text-white">{b.customer}</td>
                                            <td className="px-4 py-2.5">
                                                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${typeStyles[b.type]}`}>
                                                    {b.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2.5 text-[11px] text-gray-400">{b.route}</td>
                                            <td className="hidden px-4 py-2.5 text-[11px] font-semibold text-gray-300 sm:table-cell">{b.amount}</td>
                                            <td className="px-4 py-2.5 text-right">
                                                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${statusStyles[b.status]}`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserFrame>
    );
}

function AgentPortal() {
    const sales = [
        { agent: "Travco Travels", sales: "$4,320", commission: "$216", trips: 132, status: "Active" },
        { agent: "Sunrise Holidays", sales: "$2,980", commission: "$149", trips: 98, status: "Active" },
        { agent: "Metro Tours", sales: "$1,150", commission: "$57", trips: 41, status: "Pending" },
    ];

    return (
        <BrowserFrame url="agents.cwticketingsystem.com/dashboard" badge="Reseller">
            <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-3">
                {/* Stats */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                    <p className="mb-3 text-[11px] font-semibold text-gray-300">This month</p>
                    <div className="space-y-3">
                        {[
                            { label: "Agent sales", value: "$8,450", color: "text-brand" },
                            { label: "Your commission", value: "$422", color: "text-emerald-400" },
                            { label: "Active agents", value: "24", color: "text-sky-400" },
                        ].map((s) => (
                            <div key={s.label} className="flex items-center justify-between">
                                <span className="text-[11px] text-gray-400">{s.label}</span>
                                <span className={`text-[15px] font-medium ${s.color}`}>{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reseller link */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-gray-300">
                        <HiOutlineLink className="h-3.5 w-3.5 text-brand" /> Agent booking link
                    </p>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-950 px-3 py-2">
                        <span className="truncate text-[10px] text-gray-500">
                            book.cwticketingsystem.com/agent/travco
                        </span>
                        <HiOutlineLink className="h-3.5 w-3.5 shrink-0 text-brand" />
                    </div>
                    <p className="mt-3 text-[10px] leading-relaxed text-gray-500">
                        Every agent gets a branded booking link. Commission settles automatically each week.
                    </p>
                </div>

                {/* Payout */}
                <div className="rounded-xl border border-brand/30 bg-brand/10 p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-brand">
                        <HiOutlineCash className="h-3.5 w-3.5" /> Payout due
                    </p>
                    <p className="text-2xl font-medium text-white">$422.00</p>
                    <p className="text-[10px] text-gray-400">Next payout: Friday</p>
                </div>

                {/* Sales table */}
                <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 lg:col-span-3">
                    <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
                        <p className="text-[11px] font-semibold text-gray-300">Agent performance</p>
                        <span className="text-[10px] text-brand">View all →</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] text-left">
                            <thead>
                                <tr className="border-b border-gray-800 text-[9px] uppercase tracking-wider text-gray-500">
                                    <th className="px-4 py-2.5 font-medium">Agent</th>
                                    <th className="px-4 py-2.5 font-medium">Trips</th>
                                    <th className="px-4 py-2.5 font-medium">Sales</th>
                                    <th className="px-4 py-2.5 font-medium">Commission</th>
                                    <th className="px-4 py-2.5 text-right font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((s, i) => (
                                    <tr key={i} className="border-b border-gray-800/60 last:border-0">
                                        <td className="px-4 py-2.5 text-[11px] font-medium text-white">{s.agent}</td>
                                        <td className="px-4 py-2.5 text-[11px] text-gray-400">{s.trips}</td>
                                        <td className="px-4 py-2.5 text-[11px] font-semibold text-gray-300">{s.sales}</td>
                                        <td className="px-4 py-2.5 text-[11px] font-semibold text-emerald-400">{s.commission}</td>
                                        <td className="px-4 py-2.5 text-right">
                                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${s.status === "Active" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}>
                                                {s.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BrowserFrame>
    );
}

function DriverApp() {
    return (
        <div className="mx-auto max-w-[320px]">
            <div className="overflow-hidden rounded-[32px] border-[3px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between px-5 pb-2 pt-4">
                    <span className="text-[11px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400">●●●●</span>
                        <span className="text-[11px] text-gray-400">100%</span>
                    </div>
                </div>

                <div className="border-b border-gray-800 px-4 pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-500">Driver mode</p>
                            <p className="text-[13px] font-medium text-white">James Okoro</p>
                        </div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <HiOutlineUser className="h-4 w-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    {/* Live trip */}
                    <div className="rounded-xl border border-brand/30 bg-brand/10 p-3.5">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-brand">
                                <HiOutlineStatusOnline className="h-3 w-3" /> Live trip
                            </span>
                            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                                On time
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-500">From</p>
                                <p className="text-[13px] font-medium text-white">Dhaka</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg className="h-4 w-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-[10px] text-gray-500">To</p>
                                <p className="text-[13px] font-medium text-white">Chattogram</p>
                            </div>
                        </div>
                    </div>

                    {/* Manifest */}
                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-3.5">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                            Passenger manifest • 24 / 32
                        </p>
                        <div className="mb-2 flex -space-x-1.5">
                            {["A", "S", "M", "R", "T", "P"].map((c) => (
                                <span key={c} className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 bg-gray-800 text-[8px] font-semibold text-gray-300">
                                    {c}
                                </span>
                            ))}
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[8px] font-semibold text-white">
                                +18
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500">Next stop: Uttara • 12 min</p>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-700 py-2.5 text-[11px] font-semibold text-gray-300">
                            <HiOutlinePhone className="h-3.5 w-3.5" /> Dispatcher
                        </button>
                        <button className="rounded-lg bg-brand py-2.5 text-[11px] font-semibold text-white">
                            Complete trip
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-800 py-2 text-[10px] text-gray-500">
                        <HiOutlineLocationMarker className="h-3.5 w-3.5 text-brand" /> Live location sharing on
                    </div>
                </div>
            </div>
        </div>
    );
}

function PassengerApp() {
    const bottomNav = [
        { icon: HiOutlineSearch, label: "Search", active: true },
        { icon: HiOutlineTicket, label: "My Trips", active: false },
        { icon: HiOutlineCalendar, label: "Events", active: false },
        { icon: HiOutlineUser, label: "Profile", active: false },
    ];

    return (
        <div className="mx-auto max-w-[320px]">
            <div className="overflow-hidden rounded-[32px] border-[3px] border-gray-700 bg-gray-900 shadow-2xl shadow-black/40">
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pb-2 pt-4">
                    <span className="text-[11px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-400">●●●●</span>
                        <span className="text-[11px] text-gray-400">100%</span>
                    </div>
                </div>

                {/* Header */}
                <div className="border-b border-gray-800 px-4 pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-gray-500">Welcome back,</p>
                            <p className="text-[13px] font-medium text-white">Alex Carter</p>
                        </div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
                            <HiOutlineTicket className="h-4 w-4" />
                        </span>
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    {/* Route card */}
                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-3.5">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Bus</span>
                            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-semibold text-brand">Today</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-500">From</p>
                                <p className="text-[13px] font-medium text-white">New York</p>
                                <p className="text-[9px] text-gray-500">07:00 AM</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <span className="text-[9px] text-gray-500">6h 30m</span>
                            </div>
                            <div className="flex-1 text-right">
                                <p className="text-[10px] text-gray-500">To</p>
                                <p className="text-[13px] font-medium text-white">Boston</p>
                                <p className="text-[9px] text-gray-500">01:30 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Operators */}
                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-3.5">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">Operators</p>
                        {[
                            { name: "Greyhound", type: "AC Sleeper", price: "$65", seats: "12 seats left", selected: true },
                            { name: "Megabus", type: "Non-AC", price: "$45", seats: "24 seats left", selected: false },
                        ].map((bus) => (
                            <div
                                key={bus.name}
                                className={`mb-2 flex items-center justify-between rounded-lg border p-2.5 last:mb-0 ${
                                    bus.selected ? "border-brand/40 bg-brand/10" : "border-gray-800 bg-gray-900"
                                }`}
                            >
                                <div>
                                    <p className="text-[12px] font-medium text-white">{bus.name}</p>
                                    <p className="text-[10px] text-gray-500">{bus.type} • {bus.seats}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[13px] font-medium text-brand">{bus.price}</p>
                                    <button
                                        className={`rounded-md px-2.5 py-1 text-[9px] font-semibold transition-colors ${
                                            bus.selected ? "bg-brand text-white" : "border border-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {bus.selected ? "Selected" : "Select"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* QR ticket */}
                    <div className="flex items-center gap-3 rounded-xl border border-brand/25 bg-brand/10 p-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-900">
                            <HiOutlineQrcode className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-medium text-white">CW-83291 • NYC → Boston</p>
                            <p className="text-[10px] text-gray-400">Seat A12 • Boarding 07:00 AM</p>
                        </div>
                        <span className="rounded-full bg-brand px-2 py-1 text-[9px] font-semibold text-white">QR</span>
                    </div>
                </div>

                {/* Bottom nav */}
                <div className="flex items-center justify-around border-t border-gray-800 px-4 py-3">
                    {bottomNav.map((tab) => (
                        <span key={tab.label} className={`flex flex-col items-center gap-0.5 ${tab.active ? "text-brand" : "text-gray-500"}`}>
                            <tab.icon className="h-4 w-4" />
                            <span className="text-[9px] font-medium">{tab.label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
