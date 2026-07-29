"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
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
    <div className="gsap-footer-item space-y-3">
      <span className="inline-flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/20">
          <svg
            className="h-3.5 w-3.5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </span>
        <span className="text-lg font-bold tracking-tight text-white">
          CW Ticketing
        </span>
      </span>

      <p className="max-w-xs text-sm leading-relaxed text-gray-400">
        Building scalable ticketing solutions with modern technologies and clean,
        maintainable architecture.
      </p>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Available for projects
      </span>
    </div>
  );
}

function LinkColumn({ section }: { section: FooterSection }) {
  return (
    <div className="gsap-footer-item">
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
        {section.title}
      </h3>
      <ul className="space-y-2.5">
        {section.links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterBox() {
  return (
    <div className="gsap-footer-item rounded-xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
      <p className="mb-1 text-sm font-semibold text-white">Stay in the loop</p>
      <p className="mb-4 text-xs text-gray-500">
        No spam. Useful updates only.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@email.com"
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-gray-600 outline-none ring-0 transition focus:border-white/25 focus:ring-1 focus:ring-white/20"
        />
        <button
          type="button"
          className="shrink-0 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-hover active:scale-95"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

function SocialLink({ label, href }: FooterLink) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 text-[11px] font-medium text-gray-400 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95"
    >
      {label}
    </Link>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Footer items: staggered fade-up ──
      const items = footerRef.current?.querySelectorAll(".gsap-footer-item");
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
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

      // ── Divider line: scaleX animation ──
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

      // ── Bottom bar: fade-up ──
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

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-gray-100">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Brand />
          {FOOTER_LINKS.map((section) => (
            <LinkColumn key={section.title} section={section} />
          ))}
          <NewsletterBox />
        </div>

        {/* ── Divider ── */}
        <div className="gsap-footer-divider my-10 h-px bg-gradient-to-r from-white/15 via-white/8 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="gsap-footer-bottom flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400">CW Ticketing</span>. All rights
            reserved.
          </p>

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
