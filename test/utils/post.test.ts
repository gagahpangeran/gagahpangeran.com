// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  getAllPosts,
  getAllPostTags,
  getNewerOlderPost,
  getPostBySlug,
  type PostData
} from "@/utils/post";

describe("test getAllPosts function", () => {
  test("All posts", () => {
    const { posts, totalPage } = getAllPosts();

    const expected = [
      {
        title: "Dolor Sit Amet",
        date: "March 14, 2025",
        featuredImage: "./img/solid.png",
        tags: ["Dolor", "Sit", "Amet"],
        lang: "id",
        slug: "/blog/dolor-sit-amet/"
      },
      {
        title: "Test Blog Post",
        date: "January 29, 2025",
        featuredImage: "./img/thumbnail.png",
        tags: ["Story", "Cloud"],
        lang: "en",
        slug: "/blog/my-post/"
      },
      {
        title: "Lorem Ipsum",
        date: "December 14, 2024",
        featuredImage: "./img/solid.png",
        tags: ["Lorem", "Ipsum"],
        lang: "en",
        slug: "/blog/lorem-ipsum/"
      }
    ];

    expect(totalPage).toBe(1);
    expect(posts).toMatchObject(expected);
  });

  test("Filter by blog", () => {
    const expected = [
      {
        title: "Dolor Sit Amet",
        date: "March 14, 2025",
        featuredImage: "./img/solid.png",
        tags: ["Dolor", "Sit", "Amet"],
        lang: "id",
        slug: "/blog/dolor-sit-amet/"
      },
      {
        title: "Test Blog Post",
        date: "January 29, 2025",
        featuredImage: "./img/thumbnail.png",
        tags: ["Story", "Cloud"],
        lang: "en",
        slug: "/blog/my-post/"
      },
      {
        title: "Lorem Ipsum",
        date: "December 14, 2024",
        featuredImage: "./img/solid.png",
        tags: ["Lorem", "Ipsum"],
        lang: "en",
        slug: "/blog/lorem-ipsum/"
      }
    ];

    const { posts } = getAllPosts({ page: 1, type: "blog" });
    expect(posts).toMatchObject(expected);
  });

  test("Filter by tag", () => {
    const { posts } = getAllPosts({ page: 1, type: "tag", value: "Lorem" });
    const expected = [
      {
        title: "Lorem Ipsum",
        date: "December 14, 2024",
        featuredImage: "./img/solid.png",
        tags: ["Lorem", "Ipsum"],
        lang: "en",
        slug: "/blog/lorem-ipsum/"
      }
    ];

    expect(posts).toMatchObject(expected);
  });

  test("Filter by lang", () => {
    const { posts } = getAllPosts({ page: 1, type: "lang", value: "id" });
    const expected = [
      {
        title: "Dolor Sit Amet",
        date: "March 14, 2025",
        featuredImage: "./img/solid.png",
        tags: ["Dolor", "Sit", "Amet"],
        lang: "id",
        slug: "/blog/dolor-sit-amet/"
      }
    ];

    expect(posts).toMatchObject(expected);
  });

  test("Invalid page number", () => {
    expect(() => getAllPosts({ page: -1 })).toThrow(
      "Page number must be positive."
    );
  });
});

describe("test getPostBySlug function", () => {
  test("Simple blog post", () => {
    const expected: PostData = {
      title: "Test Blog Post",
      date: "January 29, 2025",
      featuredImage: "./img/thumbnail.png",
      tags: ["Story", "Cloud"],
      lang: "en",
      slug: "/blog/my-post/",
      datetime: "2025-01-29T20:00:00+07:00",
      image: {
        width: 512,
        height: 512,
        src: "/blog/my-post/img/thumbnail.png"
      },
      excerpt: `Lorem ipsum **odor** amet, consectetuer adipiscing elit. Velit imperdiet
_praesent_ congue tortor habitant senectus hendrerit penatibus. ~~Primis~~
mollis \`consequat\` himenaeos non suscipit [metus][https://example.com]. Pharetra
at adipiscing [fringilla][link] mattis pretium.`,
      description: `Lorem ipsum odor amet, consectetuer adipiscing elit. Velit imperdiet praesent congue tortor habitant senectus hendrerit penatibus. Primis mollis consequat himenaeos non suscipit metus. Pharetra at adipiscing fringilla mattis pretium.`,
      content: `Lorem ipsum **odor** amet, consectetuer adipiscing elit. Velit imperdiet
_praesent_ congue tortor habitant senectus hendrerit penatibus. ~~Primis~~
mollis \`consequat\` himenaeos non suscipit [metus][https://example.com]. Pharetra
at adipiscing [fringilla][link] mattis pretium.

<!-- excerpt -->

Gravida dolor turpis habitasse sapien nulla egestas. Ex duis vivamus nibh
fringilla curae. Euismod iaculis taciti et lorem maximus ut conubia. Suscipit
commodo facilisis aliquam a semper cras. Mi etiam habitasse sed eget vivamus
erat. Posuere porta tristique ut hac ante non. Eget a dis curae varius cras
sapien tortor.

Ullamcorper ultrices imperdiet vel mattis fames aliquam penatibus. Fusce
vulputate feugiat himenaeos condimentum lacinia dictum vitae risus. Ad integer
justo lacinia proin mauris proin. Enim enim platea, eu nisl tellus nunc ad urna.
Id lobortis lacinia nisi elit luctus sollicitudin facilisis. Consectetur mus
luctus felis nisi feugiat posuere conubia. Ullamcorper ac augue fringilla
sagittis, auctor ut. Justo primis conubia suspendisse; aenean ad hac dapibus
luctus. Pellentesque tortor suspendisse pharetra dolor convallis quisque
laoreet. Habitasse varius leo sapien; quisque senectus platea.

[link]: https://example.com`
    };

    const result = getPostBySlug("my-post");
    expect(result).toMatchObject(expected);
  });

  test("Not found post", () => {
    const result = getPostBySlug("not-found-post");
    expect(result).toBeNull();
  });
});

describe("test getNewerOlderPost function", () => {
  test("Middle post", () => {
    const expected = {
      newerPost: {
        title: "Dolor Sit Amet",
        date: "March 14, 2025",
        featuredImage: "./img/solid.png",
        tags: ["Dolor", "Sit", "Amet"],
        lang: "id",
        slug: "/blog/dolor-sit-amet/"
      },
      olderPost: {
        title: "Lorem Ipsum",
        date: "December 14, 2024",
        featuredImage: "./img/solid.png",
        tags: ["Lorem", "Ipsum"],
        lang: "en",
        slug: "/blog/lorem-ipsum/"
      }
    };

    const result = getNewerOlderPost("/blog/my-post/");
    expect(result).toMatchObject(expected);
  });

  test("Newest post", () => {
    const expected = {
      newerPost: null,
      olderPost: {
        title: "Test Blog Post",
        date: "January 29, 2025",
        featuredImage: "./img/thumbnail.png",
        tags: ["Story", "Cloud"],
        lang: "en",
        slug: "/blog/my-post/"
      }
    };

    const result = getNewerOlderPost("/blog/dolor-sit-amet/");
    expect(result).toMatchObject(expected);
  });

  test("Oldest post", () => {
    const expected = {
      newerPost: {
        title: "Test Blog Post",
        date: "January 29, 2025",
        featuredImage: "./img/thumbnail.png",
        tags: ["Story", "Cloud"],
        lang: "en",
        slug: "/blog/my-post/"
      },
      olderPost: null
    };

    const result = getNewerOlderPost("/blog/lorem-ipsum/");
    expect(result).toMatchObject(expected);
  });

  test("Not found post", () => {
    const result = getNewerOlderPost("/blog/not-found-post/");
    expect(result).toMatchObject({ newerPost: null, olderPost: null });
  });
});

describe("test getAllPostTags function", () => {
  test("Get all tags", () => {
    const result = getAllPostTags();
    const expected = [
      "Story",
      "Cloud",
      "Lorem",
      "Ipsum",
      "Dolor",
      "Sit",
      "Amet"
    ];
    expect(result.sort()).toMatchObject(expected.sort());
  });
});
