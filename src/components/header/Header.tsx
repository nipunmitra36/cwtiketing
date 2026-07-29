"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineCode,
  HiOutlineCollection,
  HiOutlineChip,
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiArrowRight,
} from "react-icons/hi";

// ── Types ─────────────────────────────────────────────────────────────────────
interface MegaSubItem {
  label: string;
  href: string;
}

interface MegaMenuItem {
  label: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  children?: MegaSubItem[];
}

interface NavItem {
  label: string;
  href?: string;
  mega?: MegaMenuItem[];
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES_MEGA: MegaMenuItem[] = [
  {
    label: "Bus Ticketing System",
    desc: "Intercity, shuttle & marketplace solutions",
    href: "/services/bus-ticketing",
    icon: <HiOutlineCollection className="h-5 w-5" />,
    children: [
      { label: "Intercity Bus Ticketing System", href: "/services/bus-ticketing/intercity" },
      { label: "Shuttle Booking System", href: "/services/bus-ticketing/shuttle" },
      { label: "Bus Ticketing Marketplace", href: "/services/bus-ticketing/marketplace" },
    ],
  },
  {
    label: "Train Ticketing System",
    desc: "Rail booking & reservation platform",
    href: "/services/train-ticketing",
    icon: <HiOutlineChip className="h-5 w-5" />,
  },
  {
    label: "Cruise Booking System",
    desc: "Cruise line booking & management",
    href: "/services/cruise-booking",
    icon: <HiOutlineGlobeAlt className="h-5 w-5" />,
  },
  {
    label: "Taxi Booking System",
    desc: "Ride-hailing & fleet management",
    href: "/services/taxi-booking",
    icon: <HiOutlineLightningBolt className="h-5 w-5" />,
  },
  {
    label: "Cable Car Booking System",
    desc: "Aerial lift ticketing solutions",
    href: "/services/cable-car-booking",
    icon: <HiOutlineOfficeBuilding className="h-5 w-5" />,
  },
  {
    label: "Event Ticketing System",
    desc: "Conferences, concerts & events",
    href: "/services/event-ticketing",
    icon: <HiOutlineCalendar className="h-5 w-5" />,
  },
  {
    label: "Parcel Management System",
    desc: "Shipping, tracking & logistics",
    href: "/services/parcel-management",
    icon: <HiOutlineDocumentText className="h-5 w-5" />,
  },
  {
    label: "Customer Management System",
    desc: "CRM & customer engagement",
    href: "/services/customer-management",
    icon: <HiOutlineUserGroup className="h-5 w-5" />,
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Services", mega: SERVICES_MEGA },
  { label: "Features", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const megaMenuVariants: Variants = {
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

const flyoutVariants: Variants = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: EASE },
  },
  exit: {
    opacity: 0,
    x: 6,
    transition: { duration: 0.12, ease: EASE },
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

// ── Desktop Mega Menu ─────────────────────────────────────────────────────────
function DesktopMegaMenu({ items }: { items: MegaMenuItem[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIdx(idx);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredIdx(null), 150);
  };

  const activeItem = hoveredIdx !== null ? items[hoveredIdx] : null;

  return (
    <motion.div
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseLeave={handleLeave}
      className="absolute left-1/2 top-full mt-4 w-[680px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl shadow-gray-900/10"
    >
      {/* Arrow notch */}
      <div className="absolute -top-1.5 left-[140px] h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-l border-t border-gray-200 bg-white" />

      <div className="flex">
        {/* Left: service list */}
        <div className="w-[320px] shrink-0 space-y-0.5 border-r border-gray-100/70 p-3">
          {items.map((item, idx) => (
            <div
              key={item.href}
              onMouseEnter={() => handleEnter(idx)}
              className="relative"
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${hoveredIdx === idx
                    ? "bg-brand-light text-brand"
                    : "text-text-body hover:bg-gray-50 hover:text-text-dark"
                  }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${hoveredIdx === idx
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                >
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold leading-tight">
                    {item.label}
                  </span>
                  <span className="block text-[11px] text-text-muted leading-tight mt-0.5">
                    {item.desc}
                  </span>
                </span>
                {item.children && (
                  <HiOutlineChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Right: flyout for sub-items */}
        <div className="flex-1 p-4">
          <AnimatePresence mode="wait">
            {activeItem?.children ? (
              <motion.div
                key={activeItem.href}
                variants={flyoutVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-1"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-text-muted">
                  {activeItem.label}
                </p>
                {activeItem.children.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                  >
                    <span className="flex h-2 w-2 shrink-0 rounded-full bg-brand/30 transition-colors group-hover:bg-brand" />
                    <span className="text-[13px] font-medium text-text-body transition-colors group-hover:text-text-dark">
                      {sub.label}
                    </span>
                    <HiOutlineChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                ))}
                <Link
                  href={activeItem.href}
                  className="mt-3 flex items-center gap-1.5 rounded-xl px-3 py-2 text-[12px] font-semibold text-brand transition-colors hover:bg-brand-light"
                >
                  View all {activeItem.label} solutions
                  <HiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="overview"
                variants={flyoutVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light">
                  <HiOutlineCode className="h-7 w-7 text-brand" />
                </div>
                <p className="mb-1 text-[14px] font-semibold text-text-dark">
                  Explore all solutions
                </p>
                <p className="mb-4 max-w-[220px] text-[12px] leading-relaxed text-text-muted">
                  Hover over a service to see sub-items or click to explore.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  View all services
                  <HiArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── Desktop Nav Item ──────────────────────────────────────────────────────────
function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  if (item.mega) {
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
        <AnimatePresence>{open && <DesktopMegaMenu items={item.mega} />}</AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={item.href!} className={linkClass}>
      {item.label}
    </Link>
  );
}

// ── Mobile Sub-Items Accordion ────────────────────────────────────────────────
function MobileServiceAccordion({
  item,
  onClose,
}: {
  item: MegaMenuItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium text-text-body transition-colors hover:bg-gray-50 hover:text-text-dark"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            {item.icon}
          </span>
          {item.label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiOutlineChevronDown className="h-4 w-4 text-gray-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
              {item.children.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onClose}
                  className="block rounded-lg px-2.5 py-2 text-[12px] text-text-muted transition-colors hover:bg-gray-50 hover:text-text-dark"
                >
                  {sub.label}
                </Link>
              ))}
              <Link
                href={item.href}
                onClick={onClose}
                className="block rounded-lg px-2.5 py-2 text-[12px] font-semibold text-brand transition-colors hover:bg-brand-light"
              >
                View all →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Header ───────────────────────────────────────────────────────────────
// Floating glass pill that sits on top of the hero video, in the spirit of
// Gorgias's header: always a soft, frosted, rounded surface — never a hard
// full-width bar — so the video reads through the edges while the nav
// itself stays crisp and legible.
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-5">
      <div
        className={`mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full border pl-3 pr-2 transition-all duration-300 sm:pl-4 sm:pr-3 ${scrolled
            ? "border-gray-200 bg-white shadow-lg shadow-gray-900/10"
            : "border-gray-100 bg-white shadow-md shadow-gray-900/5"
          }`}
      >
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center">
          <Image
            src="/media/logo.png"
            alt="CW Ticketing"
            width={130}
            height={32}
            className="h-7 w-auto sm:h-8"
            priority
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem key={item.label} item={item} />
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
          >
            Book a Demo
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

      {/* ── Mobile Menu — floating glass panel under the pill ── */}
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
              {/* Services accordion (mega menu) */}
              <motion.div
                custom={0}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
              >
                <MobileServicesBlock onClose={closeMobile} />
              </motion.div>

              {/* Simple nav items */}
              {NAV_ITEMS.filter((n) => !n.mega).map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i + 1}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={item.href!}
                    onClick={closeMobile}
                    className="block rounded-xl px-3 py-2.5 text-[14px] font-medium text-text-body transition-colors hover:bg-gray-50 hover:text-text-dark"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                custom={NAV_ITEMS.length + 1}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="!mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4"
              >
                
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="w-full rounded-full bg-brand px-4 py-2.5 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  Book a Demo
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Small helper so the Services accordion keeps its own open/close state
// without cluttering the main component.
function MobileServicesBlock({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-text-body transition-colors hover:bg-gray-50 hover:text-text-dark"
      >
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-light text-brand">
            <HiOutlineCode className="h-3.5 w-3.5" />
          </span>
          Services
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiOutlineChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
              {SERVICES_MEGA.map((item) => (
                <MobileServiceAccordion key={item.href} item={item} onClose={onClose} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}