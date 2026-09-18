"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { copy, property, type Locale } from "@/content/site";
import { Eyebrow } from "./primitives";

const listingUrl = `${property.airbnb}?guests=1&adults=1&s=66&source=embed_widget`;

export function AirbnbEmbed({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const embed = useRef<HTMLDivElement>(null);
  const details =
    locale === "en"
      ? "Home in Culebra · ★5.0 · 4 bedrooms · 5 beds · 4 baths"
      : "Casa en Culebra · ★5.0 · 4 dormitorios · 5 camas · 4 baños";

  useEffect(() => {
    const root = embed.current;
    if (!root) return;
    const frameTitle =
      locale === "en"
        ? "Villa Tortuga listing on Airbnb"
        : "Anuncio de Villa Tortuga en Airbnb";
    const enhanceFrame = () => {
      const frame = root.querySelector("iframe");
      if (!frame) return;
      frame.title = frameTitle;
    };
    enhanceFrame();
    const observer = new MutationObserver(enhanceFrame);
    observer.observe(root, { childList: true });
    return () => observer.disconnect();
  }, [locale]);

  return (
    <div className="airbnb-proof" aria-labelledby="airbnb-proof-title">
      <div className="airbnb-proof-copy">
        <Eyebrow>{t.airbnbEmbedLabel}</Eyebrow>
        <h3 id="airbnb-proof-title">{t.airbnbEmbedTitle}</h3>
        <p>{t.airbnbEmbedText}</p>
      </div>
      <div className="airbnb-widget-shell">
        <div
          ref={embed}
          className="airbnb-embed-frame"
          data-id="1516054436387600999"
          data-view="home"
          data-hide-price="true"
          style={{ width: 450, height: 300, margin: "auto" }}
        >
          <a
            href={listingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.airbnbEmbedAction}
          </a>
          <a
            href={listingUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {details}
          </a>
        </div>
      </div>
      <Script
        id="airbnb-embed-sdk"
        src="https://www.airbnb.com/embeddable/airbnb_jssdk"
        strategy="lazyOnload"
      />
    </div>
  );
}
