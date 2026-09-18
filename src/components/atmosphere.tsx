"use client";

import { useEffect } from "react";

/** Progressive enhancement: content remains visible without JavaScript or motion. */
export function Atmosphere() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const textTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".intro > div, .pool-copy, .section-heading, .kitchen-copy, .location-copy, .extras, .host, .faq, .important, .rating, .reviews-footer, .amenities .eyebrow, .amenities h2, .amenity-details, .final-cta > div:last-child",
      ),
    );
    const staggerTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".room, .amenity-highlights > div, .review-grid article",
      ),
    );
    const imageTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".pool-photo, .pool-detail-photo, .kitchen-photo, .gallery-grid, .location-image",
      ),
    );

    staggerTargets.forEach((element, index) => {
      element.dataset.motionDelay = String((index % 4) * 85);
    });

    const finish = (animation: Animation) => {
      animations.delete(animation);
      animation.cancel();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const target = entry.target as HTMLElement;
          const isImage = imageTargets.includes(target);
          const delay = Number(target.dataset.motionDelay ?? 0);
          const animation = target.animate(
            isImage
              ? [
                  {
                    transform: "translateY(28px) scale(.985)",
                  },
                  {
                    transform: "translateY(0) scale(1)",
                  },
                ]
              : [
                  { transform: "translateY(46px)" },
                  { transform: "translateY(0)" },
                ],
            {
              duration: isImage ? 900 : 820,
              delay,
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "both",
            },
          );
          animations.add(animation);
          animation.onfinish = () => finish(animation);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -2%" },
    );
    [...textTargets, ...staggerTargets, ...imageTargets].forEach((element) =>
      observer.observe(element),
    );
    const cancel = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", cancel);
    };
  }, []);
  return null;
}
