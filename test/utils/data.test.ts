// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getOtherMetadata, getPageMetadata } from "@/utils/data";
import * as UtilPost from "@/utils/post";

jest.mock("@/utils/post", () => ({
  ...jest.requireActual("@/utils/post"),
  getAllPostTags: jest.fn()
}));

describe("Test getPageMetadata function", () => {
  test("Blog type", () => {
    const result = getPageMetadata({ type: "Blog" });

    const expectedResult = {
      title: "Blog",
      description: `All Posts in Blog`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Tag type", () => {
    (UtilPost.getAllPostTags as jest.Mock).mockReturnValue(["Cloud", "Story"]);

    const result = getPageMetadata({
      type: "Tag",
      filterValue: "Cloud"
    });

    const expectedResult = {
      title: "Cloud",
      description: `All Posts in Tag "Cloud"`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Language type", () => {
    const result = getPageMetadata({
      type: "Language",
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
      type: "Language",
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
        images: [{ url: "/logo.png" }]
      },
      twitter: {
        card: "summary_large_image",
        title: "Home | GPR",
        description: "Low Budget Programmer",
        images: ["/logo.png"]
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
        images: [{ url: "/logo.png" }]
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog | GPR",
        description: "All Posts in Blog",
        images: ["/logo.png"]
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
        images: [{ url: "/blog/my-first-post/img/thumbnail.png" }]
      },
      twitter: {
        card: "summary_large_image",
        title: "My First Post | GPR",
        description: "This is my first post.",
        images: ["/blog/my-first-post/img/thumbnail.png"]
      }
    };

    const result = getOtherMetadata(
      "My First Post",
      "This is my first post.",
      "/blog/my-first-post/img/thumbnail.png"
    );
    expect(result).toMatchObject(expectedMetadata);
  });
});
