import { FluidObject } from "gatsby-image";
import { PostDetail } from "../../types/generated-types";

export function getPostData(data: PostDetail) {
  const { id, excerpt, html, fields, frontmatter } = data;

  return {
    id,
    title: frontmatter?.title ?? "",
    date: frontmatter?.date ?? "",
    excerpt: frontmatter?.description ?? excerpt ?? "",
    category: frontmatter?.category ?? null,
    tags: frontmatter?.tags ?? [],
    image: frontmatter?.featuredImage?.childImageSharp?.fluid as FluidObject,
    imageUrl: frontmatter?.featuredImage?.publicURL ?? "",
    slug: fields?.slug ?? "",
    html: html ?? ""
  };
}
