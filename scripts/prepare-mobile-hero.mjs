import sharp from "sharp";

// A real crop of photo 78: preserve the pool/horizon framing without downloading
// the entire landscape image on a narrow screen.
await sharp("assets/property/14-pool/78-01-d2fcb2dd-e459-4df6-b5c0-9afe20ea4ab3.jpeg")
  .extract({ left: 926, top: 0, width: 964, height: 1706 })
  .webp({ quality: 85, effort: 6 })
  .toFile("public/photos/hero-mobile.webp");
