// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getBlogMetaData, getChangelogVersionData } from "../../src/utils/data";
import * as UtilPost from "@/utils/post";

jest.mock("@/utils/post", () => ({
  ...jest.requireActual("@/utils/post"),
  getAllPostTags: jest.fn()
}));

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
    (UtilPost.getAllPostTags as jest.Mock).mockReturnValue(["Cloud", "Story"]);

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

  test("Language type invalid", () => {
    const result = () =>
      getBlogMetaData({
        type: "Language",
        filterValue: "xx"
      });

    expect(result).toThrow("Language xx is not valid");
  });
});

describe("Test getChangelogVersionData", () => {
  const allReleasesMockData = ["2022.01.04", "2021.10.28", "2021.08.12"];

  test("First entry", () => {
    const result = getChangelogVersionData("2022.01.04", allReleasesMockData);

    expect(result).toMatchObject({
      newerData: null,
      olderData: {
        slug: `/changelog/2021.10.28/`,
        title: `2021.10.28`
      }
    });
  });

  test("Last entry", () => {
    const result = getChangelogVersionData("2021.08.12", allReleasesMockData);

    expect(result).toMatchObject({
      newerData: {
        slug: `/changelog/2021.10.28/`,
        title: `2021.10.28`
      },
      olderData: null
    });
  });

  test("Middle entry", () => {
    const result = getChangelogVersionData("2021.10.28", allReleasesMockData);

    expect(result).toMatchObject({
      newerData: {
        slug: `/changelog/2022.01.04/`,
        title: `2022.01.04`
      },
      olderData: {
        slug: `/changelog/2021.08.12/`,
        title: `2021.08.12`
      }
    });
  });
});
