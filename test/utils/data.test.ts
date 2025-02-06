// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getPageMetadata } from "@/utils/data";
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
    const result = () =>
      getPageMetadata({
        type: "Language",
        filterValue: "xx"
      });

    expect(result).toThrow("Language xx is not valid");
  });
});
