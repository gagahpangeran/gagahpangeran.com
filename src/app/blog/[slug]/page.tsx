// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/templates/Post";
import Blog from "@/templates/Blog";
import { getPageMetadata, getOtherMetadata } from "@/utils/data";
import { getAllPosts, getPostBySlug } from "@/utils/post";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = Number(slug);

  if (isNaN(page) || page < 0) {
    const postData = getPostBySlug(slug);

    if (postData != null) {
      const { title, description, image } = postData;
      return {
        title,
        description,
        ...getOtherMetadata(title, description, image.src)
      };
    }
  }

  const { title, description } = getPageMetadata({ type: "Blog" });
  return {
    title,
    description,
    ...getOtherMetadata(title, description)
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

  const { posts, totalPage } = getAllPosts({ page });
  const { title, description } = getPageMetadata({
    type: "Blog",
    filterValue: ""
  });

  return (
    <Blog
      title={title}
      description={description}
      posts={posts}
      pageNumber={page}
      totalPage={totalPage}
      paginationPath="/blog/"
    />
  );
}
