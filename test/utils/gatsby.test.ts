// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  PaginatedPageDataArgs,
  PaginatedPageDataType,
  PaginatedBlogPageContext,
  createPaginatedPageData,
  getIdPageContext
} from "../../src/utils/gatsby";

const baseContext: Omit<
  PaginatedBlogPageContext,
  "basePath" | "filterValue" | "type"
> = {
  limit: 5,
  skip: 0,
  page: 1,
  numPages: 1
};

const baseArgs: PaginatedPageDataArgs = {
  postCount: 1,
  type: "Language",
  filterValue: "en",
  basePath: "/blog/lang/en"
};

const context: PaginatedBlogPageContext = {
  ...baseContext,
  basePath: "/blog/lang/en",
  filterValue: "en",
  type: "Language"
};

const expectedResult: PaginatedPageDataType = {
  path: context.basePath,
  context
};

describe("Test createPaginatedPageData function", () => {
  test("All arguments filled", () => {
    const result = createPaginatedPageData(baseArgs);

    expect(result).toMatchObject([expectedResult]);
  });

  test("Filter value argument is undefined", () => {
    const args = { ...baseArgs, filterValue: undefined };
    const result = createPaginatedPageData(args);

    const expResult = {
      ...expectedResult,
      context: { ...expectedResult.context, filterValue: "" }
    };

    expect(result).toMatchObject([expResult]);
  });

  test("Multiple pages", () => {
    const result = createPaginatedPageData({
      ...baseArgs,
      postCount: 7
    });

    const multiPageExpectedResult: PaginatedPageDataType[] = [
      {
        path: expectedResult.path,
        context: {
          ...context,
          numPages: 2
        }
      },
      {
        path: `${expectedResult.path}2/`,
        context: {
          ...context,
          numPages: 2,
          skip: 5,
          page: 2
        }
      }
    ];

    expect(result).toMatchObject(multiPageExpectedResult);
  });
});

const postsMockData: Queries.MDNodeFragment["nodes"] = [
  { id: "abc", fields: { slug: "abc" } },
  { id: "def", fields: { slug: "def" } },
  { id: "ghi", fields: { slug: "ghi" } }
];

describe("Test getIdPageContext function", () => {
  test("First index", () => {
    const result = getIdPageContext(postsMockData, 0);
    const expectedResult = { newerId: null, olderId: "def" };

    expect(result).toMatchObject(expectedResult);
  });

  test("Middle index", () => {
    const result = getIdPageContext(postsMockData, 1);
    const expectedResult = { newerId: "abc", olderId: "ghi" };

    expect(result).toMatchObject(expectedResult);
  });

  test("Last index", () => {
    const result = getIdPageContext(postsMockData, 2);
    const expectedResult = { newerId: "def", olderId: null };

    expect(result).toMatchObject(expectedResult);
  });
});
