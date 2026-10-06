"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { markSmootherReady, resetSmootherReady } from "@/lib/gsap/ready";

interface GSAPProviderProps {
  children: React.ReactNode;
}

/**
 * Show every `[data-gsap]` element immediately, dropping the CSS-driven
 * `opacity: 0` start state.
 */
function revealAll(): void {
  document
    .querySelectorAll<HTMLElement>("[data-gsap]")
    .forEach((el) => gsap.set(el, { clearProps: "opacity,transform" }));
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    if (!wrapper || !content) {
      // Reveals wait on the smoother, so without one nothing would ever
      // animate them in — and `[data-gsap]` ships at `opacity: 0`. Un-hide
      // rather than leave the page blank.
      revealAll();
      return;
    }

    try {
      smootherRef.current = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        speed: 1.05,
        effects: true,
        smoothTouch: 0.9,
      });
    } catch {
      // A failed smoother still leaves queued reveal callbacks waiting on
      // `markSmootherReady`. Flush them and show the content rather than
      // leaving a blank page.
      markSmootherReady();
      revealAll();
      return;
    }

    markSmootherReady();

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    // Images lazy-loading mid-scroll used to call ScrollTrigger.refresh() on
    // every hit, forcing a full re-measure of all triggers while the user was
    // still scrolling (layout thrash → jank). Debounce it.
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const debouncedRefresh = () => {
        if (refreshTimer) clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    debouncedRefresh();
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "100px" }
    );

    lazyImages.forEach((img) => observer.observe(img));

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener("load", handleLoad);
      observer.disconnect();
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      resetSmootherReady();
    };
  }, []);

  // The layout (and this provider) stays mounted across client-side
  // navigation, so ScrollSmoother's cached content height goes stale the
  // moment a new page renders inside #smooth-content — the footer (and any
  // pinned/scrubbed sections) ends up mis-measured until a hard reload.
  // Re-measure whenever the route changes, once the new page has painted.
  useEffect(() => {
    if (!smootherRef.current) return;
    const id = requestAnimationFrame(() => {
      smootherRef.current?.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
