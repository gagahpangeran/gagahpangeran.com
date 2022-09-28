// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

export const langMap = new Map([
  ["id", "Bahasa Indonesia"],
  ["en", "English"]
]);

export type BlogPageContextType = "Blog" | "Tag" | "Language";

export interface BlogPageContext {
  type: BlogPageContextType;
  filterValue: string;
  basePath: string;
  page: number;
  numPages: number;
}

export const postKeyMap: {
  [key in BlogPageContextType]: keyof Queries.BlogTemplateQuery;
} = {
  Blog: "posts",
  Tag: "tags",
  Language: "langs"
};

export function getPostData(data: Queries.PostDetailFragment | null) {
  if (data == null) {
    throw new Error("Post does not have any data");
  }

  const { id, html, excerpt, fields, frontmatter } = data;

  if (excerpt == null) {
    throw new Error("Post does not have any excerpt");
  }

  if (html == null) {
    throw new Error("Post does not have any html content");
  }

  return {
    id,
    ...frontmatter,
    description: excerpt.replaceAll("\n", " "),
    slug: fields.slug,
    html,
    image: frontmatter.featuredImage?.childImageSharp?.gatsbyImageData,
    imageUrl: frontmatter?.featuredImage?.publicURL ?? ""
  };
}

export function getBlogMetaData({
  type,
  filterValue
}: Omit<BlogPageContext, "basePath" | "page" | "numPages">) {
  if (type === "Language") {
    const lang = langMap.get(filterValue);

    if (lang == null) {
      throw new Error("Language is not valid");
    }

    filterValue = lang;
  }

  let title = type;

  if (type !== "Blog") {
    title += ` "${filterValue}"`;
  }

  return {
    pageTitle: type === "Blog" ? title : filterValue,
    pageDesc: `Show All Posts in ${title}`,
    title,
    desc: `All Posts in ${title}`
  };
}

export function getChangelogVersionData(
  currentVersion: string,
  allReleases: string[]
) {
  const index = allReleases.findIndex(version => version === currentVersion);
  const newerVersion = index === 0 ? null : allReleases[index - 1];
  const olderVersion =
    index === allReleases.length - 1 ? null : allReleases[index + 1];

  const generateChangelogData = (version: string | null) => {
    if (version == null) {
      return null;
    }

    return {
      slug: `/changelog/${version}/`,
      title: version
    };
  };

  return {
    newerData: generateChangelogData(newerVersion),
    olderData: generateChangelogData(olderVersion)
  };
}
