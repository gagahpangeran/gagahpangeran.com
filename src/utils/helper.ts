import { FluidObject } from "gatsby-image";
import { BlogTemplate, PostDetail } from "../../types/generated-types";
import { BlogPageContext } from "../templates/Blog";

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

export function getBlogData(
  pageContext: BlogPageContext,
  blogData: BlogTemplate
) {
  const { filterValue, type } = pageContext;

  switch (type) {
    case "Index":
    default:
      return {
        pageTitle: "GPR's Blog",
        pageDesc: "Part Time Student, Full Time Learner",
        title: "Blog",
        desc: "Part Time Student, Full Time Learner",
        posts: blogData.posts.nodes
      };
    case "Category":
      return {
        pageTitle: filterValue,
        pageDesc: `Show All Posts Under Category "${filterValue}"`,
        title: `Category "${filterValue}"`,
        desc: `All Posts Under Category "${filterValue}"`,
        posts: blogData.categories.nodes
      };
    case "Tags":
      return {
        pageTitle: filterValue,
        pageDesc: `Show All Posts Under Tag "${filterValue}"`,
        title: `Tag "${filterValue}"`,
        desc: `All Posts Under Tag "${filterValue}"`,
        posts: blogData.tags.nodes
      };
  }
}
