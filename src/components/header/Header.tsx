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
  HiOutlineCalendar,
  HiOutlineCube,
  HiOutlineTruck,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineBriefcase,
  HiOutlineChat,
} from "react-icons/hi";
import { FaWhatsapp, FaBus, FaCarSide, FaShuttleVan, FaSuitcaseRolling } from "react-icons/fa";

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

// ── Config ────────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "8801614000401"; // digits only, with country code
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    dropdown: [
      {
        label: "Bus Ticketing System",
        desc: "Routes, seats, fares & bookings",
        href: "/bus-ticketing-system",
        icon: <FaBus className="h-4.5 w-4.5" />,
      },
      {
        label: "Taxi Booking System",
        desc: "Dispatch, tracking & fares",
        href: "/online-taxi-booking-system",
        icon: <FaCarSide className="h-4.5 w-4.5" />,
      },
      {
        label: "Event Ticketing",
        desc: "Concerts, conferences & more",
        href: "/event-ticketing",
        icon: <HiOutlineCalendar className="h-5 w-5" />,
      },
      {
        label: "Parcel Management System",
        desc: "Parcel booking, tracking & COD",
        href: "/parcel-management-system",
        icon: <HiOutlineCube className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Industries",
    dropdown: [
      {
        label: "Bus Operators",
        desc: "Intercity & coach lines",
        href: "/intercity-bus-booking-software",
        icon: <HiOutlineTruck className="h-5 w-5" />,
      },

      {
        label: "Shuttle Companies",
        desc: "Airport & point-to-point shuttles",
        href: "/shuttle-booking-system",
        icon: <FaShuttleVan className="h-4.5 w-4.5" />,
      },

      {
        label: "Travel Agencies",
        desc: "Multi-operator ticket retail",
        href: "/bus-terminal-ticketing-system",
        icon: <FaSuitcaseRolling className="h-4.5 w-4.5" />,
      },

    ],
  },
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function scrollToHash(href: string) {
  const hash = href.split("#")[1];
  if (!hash) return;
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(`#${hash}`, true);
  else document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
}

function isActive(item: NavItem, pathname: string) {
  const hrefs = item.dropdown ? item.dropdown.map((d) => d.href) : [item.href!];
  return hrefs.some((h) => !h.includes("#") && (pathname === h || pathname.startsWith(`${h}/`)));
}

// ── Dropdown Menu (desktop) ───────────────────────────────────────────────────
function DesktopDropMenu({
  items,
  align = "left",
}: {
  items: DropMenuItem[];
  align?: "left" | "right";
}) {
  const pathname = usePathname();
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
      className={`absolute top-full mt-4 w-[320px] overflow-hidden rounded-[24px] border border-gray-200 bg-white p-2.5 shadow-2xl shadow-gray-900/10 ${align === "right" ? "right-0" : "left-0"
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
            aria-current={pathname === item.href ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-brand-light ${pathname === item.href ? "bg-brand-light" : ""
              }`}
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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = isActive(item, pathname);

  // Close the dropdown after navigating to one of its pages
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const linkClass = `flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[13.5px] font-medium transition-colors duration-150 hover:text-brand xl:px-3 ${active ? "text-brand" : "text-text-body"
    }`;

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

// ── WhatsApp Button ───────────────────────────────────────────────────────────
function WhatsAppButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group flex items-center gap-2 rounded-full border-2 border-[#25D366] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#25D366] transition-all duration-200 hover:bg-[#25D366] hover:text-white active:scale-95 ${className}`}
    >
      <FaWhatsapp className="h-4 w-4 shrink-0" />
      <span>WhatsApp</span>
    </Link>
  );
}

// ── Main Header ───────────────────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu only exists below lg (1024px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on navigation (including browser back/forward)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  // Opening expands the group that contains the current page
  const toggleMobile = () => {
    if (!mobileOpen) {
      const current = NAV_ITEMS.find((item) => item.dropdown && isActive(item, pathname));
      setOpenGroup(current?.label ?? null);
    }
    setMobileOpen((p) => !p);
  };

  // While open: freeze page scroll and close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      smoother?.paused(false);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleMobileNav = (href: string) => {
    if (isHome && href.includes("#")) {
      scrollToHash(href);
    }
    closeMobile();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4 lg:pt-5">
      {/* Backdrop — tap outside the mobile menu to close it */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobile}
            aria-hidden="true"
            className="fixed inset-0 -z-10 bg-gray-900/20 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 rounded-full border pl-4 pr-2 transition-all duration-300 lg:h-[60px] lg:pl-5 ${scrolled
          ? "border-gray-200 bg-white shadow-lg shadow-gray-900/10"
          : "border-gray-100 bg-white shadow-md shadow-gray-900/5"
          }`}
      >
        {/* ── Brand ── */}
        <Link href="/" aria-label="CWTicketing home" className="flex shrink-0 items-center gap-2">
          <Image
            src="/media/logo.png"
            alt="CWTicketing"
            width={130}
            height={32}
            className="h-7 w-auto sm:h-8"
            priority
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1.5">
          {NAV_ITEMS.map((item, i) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              align={i >= NAV_ITEMS.length - 2 ? "right" : "left"}
            />
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-2.5">
          <WhatsAppButton className="lg:px-3 xl:px-4" />
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand-hover active:scale-95"
          >
            Book Demo
          </Link>
        </div>

        {/* ── Mobile actions ── */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/contact"
            className="hidden rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-hover sm:inline-flex"
          >
            Book Demo
          </Link>
          <button
          onClick={toggleMobile}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-body transition-colors hover:border-gray-300 hover:text-text-dark"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
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
      </div>

      {/* ── Mobile Menu — floating panel under the pill ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 sm:mr-0 sm:max-w-sm lg:hidden"
          >
            {/* Scrolls inside itself so every item is reachable on short screens */}
            <div className="max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain">
              <nav aria-label="Mobile" className="px-3 pb-3 pt-2">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item, pathname);
                  const expanded = openGroup === item.label;
                  return (
                    <motion.div
                      key={item.label}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      {item.dropdown ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setOpenGroup(expanded ? null : item.label)}
                            aria-expanded={expanded}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-[15px] font-medium transition-colors hover:bg-gray-50 ${active ? "text-brand" : "text-text-dark"
                              }`}
                          >
                            {item.label}
                            <motion.span
                              animate={{ rotate: expanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-gray-400"
                            >
                              <HiOutlineChevronDown className="h-4 w-4" />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-0.5 pb-2">
                                  {item.dropdown.map((d) => {
                                    const current = pathname === d.href;
                                    return (
                                      <Link
                                        key={d.href}
                                        href={d.href}
                                        onClick={() => handleMobileNav(d.href)}
                                        aria-current={current ? "page" : undefined}
                                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-light ${current ? "bg-brand-light" : ""
                                          }`}
                                      >
                                        <span
                                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-brand group-hover:text-white ${current ? "bg-brand text-white" : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                          {d.icon}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                          <span
                                            className={`block text-[14px] font-medium leading-tight ${current ? "text-brand" : "text-text-body"
                                              }`}
                                          >
                                            {d.label}
                                          </span>
                                          <span className="mt-0.5 block text-[12px] leading-tight text-text-muted">
                                            {d.desc}
                                          </span>
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => handleMobileNav(item.href!)}
                          aria-current={active ? "page" : undefined}
                          className={`block rounded-xl px-3 py-3.5 text-[15px] font-medium transition-colors hover:bg-gray-50 ${active ? "text-brand" : "text-text-dark"
                            }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* Mobile CTAs */}
                <motion.div
                  custom={NAV_ITEMS.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-1"
                >
                  <WhatsAppButton className="w-full justify-center px-3" />
                  <Link
                    href="/contact"
                    onClick={closeMobile}
                    className="flex items-center justify-center rounded-full bg-brand px-3 py-2.5 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-hover sm:hidden"
                  >
                    Book Demo
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}