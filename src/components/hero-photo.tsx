import { getImageProps } from "next/image";
import photos from "@/content/photos.json";
import type { Locale } from "@/content/site";

export function HeroPhoto({ locale }: { locale: Locale }) {
  const photo = photos[77];
  const shared = {
    alt: photo.alt[locale],
    sizes: "100vw",
    loading: "eager" as const,
  };
  const { props: desktop } = getImageProps({
    ...shared,
    src: photo.src,
    width: photo.width,
    height: photo.height,
  });
  const { props: mobile } = getImageProps({
    ...shared,
    src: "/photos/hero-mobile.webp",
    width: 964,
    height: 1706,
  });
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobile.srcSet}
        imageSizes="100vw"
        media="(max-width: 600px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktop.srcSet}
        imageSizes="100vw"
        media="(min-width: 601px)"
        fetchPriority="high"
      />
      <picture className="hero-picture">
        <source
          media="(max-width: 600px)"
          srcSet={mobile.srcSet}
          sizes="100vw"
          width={964}
          height={1706}
        />
        <img {...desktop} className="photo" fetchPriority="high" />
      </picture>
    </>
  );
}
