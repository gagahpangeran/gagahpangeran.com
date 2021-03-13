// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  CreatePageDataArgs,
  CreatePageDataType,
  CreateBlogPageContext,
  createPageData
} from "../../src/utils/gatsby";

const baseContext = {
  limit: 5,
  skip: 0,
  page: 1,
  numPages: 1
};

const baseArgs: CreatePageDataArgs = {
  postCount: 1,
  type: "Language",
  slug: "lang",
  filterValue: "en"
};

const path = "/lang/en/";

const context: CreateBlogPageContext = {
  ...baseContext,
  basePath: path,
  filterValue: "en",
  type: "Language"
};

const expectedResult: CreatePageDataType = {
  path,
  context
};

describe("Test createPageData function", () => {
  test("All arguments filled", () => {
    const result = createPageData(baseArgs);

    expect(result).toMatchObject([expectedResult]);
  });
});
