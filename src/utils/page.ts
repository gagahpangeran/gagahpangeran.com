// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import kebabCase from "lodash.kebabcase";
import { ALL_LANG, POST_PER_PAGE, getAllPosts, getAllPostTags } from "./post";

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
