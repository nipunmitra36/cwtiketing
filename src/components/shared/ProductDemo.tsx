"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineCheck,
  HiOutlineZoomIn,
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import type { IconType } from "react-icons";

export interface ProductDemoTab {
  num: string;
  icon: IconType;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  images: string[];
  device?: "browser" | "phone";
}

interface ProductDemoProps {
  tabs: ProductDemoTab[];
  eyebrow?: string;
  heading?: React.ReactNode;
  description?: string;
}

const AUTO_SLIDE_MS = 3500;

function ProductShowcase({ tab }: { tab: ProductDemoTab }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const imgCount = tab.images.length;
  const safeIndex = imgCount > 0 ? imgIndex % imgCount : 0;

  // Auto-slide through this tab's screenshots; pause on hover/lightbox.
  useEffect(() => {
    if (paused || lightboxOpen || imgCount <= 1) return;
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % imgCount);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, lightboxOpen, imgCount]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setImgIndex((i) => (i + 1) % imgCount);
      if (e.key === "ArrowLeft") setImgIndex((i) => (i - 1 + imgCount) % imgCount);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Trigger the entrance transition on the next frame.
    const id = requestAnimationFrame(() => setLightboxVisible(true));
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      setLightboxVisible(false);
    };
  }, [lightboxOpen, imgCount]);

  const prev = () => setImgIndex((i) => (i - 1 + imgCount) % imgCount);
  const next = () => setImgIndex((i) => (i + 1) % imgCount);
  const isPhone = tab.device === "phone";

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* glow behind */}
      <div
        className={`pointer-events-none absolute rounded-[2rem] bg-gradient-to-br from-brand/15 via-transparent to-brand-light blur-2xl ${
          isPhone ? "-inset-4" : "-inset-6"
        }`}
      />

      {isPhone ? (
        // ── Phone frame: screenshots already include the device bezel, so
        // just show them at their natural portrait ratio, no browser chrome. ──
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="View full size"
          className="group relative mx-auto block w-full max-w-[260px]"
        >
          {imgCount > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={safeIndex}
              src={tab.images[safeIndex]}
              alt={tab.title}
              className="mx-auto h-auto w-full object-contain drop-shadow-2xl transition-opacity duration-500"
            />
          )}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[2rem] bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
            <span className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <HiOutlineZoomIn className="h-5 w-5" />
            </span>
          </span>
        </button>
      ) : (
        // ── Browser frame for desktop / web-style surfaces ──
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-900/10">
          <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
            <span className="ml-2 flex flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-text-muted ring-1 ring-gray-200">
              {tab.label} — {tab.title}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View full size"
            className="group relative block w-full overflow-hidden bg-gray-50"
          >
            {imgCount > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={safeIndex}
                src={tab.images[safeIndex]}
                alt={tab.title}
                className="mx-auto aspect-[16/9] h-auto w-full bg-white object-contain px-2 py-2 transition-opacity duration-500"
              />
            )}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <HiOutlineZoomIn className="h-6 w-6" />
              </span>
            </span>
          </button>
        </div>
      )}

      {/* dot indicators (auto-advancing) */}
      {imgCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {tab.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === safeIndex ? "w-6 bg-brand" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tab.title}
          className={`fixed inset-0 z-[999] flex flex-col bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
            lightboxVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top bar */}
          <div
            className="relative flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-white">{tab.title}</p>
              {imgCount > 1 && (
                <p className="text-[11.5px] text-white/50">
                  {safeIndex + 1} of {imgCount}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
          </div>

          {/* Image stage */}
          <div
            className={`relative flex min-h-0 flex-1 items-center justify-center px-2 transition-all duration-300 ${
              lightboxVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {imgCount > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:left-5"
              >
                <HiOutlineChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div className="relative h-full w-full max-w-5xl">
              {tab.images.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={`${tab.title} — screenshot ${i + 1}`}
                  className={`absolute inset-0 m-auto max-h-full w-auto max-w-full object-contain transition-opacity duration-500 ${
                    i === safeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                />
              ))}
            </div>

            {imgCount > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:right-5"
              >
                <HiOutlineChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Thumbnail rail */}
          {imgCount > 1 && (
            <div
              className="shrink-0 overflow-x-auto px-4 pb-5 pt-3 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex w-max gap-2.5">
                {tab.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImgIndex(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 bg-black/40 transition-all duration-200 sm:h-16 sm:w-16 ${
                      i === safeIndex
                        ? "border-brand opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProductDemo({
  tabs,
  eyebrow = "Product Demo",
  heading = "One Platform, Every Surface Your Business Runs On",
  description = "From the passenger's phone to the driver's seat to your back office — every surface reads from the same live data.",
}: ProductDemoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
            stagger: 0.06,
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

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [active]);

  const tab = tabs[active];

  return (
    <section
      ref={sectionRef}
      id="see-the-platform"
      className="relative overflow-hidden bg-gray-50 py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </p>
          <h2
            data-gsap
            className="mt-3 text-[22px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug"
          >
            {heading}
          </h2>
          <p data-gsap className="mx-auto mt-4 text-[13px] leading-relaxed text-text-muted sm:text-[14px]">
            {description}
          </p>
        </div>

        {/* Tab rail */}
        <div data-gsap className="flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === active;
            return (
              <button
                key={t.num}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-brand bg-brand text-white shadow-md shadow-brand/30"
                    : "border-gray-200 bg-white text-text-muted hover:border-brand/30 hover:text-brand"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel — two-column: content left, auto-sliding showcase right */}
        <div ref={panelRef} className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-[20px] font-medium tracking-tight text-text-dark sm:text-[24px]">
              {tab.title}
            </h3>
            <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-text-muted">{tab.desc}</p>
            <ul className="mt-6 space-y-2.5">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[13.5px] leading-snug text-text-body">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <ProductShowcase key={tab.num} tab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}