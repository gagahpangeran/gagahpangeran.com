// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { getImageData } from "@/utils/file";

describe("Test getImageData function", () => {
  test("Regular image", () => {
    const expected = {
      width: 512,
      height: 512,
      src: "/blog/my-post/img/thumbnail.png"
    };

    const result = getImageData("/blog/my-post/img/thumbnail.png");
    expect(result).toMatchObject(expected);
  });
});
