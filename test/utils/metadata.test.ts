// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getOtherMetadata, getPageMetadata } from "@/utils/metadata";

beforeAll(() => {
  process.env.SITE_URL = "https://example.com";
});

afterAll(() => {
  process.env.SITE_URL = undefined;
});

describe("Test getPageMetadata function", () => {
  test("Blog type", () => {
    const result = getPageMetadata({ type: "blog" });

    const expectedResult = {
      title: "Blog",
      description: `All Posts in Blog`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Tag type", () => {
    const result = getPageMetadata({
      type: "tag",
      filterValue: "Cloud"
    });

    const expectedResult = {
      title: "Cloud",
      description: `All Posts in Tag "Cloud"`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Tag type invalid", () => {
    const result = getPageMetadata({
      type: "tag",
      filterValue: "Programming"
    });

    expect(result).toBeNull();
  });

  test("Language type", () => {
    const result = getPageMetadata({
      type: "lang",
      filterValue: "en"
    });

    const expectedResult = {
      title: "English",
      description: `All Posts in Language "English"`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Language type invalid", () => {
    const result = getPageMetadata({
      type: "lang",
      filterValue: "xx"
    });

    expect(result).toBeNull();
  });
});

describe("Test getOtherMetadata function", () => {
  test("Only title", () => {
    const expectedMetadata = {
      openGraph: {
        title: "Home | GPR",
        description: "Low Budget Programmer",
        type: "website",
        images: [
          { url: "https://example.com/logo.png", width: 256, height: 256 }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: "Home | GPR",
        description: "Low Budget Programmer",
        images: ["https://example.com/logo.png"]
      }
    };

    const result = getOtherMetadata("Home");
    expect(result).toMatchObject(expectedMetadata);
  });

  test("Title and description", () => {
    const expectedMetadata = {
      openGraph: {
        title: "Blog | GPR",
        description: "All Posts in Blog",
        type: "website",
        images: [
          { url: "https://example.com/logo.png", width: 256, height: 256 }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog | GPR",
        description: "All Posts in Blog",
        images: ["https://example.com/logo.png"]
      }
    };

    const result = getOtherMetadata("Blog", "All Posts in Blog");
    expect(result).toMatchObject(expectedMetadata);
  });

  test("Title, description, and image", () => {
    const expectedMetadata = {
      openGraph: {
        title: "My First Post | GPR",
        description: "This is my first post.",
        type: "website",
        images: [
          {
            url: "https://example.com/blog/my-first-post/img/thumbnail.png",
            width: 512,
            height: 512
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: "My First Post | GPR",
        description: "This is my first post.",
        images: ["https://example.com/blog/my-first-post/img/thumbnail.png"]
      }
    };

    const result = getOtherMetadata("My First Post", "This is my first post.", {
      src: "/blog/my-first-post/img/thumbnail.png",
      width: 512,
      height: 512
    });
    expect(result).toMatchObject(expectedMetadata);
  });
});
