// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import {
  CreatePageDataArgs,
  CreatePageDataType,
  createPageData
} from "../../src/utils/gatsby";

describe("Test createPageData function", () => {
  test("All arguments filled", () => {
    const args: CreatePageDataArgs = {
      postCount: 1,
      type: "Language",
      slug: "lang",
      filterValue: "en"
    };

    const expectedResult: CreatePageDataType[] = [
      {
        path: "/lang/en/",
        context: {
          limit: 5,
          skip: 0,
          page: 1,
          basePath: "/lang/en/",
          numPages: 1,
          filterValue: "en",
          type: "Language"
        }
      }
    ];

    const result = createPageData(args);

    expect(result).toMatchObject(expectedResult);
  });
});
