// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogMetaData } from "@/utils/data";
import Blog from "../page";

export async function generateMetadata(): Promise<Metadata> {
  const { title, desc } = getBlogMetaData({ type: "Blog", filterValue: "" });
  return {
    title,
    description: desc
  };
}

export default async function BlogPagination({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = Number(slug);

  if (isNaN(page) || page < 0) {
    notFound();
  }

  return <Blog page={page} />;
}
