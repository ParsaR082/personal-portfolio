import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (projectsData as Record<string, any>)[slug];
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (projectsData as Record<string, any>)[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="/wp-content/cache/autoptimize/css/autoptimize_3533e8abfae64b2e36fbad13be227fb6.css"
      />
      <div
        style={{ display: "contents" }}
        dangerouslySetInnerHTML={{ __html: project.bodyContent }}
        suppressHydrationWarning
      />
    </>
  );
}
