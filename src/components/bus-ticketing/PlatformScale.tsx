"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineTicket,
  HiOutlineUserGroup,
  HiOutlineTruck,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import type { IconType } from "react-icons";

interface Stat {
  icon: IconType;
  value: number;
  suffix: string;
  label: string;
  staticValue?: string;
}

const stats: Stat[] = [
  { icon: HiOutlineTicket, value: 150, suffix: "K+", label: "Tickets processed daily" },
  { icon: HiOutlineUserGroup, value: 300, suffix: "K+", label: "Current passengers / users" },
  { icon: HiOutlineTruck, value: 350, suffix: "+", label: "Transport operators" },
  { icon: HiOutlineGlobeAlt, value: 0, suffix: "", label: "International markets", staticValue: "Multi" },
];

function ScaleCounter({
  value,
  suffix,
  staticValue,
}: {
  value: number;
  suffix: string;
  staticValue?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (staticValue) return;
    const el = ref.current;
    if (!el) return;

    const cancel = onSmootherReady(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.v).toLocaleString()}${suffix}`;
        },
      });
    });

    return () => {
      cancel();
      el.textContent = `${value.toLocaleString()}${suffix}`;
    };
  }, [value, suffix, staticValue]);

  return <span ref={ref}>{staticValue ?? `${value.toLocaleString()}${suffix}`}</span>;
}

export default function PlatformScale() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const cancel = onSmootherReady(() => {
      ctx = gsap.context(() => {
        const el = sectionRef.current;
        if (!el) return;
        gsap.fromTo(
          el.querySelectorAll("[data-gsap]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none", once: true },
          }
        );
      }, sectionRef);
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform-at-scale"
      className="relative overflow-hidden bg-[#0b0b10] py-16 text-white lg:py-24"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            Platform at Scale
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-white sm:text-[28px] sm:leading-snug"
          >
            Built for Real Transport Operations
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                data-gsap
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.08] lg:p-8"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/30">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 bg-gradient-to-b from-white to-brand-light bg-clip-text text-[2.6rem] font-black leading-none tracking-tight text-transparent lg:text-[3.4rem]">
                  <ScaleCounter value={s.value} suffix={s.suffix} staticValue={s.staticValue} />
                </p>
                <p className="mt-2 text-[12.5px] font-medium text-white/60">{s.label}</p>
              </div>
            );
          })}
        </div>

        <p data-gsap className="mt-10 text-center text-[11.5px] text-white/40">
          Figures reported by CW Ticketing · last verified internally August 2026
        </p>
      </div>
    </section>
  );
}
