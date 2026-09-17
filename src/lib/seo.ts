import type { Metadata } from 'next';
import { copy, property, type Locale } from '@/content/site';
const configured = process.env.SITE_URL;
export const siteUrl = new URL(configured || 'http://localhost:3000');
export const indexable = process.env.SITE_INDEXABLE === 'true' && siteUrl.protocol === 'https:' && !['localhost','127.0.0.1'].includes(siteUrl.hostname) && process.env.VERCEL_ENV !== 'preview' && !['deploy-preview','branch-deploy'].includes(process.env.CONTEXT || '');
export function metadata(locale: Locale): Metadata {
 const t = copy[locale]; const path=locale==='en'?'/':'/es';
 return {metadataBase:siteUrl,title:t.title,description:t.description,alternates:{canonical:path,languages:{en:'/',es:'/es','x-default':'/'}},robots:{index:indexable,follow:indexable},openGraph:{type:'website',title:t.title,description:t.description,url:path,siteName:property.name,locale:locale==='en'?'en_US':'es_PR',alternateLocale:locale==='en'?'es_PR':'en_US',images:[{url:'/social.jpg',width:1200,height:630,alt:locale==='en'?'Villa Tortuga pool and ocean views':'Piscina de Villa Tortuga y vistas al mar'}]},twitter:{card:'summary_large_image',title:t.title,description:t.description,images:['/social.jpg']},icons:{icon:'/icon.svg'}};
}
export function schema(locale:Locale){return {'@context':'https://schema.org','@type':'LodgingBusiness',name:property.name,url:new URL(locale==='en'?'/':'/es',siteUrl).href,description:copy[locale].description,image:new URL('/social.jpg',siteUrl).href,address:{'@type':'PostalAddress',addressLocality:'Culebra',addressRegion:'Puerto Rico',addressCountry:'US'},sameAs:[property.airbnb],numberOfRooms:property.bedrooms,amenityFeature:[{'@type':'LocationFeatureSpecification',name:'Private heated pool',value:true},{'@type':'LocationFeatureSpecification',name:'Wi-Fi',value:true}]};}
