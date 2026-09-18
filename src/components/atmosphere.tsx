"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const motionGroups = {
  copy: [
    ".intro > div",
    ".pool-copy",
    ".section-heading",
    ".kitchen-copy",
    ".location-copy",
    ".extras",
    ".host",
    ".faq",
    ".important",
    ".rating",
    ".reviews-footer",
    ".airbnb-proof-copy",
    ".amenities .eyebrow",
    ".amenities h2",
    ".amenity-details",
    ".final-cta > div:last-child",
  ],
  card: [".room", ".amenity-highlights > div"],
  media: [
    ".pool-photo",
    ".pool-detail-photo",
    ".kitchen-photo",
    ".location-image",
    ".airbnb-listing-card",
  ],
} as const;

/** Adds progressive scroll motion without making content depend on JavaScript. */
export function Atmosphere() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = preference.matches;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -100, duration: 1.05 },
      duration: 1.05,
      smoothWheel: !reducedMotion,
      syncTouch: false,
      wheelMultiplier: 0.88,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    if (reducedMotion) {
      return () => lenis.destroy();
    }

    const targets = Object.entries(motionGroups).flatMap(([group, selectors]) =>
      Array.from(
        document.querySelectorAll<HTMLElement>(selectors.join(",")),
      ).map((element) => ({ element, className: `motion-${group}` })),
    );

    // Avoid a start-up jump for content already visible after load or a deep link.
    const animatedTargets = targets.filter(({ element }) => {
      const bounds = element.getBoundingClientRect();
      const initiallyVisible =
        bounds.top < innerHeight * 0.94 && bounds.bottom > 0;
      if (!initiallyVisible) element.classList.add("motion-target");
      return !initiallyVisible;
    });

    let cardIndex = 0;
    animatedTargets.forEach(({ element, className }) => {
      element.classList.add(className);
      element.style.setProperty(
        "--motion-delay",
        className === "motion-card" ? `${(cardIndex++ % 4) * 70}ms` : "0ms",
      );
    });

    document.documentElement.classList.add("motion-enhanced");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    );

    animatedTargets.forEach(({ element }) => observer.observe(element));

    return () => {
      observer.disconnect();
      lenis.destroy();
      document.documentElement.classList.remove("motion-enhanced");
      animatedTargets.forEach(({ element, className }) =>
        element.classList.remove("motion-target", "motion-visible", className),
      );
      animatedTargets.forEach(({ element }) =>
        element.style.removeProperty("--motion-delay"),
      );
    };
  }, []);

  return null;
}
