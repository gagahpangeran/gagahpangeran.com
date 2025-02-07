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
  filterValue?: string;
}

export function getPageMetadata({
  type,
  filterValue = ""
}: PageMetadataParams) {
  let metadata = null;

  switch (type) {
    case "Blog":
      metadata = {
        title: "Blog",
        description: "All Posts in Blog"
      };
      break;

    case "Language":
      const lang = langMap.get(filterValue);
      if (lang != null) {
        metadata = {
          title: lang,
          description: `All Posts in Language "${lang}"`
        };
      }
      break;

    case "Tag":
      const tags = getAllPostTags();
      const tag = tags.find(
        tag =>
          tag.toLowerCase() === filterValue.replaceAll("-", " ").toLowerCase()
      );

      if (tag != null) {
        metadata = {
          title: tag,
          description: `All Posts in Tag "${tag}"`
        };
      }
      break;
  }

  if (metadata == null) {
    return null;
  }

  return {
    ...metadata,
    ...getOtherMetadata(metadata.title, metadata.description)
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
