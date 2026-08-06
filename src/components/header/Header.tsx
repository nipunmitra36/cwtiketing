"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "@/lib/gsap";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCollection,
  HiOutlineChip,
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlineCalendar,
  HiOutlineOfficeBuilding,
  HiOutlineTruck,
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineBriefcase,
  HiOutlineChat,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DropMenuItem {
  label: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropMenuItem[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    dropdown: [
      {
        label: "Bus Ticketing System",
        desc: "Routes, seats, fares & bookings",
        href: "/services/bus-ticketing",
        icon: <HiOutlineTruck className="h-5 w-5" />,
      },
      {
        label: "Train Booking System",
        desc: "Rail schedules & reservations",
        href: "/services/train-ticketing",
        icon: <HiOutlineChip className="h-5 w-5" />,
      },
      {
        label: "Cruise Booking System",
        desc: "Deck plans & online bookings",
        href: "/services/cruise-booking",
        icon: <HiOutlineGlobeAlt className="h-5 w-5" />,
      },
      {
        label: "Taxi Booking System",
        desc: "Dispatch, tracking & fares",
        href: "/services/taxi-booking",
        icon: <HiOutlineLightningBolt className="h-5 w-5" />,
      },
      {
        label: "Event Ticketing",
        desc: "Concerts, conferences & more",
        href: "/services/event-ticketing",
        icon: <HiOutlineCalendar className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Industries",
    dropdown: [
      {
        label: "Bus Operators",
        desc: "Intercity, shuttle & coach lines",
        href: "/industries/bus-operators",
        icon: <HiOutlineCollection className="h-5 w-5" />,
      },
      {
        label: "Travel Agencies",
        desc: "Multi-operator ticket retail",
        href: "/industries/travel-agencies",
        icon: <HiOutlineGlobe className="h-5 w-5" />,
      },
      {
        label: "Shuttle Companies",
        desc: "Airport & point-to-point shuttles",
        href: "/industries/shuttle-companies",
        icon: <HiOutlineOfficeBuilding className="h-5 w-5" />,
      },
      {
        label: "Fleet Managers",
        desc: "Dispatch, manifests & analytics",
        href: "/industries/fleet-managers",
        icon: <HiOutlineUserGroup className="h-5 w-5" />,
      },
    ],
  },
  { label: "Product Demo", href: "/features" },
  {
    label: "Resources",
    dropdown: [
      {
        label: "Blog",
        desc: "Guides & industry insights",
        href: "/blog",
        icon: <HiOutlineDocumentText className="h-5 w-5" />,
      },
      {
        label: "FAQ",
        desc: "Quick answers to common questions",
        href: "/#faq",
        icon: <HiOutlineQuestionMarkCircle className="h-5 w-5" />,
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    dropdown: [
      {
        label: "About Us",
        desc: "Who we are & what we do",
        href: "/about",
        icon: <HiOutlineBriefcase className="h-5 w-5" />,
      },
      {
        label: "Contact",
        desc: "Talk to our team",
        href: "/contact",
        icon: <HiOutlineChat className="h-5 w-5" />,
      },
    ],
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.15, ease: EASE },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: EASE },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: EASE },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.055, duration: 0.28, ease: EASE },
  }),
};

// ── Dropdown Menu (desktop) ───────────────────────────────────────────────────
function DesktopDropMenu({
  items,
  align = "left",
}: {
  items: DropMenuItem[];
  align?: "left" | "right";
}) {
  const notchClass =
    align === "right"
      ? "right-6"
      : "left-6";
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`absolute top-full mt-4 w-[320px] overflow-hidden rounded-[24px] border border-gray-200 bg-white p-2.5 shadow-2xl shadow-gray-900/10 ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      <div
        className={`absolute -top-1.5 h-3 w-3 rotate-45 rounded-sm border-l border-t border-gray-200 bg-white ${notchClass}`}
      />
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-brand-light"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-colors group-hover:bg-brand group-hover:text-white">
              {item.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold leading-tight text-text-body transition-colors group-hover:text-brand">
                {item.label}
              </span>
              <span className="mt-0.5 block text-[11px] leading-tight text-text-muted">
                {item.desc}
              </span>
            </span>
            <HiOutlineChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ── Desktop Nav Item ──────────────────────────────────────────────────────────
function DesktopNavItem({ item, align }: { item: NavItem; align: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const linkClass =
    "flex items-center gap-1 text-[13.5px] font-medium text-text-body transition-colors duration-150 hover:text-text-dark";

  if (item.dropdown) {
    return (
      <div
        ref={ref}
        className="relative"
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setOpen(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setOpen(false), 200);
        }}
      >
        <button
          onClick={() => setOpen((p) => !p)}
          className={`${linkClass} select-none`}
          aria-expanded={open}
        >
          {item.label}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && <DesktopDropMenu items={item.dropdown} align={align} />}
        </AnimatePresence>
      </div>
    );
  }

  const isAnchor = item.href!.includes("#");
  return (
    <Link
      href={item.href!}
      onClick={(e) => {
        if (isAnchor && isHome) {
          e.preventDefault();
          scrollToHash(item.href!);
        }
      }}
      className={linkClass}
    >
      {item.label}
    </Link>
  );
}

// ── Main Header ───────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = () => setMobileOpen(false);

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

  const handleMobileNav = (href: string) => {
    if (isHome && href.includes("#")) {
      scrollToHash(href);
    }
    closeMobile();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-5">
      <div
        className={`mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border pl-3 pr-2 transition-all duration-300 sm:pl-4 sm:pr-3 ${
          scrolled
            ? "border-gray-200 bg-white shadow-lg shadow-gray-900/10"
            : "border-gray-100 bg-white shadow-md shadow-gray-900/5"
        }`}
      >
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/media/logo.png"
            alt="CW Ticketing"
            width={130}
            height={32}
            className="h-7 w-auto sm:h-8"
            priority
          />
          <span className="rounded-full border border-brand/20 bg-brand-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
            Beta
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              align={i >= NAV_ITEMS.length - 2 ? "right" : "left"}
            />
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
          >
            Book Demo
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-text-body transition-colors hover:border-gray-300 hover:text-text-dark lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineX className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <HiOutlineMenuAlt3 className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Mobile Menu — floating panel under the pill ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 lg:hidden"
          >
            <nav className="space-y-0.5 px-4 py-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {item.dropdown ? (
                    <div>
                      <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                        {item.label}
                      </p>
                      <div className="space-y-0.5">
                        {item.dropdown.map((d) => (
                          <Link
                            key={d.href}
                            href={d.href}
                            onClick={() => handleMobileNav(d.href)}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-brand group-hover:text-white">
                              {d.icon}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-medium text-text-body">
                                {d.label}
                              </span>
                              <span className="block text-[11px] text-text-muted">
                                {d.desc}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={() => handleMobileNav(item.href!)}
                      className="block rounded-xl px-3 py-2.5 text-[14px] font-medium text-text-body transition-colors hover:bg-gray-50 hover:text-text-dark"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_ITEMS.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="!mt-4 border-t border-gray-100 pt-4"
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="w-full rounded-full bg-brand px-4 py-2.5 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  Book Demo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
