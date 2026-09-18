import Image from "next/image";
import { copy, property, type Locale } from "@/content/site";
import photos from "@/content/photos.json";
export function Icon({
  name,
}: {
  name:
    | "calendar"
    | "plus"
    | "down"
    | "up"
    | "view"
    | "pool"
    | "panorama"
    | "kitchen"
    | "wifi";
}) {
  const paths = {
    calendar: (
      <>
        <rect x="4" y="5" width="12" height="11" rx="1.5" />
        <path d="M7 3v4M13 3v4M4 9h12M7.5 12h1M11.5 12h1" />
      </>
    ),
    plus: (
      <>
        <path d="M10 4v12" />
        <path d="M4 10h12" />
      </>
    ),
    down: (
      <>
        <path d="M10 3v13" />
        <path d="m4 10 6 6 6-6" />
      </>
    ),
    up: (
      <>
        <path d="M10 17V4" />
        <path d="m4 10 6-6 6 6" />
      </>
    ),
    view: (
      <>
        <path d="M8 4H4v4M12 4h4v4M8 16H4v-4M12 16h4v-4" />
      </>
    ),
    pool: (
      <>
        <path d="M3 7.5c1.2 0 1.2-1 2.4-1s1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1" />
        <path d="M3 11.5c1.2 0 1.2-1 2.4-1s1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1" />
        <path d="M3 15.5c1.2 0 1.2-1 2.4-1s1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1 1.2-1 2.4-1 1.2 1 2.4 1" />
      </>
    ),
    panorama: (
      <>
        <circle cx="14.5" cy="5.5" r="1.5" />
        <path d="m3 16 5-6 3 3 2-2 4 5H3Z" />
      </>
    ),
    kitchen: (
      <>
        <path d="M5 3v5M3 3v3a2 2 0 0 0 4 0V3M5 8v9" />
        <path d="M14 3c-1.7 0-3 1.7-3 3.8s1.3 3.7 3 3.7 3-1.6 3-3.7S15.7 3 14 3Zm0 7.5V17" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 7.5a10.4 10.4 0 0 1 14 0" />
        <path d="M5.8 10.5a6.2 6.2 0 0 1 8.4 0" />
        <path d="M8.4 13.3a2.4 2.4 0 0 1 3.2 0" />
        <circle cx="10" cy="16" r=".7" fill="currentColor" stroke="none" />
      </>
    ),
  };
  return (
    <svg
      className={`icon icon-${name}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
export function Photo({
  id,
  locale,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  id: number;
  locale: Locale;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const p = photos[id - 1];
  return (
    <Image
      className={`photo ${className}`}
      src={p.src}
      alt={p.alt[locale]}
      width={p.width}
      height={p.height}
      sizes={sizes}
      preload={priority}
    />
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Booking({
  locale,
  light = false,
  compact = false,
}: {
  locale: Locale;
  light?: boolean;
  compact?: boolean;
}) {
  const t = copy[locale];
  return (
    <a
      className={`button ${light ? "button-light" : ""}`}
      href={property.airbnb}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.book} (${t.external})`}
    >
      <span className="button-label">{compact ? t.shortBook : t.book}</span>
      <Icon name="calendar" />
    </a>
  );
}
export function External({
  locale,
  children,
  href = property.airbnb,
}: {
  locale: Locale;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      className="text-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> ({copy[locale].external})</span>
    </a>
  );
}
