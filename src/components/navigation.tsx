'use client';
import { useState } from 'react';
import { copy, type Locale } from '@/content/site';
import { Booking } from './primitives';
const ids=['villa','spaces','gallery','location','stay'];
export function Navigation({locale}:{locale:Locale}){
 const [open,setOpen]=useState(false); const t=copy[locale];
 function languageClick(e:React.MouseEvent<HTMLAnchorElement>){const hash=window.location.hash.slice(1);const section=ids.includes(hash)?hash:ids.filter(id=>{const el=document.getElementById(id);return el&&el.getBoundingClientRect().top<=150}).pop();if(section)e.currentTarget.href=(locale==='en'?'/es':'/')+'#'+section;}
 return <><a className="skip" href="#main">{t.skip}</a><header className="header"><a className="wordmark" href={locale==='en'?'/':'/es'}><span className="brand-symbol" aria-hidden="true">◒</span> Villa Tortuga<span className="brand-place">CULEBRA · PUERTO RICO</span></a><nav className="desktop-nav" aria-label={locale==='en'?'Main navigation':'Navegación principal'}>{ids.map((id,i)=><a key={id} href={'#'+id}>{t.nav[i]}</a>)}</nav><div className="header-actions"><a className="language" href={locale==='en'?'/es':'/'} hrefLang={locale==='en'?'es':'en'} lang={locale==='en'?'es':'en'} onClick={languageClick}>{t.language}</a><div className="header-book"><Booking locale={locale} compact/></div><button className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?t.close:t.menu}<span aria-hidden="true">{open?'−':'+'}</span></button></div>{open&&<nav id="mobile-menu" className="mobile-menu" aria-label={locale==='en'?'Mobile navigation':'Navegación móvil'} onKeyDown={e=>{if(e.key==='Escape')setOpen(false)}}>{ids.map((id,i)=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{t.nav[i]} <span aria-hidden="true">↗</span></a>)}</nav>}</header><div className="mobile-book"><Booking locale={locale}/></div></>;
}
