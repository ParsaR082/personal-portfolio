import type { Metadata } from "next";
import homeData from "@/data/home.json";
import TestimonialGlobe from "@/components/TestimonialGlobe";

export const metadata: Metadata = {
  title: homeData.title,
  description:
    "مهندس نرم‌افزار متعهد به ساخت بهترین تجربه‌های وب و اپلیکیشن با تمرکز بر React، Next.js و Flutter. تامال سن",
};

function getSplitContent(html: string) {
  const contactIdx = html.indexOf('id="contact"');
  if (contactIdx === -1) return { before: html, after: "" };
  const sectionOpen = html.lastIndexOf("<section", contactIdx);

  let depth = 0;
  let pos = sectionOpen;
  let sectionEnd = -1;
  while (pos < html.length) {
    const nextOpen = html.indexOf("<section", pos);
    const nextClose = html.indexOf("</section>", pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 8;
    } else {
      depth--;
      pos = nextClose + 10;
      if (depth === 0) {
        sectionEnd = pos;
        break;
      }
    }
  }

  if (sectionEnd === -1) return { before: html, after: "" };
  return {
    before: html.substring(0, sectionOpen),
    after: html.substring(sectionEnd),
  };
}

export default function HomePage() {
  const { before, after } = getSplitContent(homeData.bodyContent);

  return (
    <>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: before }}
        suppressHydrationWarning
      />
      <section
        id="contact"
        className="elementor-section elementor-top-section elementor-section-full_width"
        style={{
          position: "relative",
          zIndex: 5,
          width: "100%",
          padding: "80px 0 40px 0",
          backgroundColor: "transparent",
        }}
      >
        <TestimonialGlobe />
      </section>
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: after }}
        suppressHydrationWarning
      />
    </>
  );
}
