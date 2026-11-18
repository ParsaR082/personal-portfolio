import type { Metadata } from "next";
import homeData from "@/data/home.json";

export const metadata: Metadata = {
  title: homeData.title,
  description:
    "Developer devoted to creating great web experiences focused on React, NextJS and Flutter based in Bangladesh, meet Tamal Sen",
};

export default function HomePage() {
  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: homeData.bodyContent }}
      suppressHydrationWarning
    />
  );
}
