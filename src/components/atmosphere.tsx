"use client";

import { useEffect } from "react";

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
  card: [".room", ".amenity-highlights > div", ".review-grid article"],
  media: [
    ".pool-photo",
    ".pool-detail-photo",
    ".kitchen-photo",
    ".location-image",
    ".airbnb-widget-shell",
  ],
} as const;

/** Adds progressive scroll motion without making content depend on JavaScript. */
export function Atmosphere() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const targets = Object.entries(motionGroups).flatMap(([group, selectors]) =>
      Array.from(
        document.querySelectorAll<HTMLElement>(selectors.join(",")),
      ).map((element) => ({ element, className: `motion-${group}` })),
    );

    // Avoid a start-up jump for content already visible after load or a deep link.
    const animatedTargets = targets.filter(({ element }) => {
      const bounds = element.getBoundingClientRect();
      const initiallyVisible = bounds.top < innerHeight * 0.94 && bounds.bottom > 0;
      if (!initiallyVisible) element.classList.add("motion-target");
      return !initiallyVisible;
    });

    animatedTargets.forEach(({ element, className }) =>
      element.classList.add(className),
    );

    if (CSS.supports("animation-timeline: view()")) {
      return () => {
        animatedTargets.forEach(({ element, className }) =>
          element.classList.remove("motion-target", className),
        );
      };
    }

    document.documentElement.classList.add("motion-fallback");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10%" },
    );

    animatedTargets.forEach(({ element }) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-fallback");
      animatedTargets.forEach(({ element, className }) =>
        element.classList.remove(
          "motion-target",
          "motion-visible",
          className,
        ),
      );
    };
  }, []);

  return null;
}
