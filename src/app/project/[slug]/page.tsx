import type { Metadata } from "next";
import {
  PROJECT_DETAILS_DATA,
  ALL_PROJECT_SLUGS,
  ProjectDetail,
} from "@/data/projectDetailsData";
import ProjectDetailView from "@/components/ProjectDetailView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_PROJECT_SLUGS.map((slug) => ({
    slug,
  }));
}

function getProject(rawSlug: string): ProjectDetail {
  const cleanSlug = rawSlug.replace(/\.html\/?$/, "").replace(/\/index$/, "");
  if (PROJECT_DETAILS_DATA[cleanSlug]) {
    return PROJECT_DETAILS_DATA[cleanSlug];
  }

  // Fallback random/placeholder project data so it never throws 404
  const formattedTitle = cleanSlug
    .replace(/^project\//, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    slug: cleanSlug,
    title: `پروژه ${formattedTitle || "نمونه‌کار"}`,
    englishTitle: formattedTitle || "Featured Portfolio Project",
    category: "توسعه نرم‌افزار و وب",
    year: "۲۰۲۲",
    client: "مشتری سازمانی",
    role: "توسعه‌دهنده فرانت‌اند و مهندس نرم‌افزار",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST API", "Responsive UI"],
    summary:
      "طراحی و پیاده‌سازی رابط کاربری مدرن، مقیاس‌پذیر و بسیار روان با تمرکز بر تجربه کاربری، سرعت لود بالا و معماری تمیز.",
    description:
      "این صفحه مربوط به جزئیات این پروژه به صورت موقت با داده‌های اولیه و ساختار استاندارد آماده شده است. تمام اهداف فنی، متادیتا و جزئیات تکمیلی به‌زودی با اطلاعات نهایی پروژه توسط شما تکمیل خواهد شد.",
    highlights: [
      "معماری ماژولار و مبتنی بر کامپوننت‌های بهینه‌سازی شده برای بالاترین سرعت پاسخ‌دهی",
      "طراحی رابط کاربری اختصاصی، تعاملی و کاملاً واکنش‌گرا در موبایل و دسکتاپ",
      "رعایت استانداردهای مدرن سئو، دسترسی‌پذیری و کدهای تمیز و توسعه‌پذیر",
    ],
    liveUrl: `https://${cleanSlug}.dev`,
    heroMockup: "/wp-content/uploads/2021/07/tryotel_ios_mockup-1920x1200.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/10/tryotel-app-full.jpg",
        alt: `پیش‌نمایش کامل و بلند پروژه ${formattedTitle}`,
        isFullTall: true,
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: `${project.title} | تامال سن`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  // Circular navigation for previous and next projects
  const currentIndex = ALL_PROJECT_SLUGS.indexOf(project.slug);
  const validIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevSlug =
    validIndex > 0
      ? ALL_PROJECT_SLUGS[validIndex - 1]
      : ALL_PROJECT_SLUGS[ALL_PROJECT_SLUGS.length - 1];
  const nextSlug =
    validIndex < ALL_PROJECT_SLUGS.length - 1
      ? ALL_PROJECT_SLUGS[validIndex + 1]
      : ALL_PROJECT_SLUGS[0];

  const prevProject = PROJECT_DETAILS_DATA[prevSlug] || getProject(prevSlug);
  const nextProject = PROJECT_DETAILS_DATA[nextSlug] || getProject(nextSlug);

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
