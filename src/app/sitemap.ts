import type { MetadataRoute } from 'next';
import { indexable,siteUrl } from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{return indexable?['/','/es'].map(path=>({url:new URL(path,siteUrl).href,alternates:{languages:{en:new URL('/',siteUrl).href,es:new URL('/es',siteUrl).href}}})):[]}
