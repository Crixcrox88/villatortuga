import { copy, property, type Locale } from "@/content/site";
import { Eyebrow, Icon, Photo } from "./primitives";

const listingUrl = `${property.airbnb}?guests=1&adults=1&s=66&source=embed_widget`;

export function AirbnbEmbed({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const details =
    locale === "en"
      ? "4 bedrooms · 5 beds · 4 baths"
      : "4 dormitorios · 5 camas · 4 baños";
  const label = locale === "en" ? "Home in Culebra" : "Casa en Culebra";

  return (
    <div
      id="airbnb-preview"
      className="airbnb-proof"
      aria-labelledby="airbnb-proof-title"
    >
      <div className="airbnb-proof-copy">
        <Eyebrow>{t.airbnbEmbedLabel}</Eyebrow>
        <h3 id="airbnb-proof-title">{t.airbnbEmbedTitle}</h3>
        <p>{t.airbnbEmbedText}</p>
      </div>
      <a
        className="airbnb-listing-card"
        href={listingUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label={`${t.airbnbEmbedAction} (${t.external})`}
      >
        <span className="airbnb-listing-image" aria-hidden="true">
          <Photo id={78} locale={locale} sizes="(max-width: 900px) 100vw, 450px" />
          <span className="airbnb-listing-badge">Airbnb</span>
        </span>
        <span className="airbnb-listing-body">
          <span className="airbnb-listing-label">{label}</span>
          <strong>Villa Tortuga</strong>
          <span className="airbnb-listing-details">
            ★ {property.rating} · {details}
          </span>
          <span className="airbnb-listing-action">
            {t.airbnbEmbedAction}
            <Icon name="calendar" />
          </span>
        </span>
      </a>
    </div>
  );
}
