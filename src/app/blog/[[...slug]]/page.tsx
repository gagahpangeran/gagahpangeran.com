// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Blog from "@/templates/Blog";
import Post from "@/templates/Post";
import {
  getOtherMetadata,
  getPageMetadata,
  notFoundMetadata
} from "@/utils/metadata";
import { getAllBlogPageRoutes, getBlogPageDataBySlug } from "@/utils/page";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const allRoutes = getAllBlogPageRoutes();
  const allSlugs = allRoutes.map(route => {
    const [_, ...slug] = route.split("/").filter(Boolean);
    return { slug };
  });
  return allSlugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getBlogPageDataBySlug(slug);

  if (data == null) {
    return notFoundMetadata;
  }

  if (data.kind === "post") {
    const { title, description, image } = data.post;
    return {
      title,
      description,
      ...getOtherMetadata(title, description, image)
    };
  }

  const { type, filterValue } = data;
  const metadata = getPageMetadata({ type, filterValue });

  if (metadata == null) {
    return notFoundMetadata;
  }

  return metadata;
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const data = getBlogPageDataBySlug(slug);

  if (data == null) {
    notFound();
  }

  if (data.kind === "post") {
    return <Post post={data.post} />;
  }

  const { posts, totalPage, pageNumber, paginationPath, type, filterValue } =
    data;

  const metadata = getPageMetadata({ type, filterValue });
  if (metadata == null) {
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
      paginationPath={paginationPath}
    />
  );
}
