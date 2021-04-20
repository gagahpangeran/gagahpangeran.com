// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { BlogPageContext, BlogPageContextType } from "./data";

export interface PaginatedPageDataArgs {
  postCount: number;
  type: BlogPageContextType;
  basePath: string;
  filterValue?: string;
}

export interface PaginatedBlogPageContext extends BlogPageContext {
  limit: number;
  skip: number;
}

export interface PaginatedPageDataType {
  path: string;
  context: PaginatedBlogPageContext;
}

export function createPaginatedPageData({
  basePath,
  postCount,
  filterValue = "",
  type
}: PaginatedPageDataArgs): PaginatedPageDataType[] {
  const postPerPage = 5;
  const numPages = Math.ceil(postCount / postPerPage);

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
