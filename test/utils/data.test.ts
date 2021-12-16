// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getBlogMetaData } from "../../src/utils/data";

describe("Test getBlogMetaData function", () => {
  test("Index type", () => {
    const result = getBlogMetaData({
      type: "Blog",
      filterValue: ""
    });

    const expectedResult = {
      pageTitle: "Blog",
      pageDesc: `Show All Posts in Blog`,
      title: `Blog`,
      desc: `All Posts in Blog`
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
      pageDesc: `Show All Posts in Tag "Cloud"`,
      title: `Tag "Cloud"`,
      desc: `All Posts in Tag "Cloud"`
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
      pageDesc: `Show All Posts in Language "English"`,
      title: `Language "English"`,
      desc: `All Posts in Language "English"`
    };

    expect(result).toMatchObject(expectedResult);
  });
});
