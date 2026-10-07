"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineArrowRight,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// ── Types ────────────────────────────────────────────────────────────────────
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink extends FooterLink {
  icon: React.ReactNode;
  hoverBg: string;
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
      { label: "Bus Ticketing System", href: "/bus-ticketing-system" },
      { label: "Taxi Booking System", href: "/online-taxi-booking-system" },
      { label: "Event Ticketing System", href: "/event-ticketing-system" },
      { label: "Parcel Management System", href: "/parcel-management-system" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-condition" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/cwticketingsystem/",
    icon: <FaFacebookF className="h-4 w-4" />,
    hoverBg: "hover:bg-[#1877F2]",
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/CwTicket",
    icon: <FaXTwitter className="h-4 w-4" />,
    hoverBg: "hover:bg-black",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cw_ticketing/",
    icon: <FaInstagram className="h-4 w-4" />,
    hoverBg: "hover:bg-[#E4405F]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCaKRQhi40r6Q7CQ2tDg82pQ",
    icon: <FaYoutube className="h-4 w-4" />,
    hoverBg: "hover:bg-[#FF0000]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cwticketingsystem/",
    icon: <FaLinkedinIn className="h-4 w-4" />,
    hoverBg: "hover:bg-[#0A66C2]",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/cwticketing/",
    icon: <FaPinterestP className="h-4 w-4" />,
    hoverBg: "hover:bg-[#E60023]",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────
function Brand() {
  return (
    <div className="gsap-footer-item space-y-5">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/media/logo.png"
          alt="CWTicketing"
          width={373}
          height={70}
          className="h-8 w-auto"
        />
      </Link>

      <p className="max-w-xs text-sm leading-relaxed text-gray-400">
        CWTicketing is a leading ticket booking software Development Company. We
        excel at providing various ticket booking products and services for
        public transport and Event. Our company offers scalable and flexible
        ticket booking services to travel companies all around the world.
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

function SocialIconLink({ label, href, icon, hoverBg }: SocialLink) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label={label}
      title={label}
      className={`group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-transparent hover:text-white active:scale-95 ${hoverBg}`}
    >
      {icon}
    </a>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0b10] text-gray-100">
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
            CWTicketing
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="gsap-footer-bottom flex flex-col items-start gap-5 border-t border-white/10 py-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400">CWTicketing</span>. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-and-condition" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <SocialIconLink key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
