import { notFound } from "next/navigation";
import {
  data,
  getProjectBySlug,
  getProjectSlug,
} from "@/data-project/data-project";
import ProjectDetailPage from "@/components/pages/project-detail-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return data.map((p) => ({ slug: getProjectSlug(p.title) }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetailPage slug={slug} />;
}
