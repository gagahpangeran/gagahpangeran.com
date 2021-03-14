// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getBlogMetaData } from "../../src/utils/data";

describe("Test getBlogMetaData function", () => {
  test("Index type", () => {
    const result = getBlogMetaData({
      type: "Index",
      filterValue: ""
    });

    const expectedResult = {
      pageTitle: "GPR's Blog",
      pageDesc: "Part Time Student, Full Time Learner",
      title: "Home",
      desc: "Part Time Student, Full Time Learner"
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Category type", () => {
    const result = getBlogMetaData({
      type: "Category",
      filterValue: "Story"
    });

    const expectedResult = {
      pageTitle: "Story",
      pageDesc: `Show All Posts Under Category "Story"`,
      title: `Category Story`,
      desc: `All Posts Under Category "Story"`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Tags type", () => {
    const result = getBlogMetaData({
      type: "Tag",
      filterValue: "Cloud"
    });

    const expectedResult = {
      pageTitle: "Cloud",
      pageDesc: `Show All Posts Under Tag "Cloud"`,
      title: `Tag Cloud`,
      desc: `All Posts Under Tag "Cloud"`
    };

    expect(result).toMatchObject(expectedResult);
  });

  test("Language type", () => {
    const result = getBlogMetaData({
      type: "Language",
      filterValue: "en"
    });

    const expectedResult = {
      pageTitle: "English",
      pageDesc: `Show All Posts Under Language "English"`,
      title: `Language English`,
      desc: `All Posts Under Language "English"`
    };

    expect(result).toMatchObject(expectedResult);
  });
});
