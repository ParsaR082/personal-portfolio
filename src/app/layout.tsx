import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parsa Rahmani — Full-stack Developer",
  description: "Portfolio of Parsa Rahmani: full-stack development, web design and SEO.",
  metadataBase: new URL("https://urumsima.ir"),
  openGraph: { title: "Parsa Rahmani — Full-stack Developer", description: "Thoughtful digital experiences, designed and built end to end.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}