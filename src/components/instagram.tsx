import { Icon, Photo } from "./primitives";
import { type Locale } from "@/content/site";

const posts = [
  { path: "reel/DPdx-vfjMRN", reel: true },
  { path: "p/DZVD3rjResX", reel: false },
  { path: "p/DUjuCErEbL2", reel: false },
  { path: "p/DSDGBaLES-f", reel: false },
  { path: "p/DRZ3GWJEets", reel: false },
  { path: "p/DQrUv1XkR5b", reel: false },
  { path: "p/DQWsF9pkV32", reel: false },
  { path: "p/DO_JAVDET-r", reel: false },
];

export function Instagram({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section
      className="instagram section"
      id="instagram"
      aria-labelledby="instagram-title"
    >
      <div className="instagram-heading">
        <div>
          <p className="eyebrow">
            {es ? "LA VIDA EN LA ISLA" : "LIFE ON THE ISLAND"}
          </p>
          <h2 id="instagram-title">
            {es ? "Un vistazo a Villa Tortuga." : "A glimpse of Villa Tortuga."}
          </h2>
          <p>
            {es
              ? "Momentos de la villa y de Culebra, compartidos en Instagram."
              : "Moments from the villa and Culebra, shared on Instagram."}
          </p>
        </div>
        <a
          className="instagram-profile"
          href="https://www.instagram.com/villatortuga_culebra/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @villatortuga_culebra <Icon name="instagram" />
          <span className="sr-only">
            {" "}
            {es ? "(abre en otra pestaña)" : "(opens in a new tab)"}
          </span>
        </a>
      </div>
      <div className="instagram-grid">
        {posts.map((post, index) => (
          <a
            className={`instagram-post${post.reel ? " instagram-reel" : ""}${post.path === "p/DO_JAVDET-r" ? " instagram-landscape" : ""}`}
            key={post.path}
            href={`https://www.instagram.com/${post.path}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              es
                ? `${post.reel ? "Ver reel destacado" : `Ver publicación ${index + 1}`} en Instagram (abre en otra pestaña)`
                : `${post.reel ? "Watch featured reel" : `View post ${index + 1}`} on Instagram (opens in a new tab)`
            }
          >
            {post.path === "p/DO_JAVDET-r" ? (
              <Photo id={78} locale={locale} />
            ) : (
              <div className="instagram-frame" aria-hidden="true">
                <iframe
                  src={`https://www.instagram.com/${post.path}/embed/`}
                  title=""
                  tabIndex={-1}
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
