import "../globals.css";
import { editorial, interfaceFont } from "@/lib/fonts";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${editorial.variable} ${interfaceFont.variable}`}
    >
      <body id="top">{children}</body>
    </html>
  );
}
