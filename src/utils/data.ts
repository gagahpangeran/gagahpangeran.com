// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getAllPostTags } from "./post";

export const langMap = new Map([
  ["id", "Bahasa Indonesia"],
  ["en", "English"]
]);

type PageType = "Blog" | "Tag" | "Language";

interface PageMetadataParams {
  type: PageType;
  filterValue: string;
}

export function getPageMetadata({ type, filterValue }: PageMetadataParams) {
  if (type === "Language") {
    const lang = langMap.get(filterValue);

    if (lang == null) {
      throw new Error(`Language ${filterValue} is not valid`);
    }

    filterValue = lang;
  }

  if (type === "Tag") {
    const tags = getAllPostTags();
    const tag = tags.find(
      tag =>
        tag.toLowerCase() === filterValue.replaceAll("-", " ").toLowerCase()
    );

    if (tag == null) {
      throw new Error(`Tag ${filterValue} not found`);
    }

    filterValue = tag;
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

export function getOtherMetadata(
  title: string,
  description?: string,
  image?: string
) {
  title = `${title} | GPR`;
  description ??= "Low Budget Programmer";
  image ??= `/logo.png`;

  const openGraph = {
    title,
    description,
    type: "website",
    images: [{ url: image }]
  };

  const twitter = {
    card: "summary_large_image",
    title,
    description,
    images: [image]
  };

  return {
    openGraph,
    twitter
  };
}
