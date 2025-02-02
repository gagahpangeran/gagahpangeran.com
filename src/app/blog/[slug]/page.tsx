// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/templates/Post";
import { getBlogMetaData } from "@/utils/data";
import { getPostBySlug } from "@/utils/post";
import Blog from "../page";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = Number(slug);

  if (isNaN(page) || page < 0) {
    const postData = getPostBySlug(slug);

    if (postData != null) {
      const { title, description } = postData;
      return {
        title,
        description
      };
    }
  }

  const { title, desc } = getBlogMetaData({ type: "Blog", filterValue: "" });
  return {
    title,
    description: desc
  };
}

export default async function BlogPagination({ params }: Props) {
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
