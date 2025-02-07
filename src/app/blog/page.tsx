// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Blog from "@/templates/Blog";
import { getPageMetadata, notFoundMetadata } from "@/utils/data";
import { getAllPosts } from "@/utils/post";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getPageMetadata({ type: "Blog" });

  if (metadata == null) {
    return notFoundMetadata;
  }

  return metadata;
}

export default function BlogPage() {
  const pageNumber = 1;
  const { posts, totalPage } = getAllPosts({ page: pageNumber });

  const metadata = getPageMetadata({ type: "Blog" });

  if (posts.length === 0 || metadata == null) {
    notFound();
  }

  const { title, description } = metadata;

  return (
    <Blog
      title={title}
      description={description}
      posts={posts}
      pageNumber={pageNumber}
      totalPage={totalPage}
      paginationPath="/blog/"
    />
  );
}
