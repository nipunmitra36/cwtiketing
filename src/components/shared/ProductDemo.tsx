"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, playOnce, prefersReducedMotion } from "@/lib/gsap";
import { onSmootherReady } from "@/lib/gsap/ready";
import {
  HiOutlineCheck,
  HiOutlineZoomIn,
  HiOutlineZoomOut,
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
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function ProductShowcase({ tab }: { tab: ProductDemoTab }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const imgCount = tab.images.length;
  const safeIndex = imgCount > 0 ? imgIndex % imgCount : 0;
  const isPhone = tab.device === "phone";

  // Portrait images (e.g. a phone mockup inside a website tab) look wrong inside
  // the browser chrome, so those slides drop the frame and show the image bare.
  const [portrait, setPortrait] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (isPhone) return;
    let cancelled = false;
    tab.images.forEach((src) => {
      const probe = new Image();
      probe.onload = () => {
        if (!cancelled && probe.naturalHeight > probe.naturalWidth) {
          setPortrait((p) => ({ ...p, [src]: true }));
        }
      };
      probe.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, [tab.images, isPhone]);
  const bare = !isPhone && !!portrait[tab.images[safeIndex]];

  // Auto-slide through this tab's screenshots; pause on hover/lightbox.
  useEffect(() => {
    if (paused || lightboxOpen || imgCount <= 1) return;
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % imgCount);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, lightboxOpen, imgCount]);

  // Changing slide always resets the lightbox zoom.
  const goTo = (i: number) => {
    setZoomed(false);
    setImgIndex(((i % imgCount) + imgCount) % imgCount);
  };
  const openLightbox = () => {
    setZoomed(false);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxOpen(false), 250);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        setZoomed(false);
        setImgIndex((i) => (i + 1) % imgCount);
      }
      if (e.key === "ArrowLeft") {
        setZoomed(false);
        setImgIndex((i) => (i - 1 + imgCount) % imgCount);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Trigger the entrance transition on the next frame.
    const id = requestAnimationFrame(() => setLightboxVisible(true));
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, imgCount]);

  const prev = () => goTo(safeIndex - 1);
  const next = () => goTo(safeIndex + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40 && !zoomed) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const updateOrigin = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  // Every slide sits in the same fixed-ratio box, so all screenshots render at
  // an identical size and cross-fade/slide smoothly instead of remounting.
  const slideStyle = (i: number): React.CSSProperties => {
    const active = i === safeIndex;
    if (isPhone) {
      // Coverflow: active phone centred, neighbours peek in smaller at the sides.
      let d = i - safeIndex;
      if (d > imgCount / 2) d -= imgCount;
      if (d < -imgCount / 2) d += imgCount;
      const near = Math.abs(d) === 1;
      return {
        opacity: active ? 1 : near ? 0.45 : 0,
        zIndex: active ? 3 : near ? 2 : 1,
        transform: `translateX(calc(-50% + ${d * 78}%)) scale(${active ? 1 : near ? 0.8 : 0.6})`,
        transition: `opacity 700ms ${EASE}, transform 900ms ${EASE}`,
      };
    }
    const offset = active ? 0 : i === (safeIndex - 1 + imgCount) % imgCount ? -1 : 1;
    return {
      opacity: active ? 1 : 0,
      transform: `translateX(${offset * 6}%) scale(${active ? 1 : 0.97})`,
      transition: `opacity 700ms ${EASE}, transform 900ms ${EASE}`,
    };
  };

  const slides = tab.images.map((src, i) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={`${tab.title} — screenshot ${i + 1}`}
      aria-hidden={i !== safeIndex}
      draggable={false}
      style={slideStyle(i)}
      className={`absolute object-contain will-change-transform ${
        isPhone
          ? "left-1/2 top-[3%] h-[94%] w-auto max-w-none drop-shadow-xl"
          : portrait[src]
            ? "inset-0 h-full w-full py-1 drop-shadow-xl"
            : "inset-0 h-full w-full bg-white p-2"
      }`}
    />
  ));

  const zoomHint = (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
      <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <HiOutlineZoomIn className="h-6 w-6" />
      </span>
    </span>
  );

  const lightbox = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tab.title}
      className={`fixed inset-0 z-[9999] flex flex-col bg-neutral-950/90 backdrop-blur-xl transition-opacity duration-300 ${
        lightboxVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeLightbox}
    >
      {/* Top bar */}
      <div
        className="relative flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-white">{tab.title}</p>
          <p className="text-[11.5px] text-white/50">
            {imgCount > 1 ? `${safeIndex + 1} of ${imgCount} · ` : ""}
            {zoomed ? "Tap to zoom out" : "Tap image to zoom"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
          >
            {zoomed ? <HiOutlineZoomOut className="h-5 w-5" /> : <HiOutlineZoomIn className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-white/20"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        className={`relative flex min-h-0 flex-1 items-center justify-center px-3 transition-all duration-300 sm:px-20 ${
          lightboxVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {imgCount > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:left-5 sm:h-11 sm:w-11 sm:bg-white/10"
          >
            <HiOutlineChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          className={`relative h-full w-full overflow-hidden ${
            isPhone ? "max-w-[min(100%,calc((100dvh-220px)*0.531))]" : "max-w-6xl"
          } ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={(e) => {
            e.stopPropagation();
            updateOrigin(e);
            setZoomed((z) => !z);
          }}
          onMouseMove={(e) => zoomed && updateOrigin(e)}
        >
          {tab.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${tab.title} — screenshot ${i + 1}`}
              draggable={false}
              style={{
                opacity: i === safeIndex ? 1 : 0,
                transform: `scale(${i === safeIndex && zoomed ? 2.2 : 1})`,
                transformOrigin: origin,
                transition: `opacity 500ms ${EASE}, transform 450ms ${EASE}`,
              }}
              className={`absolute inset-0 h-full w-full select-none object-contain ${
                i === safeIndex ? "" : "pointer-events-none"
              }`}
            />
          ))}
        </div>

        {imgCount > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-white/20 sm:right-5 sm:h-11 sm:w-11 sm:bg-white/10"
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
                onClick={() => goTo(i)}
                aria-label={`Show screenshot ${i + 1}`}
                className={`relative shrink-0 overflow-hidden rounded-xl border-2 bg-white/5 transition-all duration-200 ${
                  isPhone ? "h-16 w-9 sm:h-20 sm:w-11" : "h-12 w-20 sm:h-14 sm:w-24"
                } ${
                  i === safeIndex
                    ? "border-brand opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* glow behind */}
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/15 via-transparent to-brand-light blur-2xl" />

      {/* Every tab keeps the browser frame's footprint so phone and web tabs match
          in size. Phone tabs hide the chrome (screenshots already include the
          device bezel) and let the coverflow fill the whole area. */}
      <div className="relative">
      <div
        className={`relative overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ${
          isPhone || bare
            ? "border-transparent bg-transparent shadow-none"
            : "border-gray-100 bg-white shadow-2xl shadow-gray-900/10"
        }`}
      >
        <div
          aria-hidden={isPhone || bare}
          className={`flex items-center gap-2.5 border-b border-gray-100 bg-gray-50/80 px-3 py-2.5 transition-opacity duration-500 sm:px-4 ${
            isPhone ? "invisible" : bare ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          <span className="ml-1 min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-text-muted ring-1 ring-gray-200 sm:ml-2">
            {tab.label} — {tab.title}
          </span>
        </div>

        <button
          type="button"
          onClick={openLightbox}
          aria-label="View full size"
          className={`group block cursor-zoom-in overflow-hidden ${
            isPhone ? "absolute inset-0 h-full w-full" : "relative aspect-[16/9] w-full"
          }`}
        >
          {slides}
          {zoomHint}
        </button>
        {isPhone && <div aria-hidden className="aspect-[16/9] w-full" />}
      </div>

      {/* Prev / next arrows */}
      {imgCount > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-text-dark shadow-lg shadow-gray-900/10 backdrop-blur transition-all duration-200 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white active:scale-95 sm:-left-5 sm:h-11 sm:w-11"
          >
            <HiOutlineChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-text-dark shadow-lg shadow-gray-900/10 backdrop-blur transition-all duration-200 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white active:scale-95 sm:-right-5 sm:h-11 sm:w-11"
          >
            <HiOutlineChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
      </div>

      {/* dot indicators (auto-advancing) */}
      {imgCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {tab.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={`relative h-1.5 rounded-full transition-all duration-500 before:absolute before:-inset-x-1.5 before:-inset-y-3 before:content-[''] ${
                i === safeIndex ? "w-6 bg-brand" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightbox — portalled to <body> so the smooth-scroll wrapper's
          transform can't break `position: fixed`. */}
      {lightboxOpen && createPortal(lightbox, document.body)}
    </div>
  );
}

export default function ProductDemo({
  tabs,
  eyebrow = "Product Demo",
  heading = (
    <>
      One Platform, <span className="text-gradient-brand">Every Surface</span> Your Business Runs On
    </>
  ),
  description = "From the passenger's phone to the driver's seat to your back office — every surface reads from the same live data.",
}: ProductDemoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let revealed: NodeListOf<HTMLElement> | null = null;
    const cancel = onSmootherReady(() => {
      const el = sectionRef.current;
      if (!el) return;
      revealed = el.querySelectorAll<HTMLElement>("[data-gsap]");
      ctx = gsap.context(() => {
        if (prefersReducedMotion()) {
          gsap.set(revealed, { clearProps: "opacity,transform" });
          return;
        }
        gsap.fromTo(
          revealed,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", ...playOnce },
          }
        );
      }, sectionRef);
    });
    return () => {
      cancel();
      ctx?.revert();
      if (revealed?.length) {
        gsap.set(revealed, { clearProps: "opacity,transform" });
      }
    };
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [active]);

  // Phones: keep the selected tab centred in the horizontally scrolling rail
  useEffect(() => {
    const rail = railRef.current;
    const btn = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !btn || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const tab = tabs[active];

  return (
    <section
      ref={sectionRef}
      id="see-the-platform"
      className="relative overflow-hidden bg-gray-50 py-14 sm:py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-light blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12 lg:mb-16">
          <p data-gsap className="text-[13px] font-semibold uppercase tracking-widest text-brand">
            {eyebrow}
          </p>
          <h2
            data-gsap
            className="mt-3 text-[24px] font-medium leading-snug tracking-tight text-text-dark sm:text-[28px] sm:leading-snug lg:text-[32px]"
          >
            {heading}
          </h2>
          <p data-gsap className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-text-muted sm:text-[15px]">
            {description}
          </p>
        </div>

        {/* Tab rail */}
        <div
          ref={railRef}
          data-gsap
          className="-mx-4 flex scroll-px-4 snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const isActive = i === active;
            return (
              <button
                key={t.num}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-[13px] font-semibold sm:py-2 sm:text-[12.5px] transition-all duration-300 ${
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
        <div ref={panelRef} className="mt-6 grid items-center gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-last min-w-0 lg:order-none">
            <h3 className="text-[20px] font-medium tracking-tight text-text-dark sm:text-[24px]">
              {tab.title}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-text-muted lg:max-w-md">{tab.desc}</p>
            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:mt-6 sm:grid-cols-2 lg:grid-cols-1">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand text-white">
                    <HiOutlineCheck className="h-3 w-3" />
                  </span>
                  <span className="text-[14px] leading-snug text-text-body">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
            <ProductShowcase key={tab.num} tab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}