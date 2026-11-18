import type { Metadata } from "next";
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(categoriesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = (categoriesData as Record<string, any>)[slug];
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.title,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = (categoriesData as Record<string, any>)[slug];

  if (!category) {
    notFound();
  }

  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: category.bodyContent }}
      suppressHydrationWarning
    />
  );
}
