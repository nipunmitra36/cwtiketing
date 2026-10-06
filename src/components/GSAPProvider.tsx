"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { markSmootherReady, resetSmootherReady } from "@/lib/gsap/ready";

interface GSAPProviderProps {
  children: React.ReactNode;
}

/**
 * Show every `[data-gsap]` element immediately, dropping any leftover
 * opacity/transform a reveal left behind.
 */
function revealAll(): void {
  document
    .querySelectorAll<HTMLElement>("[data-gsap]")
    .forEach((el) => gsap.set(el, { clearProps: "opacity,transform" }));
}

/**
 * Scroll-in fades made content appear late while scrolling ("lazy" feel) and
 * cost frames on mid-range phones. Jump every plain reveal straight to its end
 * state and drop its trigger.
 *
 * Kept: pinned and scrubbed triggers (they ARE the feature — journeys, feature
 * stage, blog TOC), callback-only triggers (no animation), and repeating
 * decorative loops, which would freeze if forced to their end.
 */
function finishScrollReveals(): void {
  ScrollTrigger.getAll().forEach((t) => {
    const anim = t.animation;
    if (!anim || t.vars.pin || t.vars.scrub) return;
    if (anim.repeat() !== 0) return;
    anim.progress(1);
    t.kill(false);
  });
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Native scrolling. ScrollSmoother used to transform the whole page on
    // every frame (and on touch via `smoothTouch`), which was the main source
    // of scroll lag. Components still wait on `onSmootherReady` before
    // creating triggers, so release them straight away.
    markSmootherReady();
    revealAll();

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    // Lazy images change the page height as they load, which shifts pinned
    // trigger positions. Debounced so a burst of images costs one refresh.
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

    document
      .querySelectorAll("img[loading='lazy']")
      .forEach((img) => observer.observe(img));

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener("load", handleLoad);
      observer.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      resetSmootherReady();
    };
  }, []);

  // Runs after every page's own effects (child effects fire first), so the
  // page's triggers exist by now — on first load and on client navigation.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      finishScrollReveals();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
