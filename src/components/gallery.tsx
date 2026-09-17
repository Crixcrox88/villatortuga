'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import photos from '@/content/photos.json';
import { categories, copy, type Locale } from '@/content/site';

const curated = [78, 63, 1, 24, 9, 74, 42, 77, 31, 36, 52, 57, 68, 92, 80];
const ordered = [
  ...curated.map((id) => photos[id - 1]),
  ...photos.filter((photo) => !curated.includes(photo.id)),
];

export function Gallery({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [category, setCategory] = useState(-1);
  const [limit, setLimit] = useState(6);
  const [active, setActive] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const touch = useRef<number | null>(null);
  const filtered = category < 0 ? ordered : ordered.filter((photo) => photo.category === category);
  const selected = active === null ? null : filtered[active];

  function close() {
    dialog.current?.close();
    setActive(null);
    trigger.current?.focus();
  }

  function move(step: number) {
    setFailed(false);
    setActive((current) => current === null ? null : (current + step + filtered.length) % filtered.length);
  }

  useEffect(() => {
    if (active === null || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  return <>
    <div className="gallery-toolbar">
      <label htmlFor="gallery-category" className="gallery-label">{t.all}</label>
      <select id="gallery-category" aria-label={t.all} value={category} onChange={(event) => { setCategory(Number(event.target.value)); setLimit(6); }}>
        <option value={-1}>{t.all} · 92</option>
        {categories.map((names, index) => <option key={index} value={index}>{names[locale === 'en' ? 0 : 1]} · {photos.filter((photo) => photo.category === index).length}</option>)}
      </select>
      <span className="gallery-count">{filtered.length} {locale === 'en' ? 'photographs' : 'fotografías'}</span>
    </div>
    <div className="gallery-grid">
      {filtered.slice(0, limit).map((photo, index) => {
        const categoryName = categories[photo.category][locale === 'en' ? 0 : 1];
        return <button className="gallery-tile" key={photo.id} aria-label={`${categoryName}: ${photo.alt[locale]}. ${t.view}`} onClick={(event) => { trigger.current = event.currentTarget; setFailed(false); setActive(index); }}>
          <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt[locale]} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
          <span className="tile-caption">{categoryName}<span aria-hidden="true">↗</span></span>
        </button>;
      })}
    </div>
    {limit < filtered.length && <button className="button gallery-more" onClick={() => setLimit(limit + 12)}>{t.more}<span aria-hidden="true">+</span></button>}
    <dialog className="lightbox" ref={dialog} aria-label={t.galleryTitle} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); } }}>
      {selected && <>
        <div className="lightbox-top"><span>{categories[selected.category][locale === 'en' ? 0 : 1]}</span><button onClick={close} aria-label={t.galleryClose}>{t.close} ×</button></div>
        <div className="lightbox-image" onTouchStart={(event) => { touch.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touch.current !== null) { const delta = touch.current - event.changedTouches[0].clientX; if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1); touch.current = null; } }}>
          {failed ? <p role="status">{t.imageError}</p> : <Image key={selected.id} src={selected.src} alt={selected.alt[locale]} fill sizes="95vw" onError={() => setFailed(true)} />}
        </div>
        <div className="lightbox-bottom"><button onClick={() => move(-1)} aria-label={t.previous}>←</button><p aria-live="polite">{t.photo} {(active ?? 0) + 1} {t.of} {filtered.length}<span>{selected.alt[locale]}</span></p><button onClick={() => move(1)} aria-label={t.next}>→</button></div>
      </>}
    </dialog>
  </>;
}
