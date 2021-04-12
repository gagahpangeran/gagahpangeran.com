// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { IGatsbyImageData } from "gatsby-plugin-image";

export const langMap = new Map([
  ["id", "Bahasa Indonesia"],
  ["en", "English"]
]);

export type BlogPageContextType = "Index" | "Category" | "Tag" | "Language";

export interface BlogPageContext {
  type: BlogPageContextType;
  filterValue: string;
  basePath: string;
  page: number;
  numPages: number;
}

export const postKeyMap: {
  [key in BlogPageContextType]: keyof GatsbyTypes.BlogTemplateQuery;
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

export function getBlogMetaData({
  type,
  filterValue
}: Omit<BlogPageContext, "basePath" | "page" | "numPages">) {
  if (type === "Language") {
    filterValue = langMap.get(filterValue) ?? "English";
  }

  if (type === "Index") {
    return {
      pageTitle: "GPR's Blog",
      pageDesc: "Part Time Student, Full Time Learner",
      title: "Home",
      desc: "Part Time Student, Full Time Learner"
    };
  }

  const title = `${type} "${filterValue}"`;

  return {
    pageTitle: filterValue,
    pageDesc: `Show All Posts Under ${title}`,
    title,
    desc: `All Posts Under ${title}`
  };
}
