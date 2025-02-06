// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Blog from "@/templates/Blog";
import { getPageMetadata, getOtherMetadata } from "@/utils/data";
import { getAllPosts } from "@/utils/post";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const value = slug[0];

  const { title, desc } = getPageMetadata({
    type: "Tag",
    filterValue: value
  });

  return {
    title,
    description: desc,
    ...getOtherMetadata(title, desc)
  };
}

export default async function BlogTag({ params }: Props) {
  const { slug } = await params;

  if (slug.length > 2) {
    notFound();
  }

  const value = slug[0];
  const page = Number(slug[1] ?? 1);

  if (isNaN(page) || page < 0) {
    notFound();
  }

  const { posts, totalPage } = getAllPosts({
    page,
    type: "tag",
    value
  });

  const { pageTitle, pageDesc } = getPageMetadata({
    type: "Tag",
    filterValue: value
  });

  return (
    <Blog
      title={pageTitle}
      description={pageDesc}
      posts={posts}
      pageNumber={page}
      totalPage={totalPage}
      paginationPath={`/blog/tag/${slug[0]}/`}
    />
  );
}
