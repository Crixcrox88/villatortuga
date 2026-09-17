import { Home } from '@/components/home';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata=createMetadata('en');
export default function Page(){return <Home locale="en"/>}
