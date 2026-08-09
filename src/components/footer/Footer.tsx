"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineArrowRight,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

// ── Types ────────────────────────────────────────────────────────────────────
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ── Data ─────────────────────────────────────────────────────────────────────
const FOOTER_LINKS: FooterSection[] = [
  {
    title: "Solutions",
    links: [
      { label: "Bus Booking Software", href: "/product/bus-ticketing" },
      { label: "Train Booking Software", href: "/product/train-ticketing" },
      { label: "Cruise Booking Software", href: "/product/cruise-booking" },
      { label: "Taxi Booking Software", href: "/product/taxi-booking" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIAL_LINKS: FooterLink[] = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];

// ── Sub-components ───────────────────────────────────────────────────────────
function Brand() {
  return (
    <div className="gsap-footer-item space-y-5">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/media/logo.png"
          alt="CW Ticketing"
          width={373}
          height={70}
          className="h-8 w-auto"
        />
      </Link>

      <p className="max-w-xs text-sm leading-relaxed text-gray-400">
        The white-label booking platform for buses, trains, cruises, taxis, and
        events — built for how modern transport actually moves people.
      </p>

      <ul className="space-y-2.5 text-sm text-gray-400">
        <li>
          <a
            href="mailto:info@cwticketingsystem.com"
            className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <HiOutlineMail className="h-3.5 w-3.5 text-brand" />
            </span>
            info@cwticketingsystem.com
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/8801614000401"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <FaWhatsapp className="h-3.5 w-3.5 text-emerald-400" />
            </span>
            +8801614000401
          </a>
        </li>
        <li>
          <a
            href="tel:+8801672691228"
            className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <HiOutlinePhone className="h-3.5 w-3.5 text-brand" />
            </span>
            +8801672691228
          </a>
        </li>
        <li>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Baitul+Aman+Housing+Society+Adabor+Mohammadpur+Dhaka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-2.5 transition-colors hover:text-white"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <HiOutlineLocationMarker className="h-3.5 w-3.5 text-brand" />
            </span>
            <span className="leading-snug">
              House #629-685, Road # 12, Baitul Aman Housing Society, Adabor,
              Mohammadpur, Dhaka-1207, BD
            </span>
          </a>
        </li>
      </ul>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        All systems operational
      </span>
    </div>
  );
}

function LinkColumn({ section }: { section: FooterSection }) {
  return (
    <div className="gsap-footer-item">
      <h3 className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-300">
        <span className="h-px w-4 bg-brand" />
        {section.title}
      </h3>
      <ul className="space-y-2.5">
        {section.links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {label}
                </span>
                <span className="absolute left-0 top-full block text-brand transition-transform duration-300 group-hover:-translate-y-full">
                  {label}
                </span>
              </span>
              <HiOutlineArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-brand group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ label, href }: FooterLink) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-[11px] font-medium text-gray-400 transition-all duration-200 hover:border-brand/50 hover:bg-brand/15 hover:text-white active:scale-95"
    >
      {label}
      <HiOutlineArrowRight className="h-3 w-3 opacity-40 transition-all duration-200 group-hover:text-brand group-hover:opacity-100" />
    </Link>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const items = footerRef.current?.querySelectorAll(".gsap-footer-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const divider = footerRef.current?.querySelector(".gsap-footer-divider");
      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const bottomBar = footerRef.current?.querySelector(".gsap-footer-bottom");
      if (bottomBar) {
        gsap.fromTo(
          bottomBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomBar,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      }, footerRef);
      });

    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0b0b10] text-gray-100"
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-10">
          <div className="lg:col-span-4">
            <Brand />
          </div>
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="lg:col-span-2">
              <LinkColumn section={section} />
            </div>
          ))}
        </div>

        {/* ── Giant outlined wordmark ── */}
        <div className="gsap-footer-divider select-none overflow-hidden border-t border-white/5 py-2">
          <p
            className="whitespace-nowrap text-center text-[clamp(3rem,11vw,9.5rem)] font-black leading-none tracking-tight text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,106,28,0.18), rgba(255,106,28,0.02))",
              backgroundClip: "text",
            }}
          >
            CW TICKETING
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="gsap-footer-bottom flex flex-col items-start gap-5 border-t border-white/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400">CW Ticketing</span>. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <Link
                key={label}
                href="#"
                className="transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <SocialLink key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
