// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import classModifiers, { classAll } from "../../src/utils/css";

describe("Test classModifiers function", () => {
  test("Without modifiers", () => {
    const result = classModifiers("class");
    const expected = "class";

    expect(result).toBe(expected);
  });

  test("With string modifiers", () => {
    const result = classModifiers("class", "mod1", "mod2", "mod3");
    const expected = "class class--mod1 class--mod2 class--mod3";

    expect(result).toBe(expected);
  });

  test("With key value object modifiers", () => {
    const result = classModifiers("class", {
      mod1: true,
      mod2: false,
      mod3: true
    });
    const expected = "class class--mod1 class--mod3";

    expect(result).toBe(expected);
  });

  test("With mixed modifiers", () => {
    const result = classModifiers(
      "class",
      "mod1",
      undefined,
      {
        mod2: false,
        mod3: true
      },
      undefined,
      "mod4"
    );
    const expected = "class class--mod1 class--mod3 class--mod4";

    expect(result).toBe(expected);
  });
});

describe("Test classAll function", () => {
  test("Class name strings only", () => {
    const result = classAll("class1", "class2", "class3");
    const expected = "class1 class2 class3";

    expect(result).toBe(expected);
  });

  test("Class name array only", () => {
    const result = classAll(["class1", "class2", "class3"]);
    const expected = "class1 class2 class3";

    expect(result).toBe(expected);
  });

  test("Class name mixed string and array", () => {
    const result = classAll("class1", ["class2", "class3"], "class4");
    const expected = "class1 class2 class3 class4";

    expect(result).toBe(expected);
  });
});
