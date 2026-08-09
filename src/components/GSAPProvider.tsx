"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";
import { markSmootherReady, resetSmootherReady } from "@/lib/gsap/ready";

interface GSAPProviderProps {
  children: React.ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");
    if (!wrapper || !content) return;

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      speed: 1.05,
      effects: true,
      smoothTouch: 0.9,
    });

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

  return <>{children}</>;
}
