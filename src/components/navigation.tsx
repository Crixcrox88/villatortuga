"use client";
import { useEffect, useRef, useState } from "react";
import { copy, type Locale } from "@/content/site";
import { Booking, Icon } from "./primitives";
const ids = ["villa", "spaces", "gallery", "location", "stay"];
export function Navigation({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const t = copy[locale];
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 32);
      const current = ids
        .filter((id) => {
          const element = document.getElementById(id);
          return element && element.getBoundingClientRect().top <= 180;
        })
        .pop();
      setActive(current || "");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  function languageClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const hash = window.location.hash.slice(1);
    const section = ids.includes(hash)
      ? hash
      : ids
          .filter((id) => {
            const el = document.getElementById(id);
            return el && el.getBoundingClientRect().top <= 150;
          })
          .pop();
    if (section)
      e.currentTarget.href = (locale === "en" ? "/es" : "/") + "#" + section;
  }
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="header" data-scrolled={scrolled}>
        <a className="wordmark" href={locale === "en" ? "/" : "/es"}>
          <span className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M10 21a10 10 0 0 1 20 0M5 26c5-5 10 5 15 0s10 5 15 0M5 32c5-5 10 5 15 0s10 5 15 0"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M20 3v4M7 9l3 3M33 9l-3 3"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>{" "}
          Villa Tortuga
          <span className="brand-place">CULEBRA · PUERTO RICO</span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={
            locale === "en" ? "Main navigation" : "Navegación principal"
          }
        >
          {ids.map((id, i) => (
            <a
              key={id}
              href={"#" + id}
              aria-current={active === id ? "location" : undefined}
            >
              {t.nav[i]}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language"
            href={locale === "en" ? "/es" : "/"}
            hrefLang={locale === "en" ? "es" : "en"}
            lang={locale === "en" ? "es" : "en"}
            onClick={languageClick}
          >
            {t.language}
          </a>
          <div className="header-book">
            <Booking locale={locale} compact />
          </div>
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? t.close : t.menu}
            <Icon name="plus" />
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label={
              locale === "en" ? "Mobile navigation" : "Navegación móvil"
            }
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            {ids.map((id, i) => (
              <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
                {t.nav[i]} <Icon name="down" />
              </a>
            ))}
          </nav>
        )}
      </header>
      <div className="mobile-book">
        <Booking locale={locale} />
      </div>
    </>
  );
}
