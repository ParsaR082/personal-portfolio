import type { Metadata } from "next";
import HtmlRenderer from "@/components/HtmlRenderer";
import homeData from "@/data/home.json";

export const metadata: Metadata = {
  title: homeData.title,
  description:
    "Tamal Sen is a software engineer, front-end and app developer with a passion for building beautiful, responsive, and user-friendly digital experiences.",
};

export default function HomePage() {
  return (
    <HtmlRenderer
      className={homeData.bodyClass}
      styles={homeData.headStyles}
      html={homeData.bodyContent}
    />
  );
}

