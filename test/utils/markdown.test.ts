// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { stripInlineMarkdown } from "@/utils/markdown";

describe("Test stripMarkdown function", () => {
  test("Bold", () => {
    expect(stripInlineMarkdown("Hello **world**")).toBe("Hello world");
  });

  test("Italic", () => {
    expect(stripInlineMarkdown("Hello _world_")).toBe("Hello world");
  });

  test("Strikethrough", () => {
    expect(stripInlineMarkdown("Hello ~~world~~")).toBe("Hello world");
  });

  test("Code 1", () => {
    expect(stripInlineMarkdown("Hello `world`")).toBe("Hello world");
  });

  test("Code 2", () => {
    expect(stripInlineMarkdown("Hello ``world``")).toBe("Hello world");
  });

  test("Code 1", () => {
    expect(stripInlineMarkdown("Hello [world](https://example.com)")).toBe(
      "Hello world"
    );
  });

  test("Code 2", () => {
    expect(stripInlineMarkdown("Hello [world][link]")).toBe("Hello world");
  });

  test("Mixed bold and italic", () => {
    expect(stripInlineMarkdown("Hello _**world**_")).toBe("Hello world");
  });
});
