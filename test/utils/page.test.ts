// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getAllBlogPageRoutes, getBlogPageDataBySlug } from "@/utils/page";

describe("test getAllBlogPageRoutes function", () => {
  test("get all routes", () => {
    const expected = [
      "/blog/",
      "/blog/tag/dolor/",
      "/blog/tag/sit/",
      "/blog/tag/amet/",
      "/blog/tag/story/",
      "/blog/tag/cloud/",
      "/blog/tag/lorem/",
      "/blog/tag/ipsum/",
      "/blog/lang/en/",
      "/blog/lang/id/",
      "/blog/dolor-sit-amet/",
      "/blog/my-post/",
      "/blog/lorem-ipsum/"
    ];

    const result = getAllBlogPageRoutes();
    expect(result).toMatchObject(expected);
  });
});

describe("test getBlogPageDataBySlug function", () => {
  test("blog page", () => {
    const expected = {
      kind: "blog",
      posts: [
        {
          title: "Dolor Sit Amet",
          slug: "/blog/dolor-sit-amet/"
        },
        {
          title: "Test Blog Post",
          slug: "/blog/my-post/"
        },
        {
          title: "Lorem Ipsum",
          slug: "/blog/lorem-ipsum/"
        }
      ],
      totalPage: 1,
      pageNumber: 1,
      paginationPath: "/blog/",
      type: "blog"
    };

    const result = getBlogPageDataBySlug([]);
    expect(result).toMatchObject(expected);
  });

  test("tag page", () => {
    const expected = {
      kind: "blog",
      posts: [
        {
          title: "Dolor Sit Amet",
          tags: ["Dolor", "Sit", "Amet"],
          slug: "/blog/dolor-sit-amet/"
        }
      ],
      totalPage: 1,
      pageNumber: 1,
      paginationPath: "/blog/tag/dolor/",
      type: "tag",
      filterValue: "dolor"
    };

    const result = getBlogPageDataBySlug(["tag", "dolor"]);
    expect(result).toMatchObject(expected);
  });

  test("lang page", () => {
    const expected = {
      kind: "blog",
      posts: [
        {
          title: "Test Blog Post",
          lang: "en",
          slug: "/blog/my-post/"
        },
        {
          title: "Lorem Ipsum",
          lang: "en",
          slug: "/blog/lorem-ipsum/"
        }
      ],
      totalPage: 1,
      pageNumber: 1,
      paginationPath: "/blog/lang/en/",
      type: "lang",
      filterValue: "en"
    };

    const result = getBlogPageDataBySlug(["lang", "en"]);
    expect(result).toMatchObject(expected);
  });

  test("post page", () => {
    const expected = {
      kind: "post",
      post: {
        title: "Test Blog Post",
        slug: "/blog/my-post/"
      }
    };

    const result = getBlogPageDataBySlug(["my-post"]);
    expect(result).toMatchObject(expected);
  });

  test("random page", () => {
    const result = getBlogPageDataBySlug(["random-post"]);
    expect(result).toBeNull();
  });
});
