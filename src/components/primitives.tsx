import Image from 'next/image';
import { copy, property, type Locale } from '@/content/site';
import photos from '@/content/photos.json';
export function Photo({ id, locale, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { id: number; locale: Locale; className?: string; priority?: boolean; sizes?: string }) {
 const p = photos[id - 1];
 return <Image className={`photo ${className}`} src={p.src} alt={p.alt[locale]} width={p.width} height={p.height} sizes={sizes} preload={priority} />;
}
export function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow">{children}</p>; }
export function Booking({locale, light=false, compact=false}:{locale:Locale; light?:boolean; compact?:boolean}) {
 const t=copy[locale];
 return <a className={`button ${light?'button-light':''}`} href={property.airbnb} target="_blank" rel="noopener noreferrer" aria-label={`${t.book} (${t.external})`}>{compact?t.shortBook:t.book}<span aria-hidden="true">↗</span></a>;
}
export function External({locale,children,href=property.airbnb}:{locale:Locale;children:React.ReactNode;href?:string}){return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children} <span aria-hidden="true">↗</span><span className="sr-only"> ({copy[locale].external})</span></a>}
