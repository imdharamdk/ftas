"use client";

import { useEffect } from "react";

export function MotionDirector() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const sections = gsap.utils.toArray<HTMLElement>("main > section:not(#home), .premium-band");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.88, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax-depth]");
      parallax.forEach((element) => {
        const depth = Number(element.dataset.parallaxDepth ?? 0.08);
        gsap.to(element, {
          yPercent: depth * -100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    setup();

    return () => cleanup?.();
  }, []);

  return null;
}
