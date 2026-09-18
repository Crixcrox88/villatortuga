import Image from "next/image";
import { copy, property, type Locale } from "@/content/site";
import { Booking, External, Eyebrow, Icon, Photo } from "./primitives";
import { Gallery } from "./gallery";
import { HeroPhoto } from "./hero-photo";
import { AirbnbEmbed } from "./airbnb-embed";
export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <HeroPhoto locale={locale} />
        <div className="hero-shade" />
        <div className="hero-content">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 id="hero-title">
            <span className="sr-only">Villa Tortuga — </span>
            {t.hero.split("\n")[0]}
            <br />
            <em>{t.hero.split("\n")[1]}</em>
          </h1>
          <p>{t.heroText}</p>
          <Booking locale={locale} light />
        </div>
        <a className="hero-explore" href="#villa">
          {t.explore}
          <Icon name="down" />
        </a>
        <span className="hero-number" aria-hidden="true">
          01 / CULEBRA
        </span>
      </section>
      <div className="facts">
        {[
          property.guests,
          property.bedrooms,
          property.beds,
          property.bathrooms,
        ].map((n, i) => (
          <div key={i}>
            <strong>{n.toString().padStart(2, "0")}</strong>
            <span>{t.facts[i]}</span>
          </div>
        ))}
        <p>
          {locale === "en"
            ? "The whole villa. Just your people."
            : "Toda la villa. Solo para ustedes."}
        </p>
      </div>
    </>
  );
}
export function Villa({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section id="villa" className="section intro">
        <div>
          <Eyebrow>{t.introLabel}</Eyebrow>
          <h2>{t.introTitle}</h2>
        </div>
        <div className="intro-copy">
          <p className="lead">{t.intro}</p>
          <p>{t.introSmall}</p>
        </div>
      </section>
      <section className="pool-feature">
        <div className="pool-photo">
          <Photo
            id={63}
            locale={locale}
            sizes="(max-width: 700px) 100vw, 62vw"
          />
          <span className="image-note">VILLA TORTUGA / CULEBRA</span>
        </div>
        <div className="pool-copy">
          <Eyebrow>{t.poolLabel}</Eyebrow>
          <h2>{t.poolTitle}</h2>
          <p>{t.poolText}</p>
          <p className="fine-detail">{t.poolDetail}</p>
          <div className="pool-detail-photo">
            <Photo
              id={83}
              locale={locale}
              sizes="(max-width: 700px) 70vw, 24vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export function Rooms({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="spaces" className="section rooms">
      <div className="section-heading">
        <div>
          <Eyebrow>{t.roomLabel}</Eyebrow>
          <h2>{t.roomTitle}</h2>
        </div>
        <p>{t.roomIntro}</p>
      </div>
      <div className="room-grid">
        {t.rooms.map(([name, detail, text], i) => (
          <article key={name} className="room">
            <div className="room-photo">
              <Photo id={[24, 31, 36, 42][i]} locale={locale} />
              <span className="room-index">0{i + 1}</span>
            </div>
            <Eyebrow>{detail}</Eyebrow>
            <h3>{name}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Kitchen({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section kitchen">
      <div className="kitchen-copy">
        <Eyebrow>{t.kitchenLabel}</Eyebrow>
        <h2>{t.kitchenTitle}</h2>
        <p>{t.kitchenText}</p>
      </div>
      <div className="kitchen-photo">
        <Photo id={9} locale={locale} />
      </div>
    </section>
  );
}
export function GallerySection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="gallery" className="section gallery">
      <div className="section-heading">
        <div>
          <Eyebrow>{t.galleryLabel}</Eyebrow>
          <h2>{t.galleryTitle}</h2>
        </div>
        <p>{t.galleryText}</p>
      </div>
      <Gallery locale={locale} />
    </section>
  );
}
export function Amenities({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="amenities">
      <div className="section">
        <Eyebrow>{t.amenitiesLabel}</Eyebrow>
        <h2>{t.amenitiesTitle}</h2>
        <div className="amenity-highlights">
          {(locale === "en"
            ? [
                "Private heated pool",
                "Panoramic ocean views",
                "Full kitchen",
                "Wi-Fi & air conditioning",
              ]
            : [
                "Piscina privada climatizada",
                "Vistas panorámicas al mar",
                "Cocina completa",
                "Wi-Fi y aire acondicionado",
              ]
          ).map((item, i) => (
            <div key={item}>
              <span className="amenity-number" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
        <details className="amenity-details">
          <summary>
            {t.amenitiesMore}
            <Icon name="plus" />
          </summary>
          <div className="amenity-groups">
            {t.amenityGroups.map(([title, ...items]) => (
              <div key={title}>
                <h3>{title}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
export function Location({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="location" className="section location">
      <div className="location-image">
        <Photo id={73} locale={locale} />
        <span className="location-stamp">
          Culebra<span>PUERTO RICO</span>
        </span>
      </div>
      <div className="location-copy">
        <Eyebrow>{t.locationLabel}</Eyebrow>
        <h2>{t.locationTitle}</h2>
        <p>{t.locationText}</p>
        <dl className="distances">
          <div>
            <dt>{t.zoni}</dt>
            <dd>{t.zoniTime}</dd>
          </div>
          <div>
            <dt>{t.town}</dt>
            <dd>{t.townTime}</dd>
          </div>
        </dl>
        <p className="small">{t.locationNote}</p>
      </div>
      <div className="extras">
        <h3>{t.extrasTitle}</h3>
        <p>{t.extrasText}</p>
      </div>
    </section>
  );
}
export function Reviews({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const reviewLoop = [...t.reviews, ...t.reviews];
  return (
    <section className="reviews">
      <div className="section">
        <div className="section-heading">
          <div>
            <Eyebrow>{t.reviewsLabel}</Eyebrow>
            <h2>{t.reviewsTitle}</h2>
          </div>
          <div className="rating">
            <strong>
              {property.rating}
              <span>/ 5</span>
            </strong>
            <p>
              {property.reviewCount} {t.reviewCount}
            </p>
            <p className="small">{t.reviewSource}</p>
          </div>
        </div>
        <div
          className="review-marquee"
          role="region"
          aria-label={t.reviewsRegion}
          tabIndex={0}
        >
          <div className="review-track">
            {reviewLoop.map(([name, context, text], index) => (
              <article
                key={`${name}-${index}`}
                aria-hidden={index >= t.reviews.length || undefined}
              >
                <span className="review-mark" aria-hidden="true">
                  —
                </span>
                <p>{text}</p>
                <div className="review-author">
                  <span className="initial" aria-hidden="true">
                    {name[0]}
                  </span>
                  <div>
                    <strong>{name}</strong>
                    <span>{context}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="reviews-footer">
          <span className="sr-only">{t.reviewSummary}</span>
          <External locale={locale} href={property.reviews}>
            {t.readReviews}
          </External>
        </div>
        <AirbnbEmbed locale={locale} />
      </div>
    </section>
  );
}
export function Stay({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section id="stay" className="section stay">
      <div className="host">
        <Eyebrow>{t.hostLabel}</Eyebrow>
        <h2>{t.hostTitle}</h2>
        <div className="host-profile">
          <Image
            src={property.host.photo}
            alt={
              locale === "en"
                ? "Roxana, host of Villa Tortuga"
                : "Roxana, anfitriona de Villa Tortuga"
            }
            width={320}
            height={320}
            sizes="112px"
          />
          <div className="host-identity">
            <strong>{property.host.name}</strong>
            <span className="host-badge">
              <span aria-hidden="true">✓</span>
              {t.hostSuperhost}
            </span>
          </div>
        </div>
        <dl className="host-stats">
          {[
            property.host.reviewCount,
            property.host.rating,
            property.host.yearsHosting,
          ].map((value, index) => (
            <div key={t.hostStats[index]}>
              <dt>{t.hostStats[index]}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="host-source">{t.hostSource}</p>
        <p>{t.hostText}</p>
        <External locale={locale}>{t.hostAction}</External>
      </div>
      <div className="faq">
        <h2>{t.faqTitle}</h2>
        {t.faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Icon name="plus" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <aside className="important">
        <div>
          <Eyebrow>{t.importantLabel}</Eyebrow>
          <h3>{t.importantTitle}</h3>
        </div>
        <ul>
          {t.important.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section className="final-cta">
        <Photo id={77} locale={locale} sizes="100vw" />
        <div className="final-shade" />
        <div>
          <Eyebrow>{t.finalLabel}</Eyebrow>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalText}</p>
          <Booking locale={locale} light />
        </div>
      </section>
      <footer className="section footer">
        <div>
          <a className="wordmark" href="#top">
            Villa Tortuga
          </a>
          <p>{t.footer}</p>
        </div>
        <div className="footer-links">
          <a href="#gallery">{t.nav[2]}</a>
          <a href="#stay">{t.nav[4]}</a>
          <External locale={locale}>Airbnb</External>
          <a
            href={locale === "en" ? "/es" : "/"}
            lang={locale === "en" ? "es" : "en"}
          >
            {t.language}
          </a>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} Villa Tortuga</span>
          <a href="#top">
            {t.top} <Icon name="up" />
          </a>
        </div>
      </footer>
    </>
  );
}
