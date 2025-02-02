// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { getBlogMetaData } from "@/utils/data";
import BlogPost from "@/templates/Post";
import Blog from "../page";
import { getPostBySlug } from "@/utils/post";
import { notFound } from "next/navigation";

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
    const postData = getPostBySlug(slug);

    if (postData == null) {
      notFound();
    }

    return <BlogPost post={postData} />;
  }

  return <Blog page={page} />;
}
