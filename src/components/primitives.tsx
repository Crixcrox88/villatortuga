import Image from "next/image";
import { copy, property, type Locale } from "@/content/site";
import photos from "@/content/photos.json";
export function Icon({
  name,
}: {
  name: "external" | "plus" | "down" | "up" | "view";
}) {
  const paths = {
    external: (
      <>
        <path d="M8 16 16 8" />
        <path d="M10 8h6v6" />
        <path d="M14 12v4H4V6h4" />
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
      <Icon name="external" />
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
      <Icon name="external" />
      <span className="sr-only"> ({copy[locale].external})</span>
    </a>
  );
}
