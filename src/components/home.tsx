import { Navigation } from './navigation';
import { Hero, Villa, Rooms, Kitchen, GallerySection, Amenities, Location, Reviews, Stay, Footer } from './sections';
import { type Locale } from '@/content/site';
import { schema } from '@/lib/seo';
export function Home({locale}:{locale:Locale}) {return <><Navigation locale={locale}/><main id="main"><Hero locale={locale}/><Villa locale={locale}/><Rooms locale={locale}/><Kitchen locale={locale}/><GallerySection locale={locale}/><Amenities locale={locale}/><Location locale={locale}/><Reviews locale={locale}/><Stay locale={locale}/><Footer locale={locale}/></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema(locale)).replace(/</g,'\\u003c')}}/></>}
