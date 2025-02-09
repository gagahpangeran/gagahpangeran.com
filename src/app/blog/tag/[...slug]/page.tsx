// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Blog from "@/templates/Blog";
import { getPageMetadata, notFoundMetadata } from "@/utils/metadata";
import { getAllPosts } from "@/utils/post";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tagValue = slug[0];

  const metadata = getPageMetadata({
    type: "Tag",
    filterValue: tagValue
  });

  if (metadata == null) {
    return notFoundMetadata;
  }

  return metadata;
}

export default async function BlogTag({ params }: Props) {
  const { slug } = await params;

  if (slug.length > 2) {
    notFound();
  }

  const tagValue = slug[0];
  const page = Number(slug[1] ?? 1);

  if (isNaN(page) || page < 0) {
    notFound();
  }

  const { posts, totalPage } = getAllPosts({
    page,
    type: "tag",
    value: tagValue
  });

  const metadata = getPageMetadata({
    type: "Tag",
    filterValue: tagValue
  });

  if (metadata == null) {
    notFound();
  }

  const { title, description } = metadata;

  return (
    <Blog
      title={title}
      description={description}
      posts={posts}
      pageNumber={page}
      totalPage={totalPage}
      paginationPath={`/blog/tag/${tagValue}/`}
    />
  );
}
