// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import kebabCase from "lodash.kebabcase";
import { BlogPageContext } from "../templates/Blog";

interface CreatePageDataArgs {
  postCount: number;
  type: BlogPageContext["type"];
  slug?: string;
  filterValue?: string;
}

interface CreatePageDataType {
  path: string;
  context: {
    limit: number;
    skip: number;
    page: number;
    basePath: string;
    numPages: number;
    filterValue: string;
    type: BlogPageContext["type"];
  };
}

export function createPageData({
  slug,
  postCount,
  filterValue = "",
  type
}: CreatePageDataArgs): CreatePageDataType[] {
  const postPerPage = 5;
  const numPages = Math.ceil(postCount / postPerPage);

  let basePath = "/";

  if (slug === undefined) {
    if (type !== "Index") {
      basePath += `${type.toLowerCase()}/`;
    }
  } else {
    basePath += `${slug}/`;
  }

  if (filterValue.length > 0) {
    basePath += `${kebabCase(filterValue)}/`;
  }

  return Array.from({ length: numPages }).map((_, index) => ({
    path: `${basePath}${index > 0 ? `${index + 1}/` : ""}`,
    context: {
      limit: postPerPage,
      skip: index * postPerPage,
      page: index + 1,
      basePath,
      numPages,
      filterValue,
      type
    }
  }));
}
