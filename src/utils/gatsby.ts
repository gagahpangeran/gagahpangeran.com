// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import kebabCase from "lodash.kebabcase";
import { BlogPageContext, BlogPageContextType } from "./data";

export interface CreatePageDataArgs {
  postCount: number;
  type: BlogPageContextType;
  slug?: string;
  filterValue?: string;
}

export interface CreateBlogPageContext extends BlogPageContext {
  limit: number;
  skip: number;
}

export interface CreatePageDataType {
  path: string;
  context: CreateBlogPageContext;
}

export function createPageData({
  slug,
  postCount,
  filterValue = "",
  type
}: CreatePageDataArgs): CreatePageDataType[] {
  const postPerPage = 5;
  const numPages = Math.ceil(postCount / postPerPage);

  let basePath = "/blog/";

  if (type !== "Blog") {
    if (slug === undefined) {
      basePath += `${type.toLowerCase()}/`;
    } else {
      basePath += `${slug}/`;
    }

    if (filterValue.length > 0) {
      basePath += `${kebabCase(filterValue)}/`;
    } else {
      throw new Error(`filterValue can not be empty if type is not "Blog"`);
    }
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
