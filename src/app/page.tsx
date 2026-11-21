import type { Metadata } from "next";
import homeData from "@/data/home.json";
import TestimonialGlobeSlot from "@/components/TestimonialGlobeSlot";

export const metadata: Metadata = {
  title: homeData.title,
  description:
    "مهندس نرم‌افزار متعهد به ساخت بهترین تجربه‌های وب و اپلیکیشن با تمرکز بر React، Next.js و Flutter. NeoVoid",
};

export default function HomePage() {
  return (
    <>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: homeData.bodyContent }}
        suppressHydrationWarning
      />
      <TestimonialGlobeSlot />
    </>
  );
}
