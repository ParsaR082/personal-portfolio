import { redirect } from "next/navigation";

interface CatchAllProps {
  params: Promise<{
    slug: string;
    subpath: string[];
  }>;
}

export default async function CatchAllProjectSubpath({ params }: CatchAllProps) {
  const { slug } = await params;
  redirect(`/project/${slug}`);
}

