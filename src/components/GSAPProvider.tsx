"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/lib/gsap";

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
      smooth: 1.5,
      speed: 2,
      effects: true,
      smoothTouch: 0.1,
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ScrollTrigger.refresh();
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );

    lazyImages.forEach((img) => observer.observe(img));

    return () => {
      window.removeEventListener("load", handleLoad);
      observer.disconnect();
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
