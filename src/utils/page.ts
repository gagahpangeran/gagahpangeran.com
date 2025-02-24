// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import kebabCase from "lodash.kebabcase";
import {
  type PostData,
  type PageType,
  ALL_LANG,
  POST_PER_PAGE,
  getAllPosts,
  getAllPostTags,
  getPostBySlug
} from "./post";

interface PostPageData {
  kind: "post";
  post: PostData;
}

interface BlogPageData {
  kind: "blog";
  posts: PostData[];
  totalPage: number;
  pageNumber: number;
  paginationPath: string;
  type: PageType;
  filterValue?: string;
}

export function getAllBlogPageRoutes() {
  const createPaginatedRoutes = (basePath: string, postCount: number) => {
    const totalPage = Math.ceil(postCount / POST_PER_PAGE);
    return Array.from({ length: totalPage }).map(
      (_, index) => `${basePath}${index > 0 ? `${index + 1}/` : ""}`
    );
  };

  const { posts } = getAllPosts();
  const postRoutes = posts.map(post => post.slug);
  const blogRoutes = createPaginatedRoutes("/blog/", posts.length);

  const allTags = getAllPostTags();
  const tagRoutes = allTags.flatMap(tag => {
    const { posts } = getAllPosts({ type: "tag", value: tag });
    const basePath = `/blog/tag/${kebabCase(tag)}/`;
    return createPaginatedRoutes(basePath, posts.length);
  });

  const langRoutes = ALL_LANG.flatMap(lang => {
    const { posts } = getAllPosts({ type: "lang", value: lang });
    const basePath = `/blog/lang/${kebabCase(lang)}/`;
    return createPaginatedRoutes(basePath, posts.length);
  });

  const allRoutes = [...blogRoutes, ...tagRoutes, ...langRoutes, ...postRoutes];
  return allRoutes;
}

export function getBlogPageDataBySlug(
  slug?: string[]
): BlogPageData | PostPageData | null {
  let params: { page: number; type: PageType; value?: string } | undefined;

  if (slug == null || slug.length === 0) {
    params = { page: 1, type: "blog" };
  } else if (Number.isInteger(Number(slug[0]))) {
    params = { page: Number(slug[0]), type: "blog" };
  } else if (slug[0] === "tag" || slug[0] === "lang") {
    const filterValue = slug[1];

    if (slug[2] == null) {
      params = { page: 1, type: slug[0], value: filterValue };
    } else if (Number.isInteger(Number(slug[2]))) {
      params = { page: Number(slug[2]), type: slug[0], value: filterValue };
    }
  }

  if (params != null) {
    const { posts, totalPage } = getAllPosts(params);

    let paginationPath = "/blog/";
    if (params.type !== "blog") {
      paginationPath += `${params.type}/${params.value}/`;
    }

    return {
      kind: "blog",
      posts,
      totalPage,
      pageNumber: params.page,
      paginationPath,
      type: params.type,
      filterValue: params.value
    };
  }

  const post = getPostBySlug(slug?.[0] ?? "");

  if (post != null) {
    return {
      kind: "post",
      post
    };
  }

  return null;
}
