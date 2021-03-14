// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { IGatsbyImageData } from "gatsby-plugin-image";
import { BlogPageContext } from "../templates/Blog";

export const langMap = new Map([
  ["id", "Bahasa Indonesia"],
  ["en", "English"]
]);

const postKeyMap: {
  [key in BlogPageContext["type"]]: keyof GatsbyTypes.BlogTemplateQuery;
} = {
  Index: "posts",
  Category: "categories",
  Tag: "tags",
  Language: "langs"
};

export function getPostData(data: GatsbyTypes.PostDetailFragment) {
  const { id, html, fields, frontmatter } = data;

  return {
    id,
    ...frontmatter,
    slug: fields.slug,
    html: html ?? "",
    image: (frontmatter?.featuredImage?.childImageSharp
      ?.gatsbyImageData as unknown) as IGatsbyImageData,
    imageUrl: frontmatter?.featuredImage?.publicURL ?? ""
  };
}

export function getBlogData(
  pageContext: BlogPageContext,
  blogData: GatsbyTypes.BlogTemplateQuery
) {
  const { type } = pageContext;
  let filterValue = pageContext.filterValue;

  if (type === "Language") {
    filterValue = langMap.get(filterValue) ?? "English";
  }

  switch (type) {
    case "Index":
    default:
      return {
        pageTitle: "GPR's Blog",
        pageDesc: "Part Time Student, Full Time Learner",
        title: "Home",
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
    case "Tag":
      return {
        pageTitle: filterValue,
        pageDesc: `Show All Posts Under Tag "${filterValue}"`,
        title: `Tag "${filterValue}"`,
        desc: `All Posts Under Tag "${filterValue}"`,
        posts: blogData.tags.nodes
      };
    case "Language":
      return {
        pageTitle: filterValue,
        pageDesc: `Show All Posts Under Language "${filterValue}"`,
        title: `Language ${filterValue}`,
        desc: `All Posts Under Language "${filterValue}"`,
        posts: blogData.langs.nodes
      };
  }
}
