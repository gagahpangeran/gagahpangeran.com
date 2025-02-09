// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { getFileBuffer, getFileUrl, getImageData } from "@/utils/file";

beforeAll(() => {
  process.env.CONTENT_DIR = "test/fixtures";
});

afterAll(() => {
  process.env.CONTENT_DIR = undefined;
});

describe("Test getImageData function", () => {
  test("Regular image", () => {
    const expected = {
      width: 512,
      height: 512,
      src: "/api/files/blog/my-post/img/thumbnail.png"
    };

    const result = getImageData("/blog/my-post/img/thumbnail.png");
    expect(result).toMatchObject(expected);
  });
});

describe("Test getFileUrl function", () => {
  test("File url", () => {
    const result = getFileUrl("/blog/post/img/thumbnail.png");
    const expected = "/api/files/blog/post/img/thumbnail.png";
    expect(result).toBe(expected);
  });
});

describe("Test getFileBuffer function", () => {
  test("txt file", () => {
    const result = getFileBuffer("/blog/my-post/files/note.txt");
    const expected = Buffer.from("Hello World");
    expect(result).toStrictEqual(expected);
  });
});
