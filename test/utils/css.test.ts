// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import classModifiers from "../../src/utils/css";

describe("Test classModifiers function", () => {
  test("Without modifiers", () => {
    const result = classModifiers("class");
    const expected = "class";

    expect(result).toBe(expected);
  });
});
