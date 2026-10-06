import { gsap, playOnce, prefersReducedMotion } from "./index";
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
 * Non-reverse reveals use `playOnce` so each trigger is discarded after its
 * first play — no per-frame scroll processing for finished sections.
 *
 * The hidden start state comes from CSS (`[data-gsap] { opacity: 0 }`), so the
 * server-rendered HTML already matches what the client paints first. Without
 * it the section would be visible in the SSR HTML, then snap invisible here.
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
  let els: NodeListOf<HTMLElement> | null = null;

  const cancel = onSmootherReady(() => {
    els = section.querySelectorAll<HTMLElement>("[data-gsap]");
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { clearProps: "opacity,transform" });
      return;
    }

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
            ...(reverse ? { toggleActions: "play none none reverse" } : playOnce),
          },
        }
      );
    });
  });

  return () => {
    cancel();
    ctx?.revert();
    // revert() strips GSAP's inline styles, which drops the element back to the
    // stylesheet — i.e. `[data-gsap] { opacity: 0 }`. This cleanup also runs on
    // every route change, so clear the attribute-driven hiding explicitly and
    // let the revealed state stand.
    if (els?.length) gsap.set(els, { clearProps: "opacity,transform" });
  };
}
