import { gsap } from "./index";
import { onSmootherReady } from "./ready";

export interface SectionRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  reverse?: boolean;
}

/**
 * Scroll-reveal for every `[data-gsap]` element inside `section`.
 *
 * The trigger is only created AFTER the ScrollSmoother is live. ScrollTrigger
 * positions are measured against the smoothed scroller, so creating triggers
 * before the smoother exists makes them fire at the wrong visual position
 * (early, late, or not at all) which reads as janky/laggy scrolling.
 *
 * Non-reverse reveals use `once: true` so each trigger kills itself after its
 * first play — no per-frame scroll processing for finished sections.
 *
 * Returns a cleanup function (safe to return from a `useEffect`).
 */
export function createSectionReveal(
  section: HTMLElement,
  opts: SectionRevealOptions = {}
): () => void {
  const {
    y = 30,
    duration = 0.8,
    stagger = 0.1,
    start = "top 80%",
    reverse = false,
  } = opts;
  let ctx: gsap.Context | null = null;

  const cancel = onSmootherReady(() => {
    const els = section.querySelectorAll("[data-gsap]");
    if (!els.length) return;
    ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start,
            toggleActions: reverse ? "play none none reverse" : "play none none none",
            ...(reverse ? {} : { once: true }),
          },
        }
      );
    });
  });

  return () => {
    cancel();
    ctx?.revert();
  };
}
