// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  PaginatedPageDataArgs,
  PaginatedPageDataType,
  PaginatedBlogPageContext,
  createPaginatedPageData
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
  slug: "lang",
  filterValue: "en"
};

const context: PaginatedBlogPageContext = {
  ...baseContext,
  basePath: "/blog/lang/en/",
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

  test("slug argument empty or undefined", () => {
    const result = createPaginatedPageData({
      ...baseArgs,
      slug: undefined
    });

    const slugExpectedResult: PaginatedPageDataType = {
      path: "/blog/language/en/",
      context: {
        ...expectedResult.context,
        basePath: "/blog/language/en/"
      }
    };

    expect(result).toMatchObject([slugExpectedResult]);
  });

  test("filterValue (and slug) argument(s) empty or undefined", () => {
    let filterValueArgs: PaginatedPageDataArgs = {
      ...baseArgs,
      filterValue: undefined
    };

    const errorMessage = `filterValue can not be empty if type is not "Blog"`;

    expect(() => createPaginatedPageData(filterValueArgs)).toThrow(
      errorMessage
    );

    filterValueArgs = {
      ...filterValueArgs,
      slug: undefined
    };

    expect(() => createPaginatedPageData(filterValueArgs)).toThrow(
      errorMessage
    );
  });

  test("Index type argument", () => {
    const result = createPaginatedPageData({
      postCount: 1,
      type: "Blog"
    });

    const indexTypeExpectedResult: PaginatedPageDataType = {
      path: "/blog/",
      context: {
        ...baseContext,
        basePath: "/blog/",
        filterValue: "",
        type: "Blog"
      }
    };

    expect(result).toMatchObject([indexTypeExpectedResult]);
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
