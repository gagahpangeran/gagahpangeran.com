// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import { join } from "path";
import imageSize from "image-size";

export const blogPostsDirectory = join(process.cwd(), "content/blog");

export interface ImageData {
  src: string;
  width: number;
  height: number;
}

export function getImageData(imagePath: string): ImageData {
  const fullPath = join(blogPostsDirectory, imagePath);
  const { width, height } = imageSize(fullPath);

  if (width === undefined) {
    throw new Error(`Image ${imagePath} has no width.`);
  }

  if (height === undefined) {
    throw new Error(`Image ${imagePath} has no height.`);
  }

  const src = getFileUrl(join("blog", imagePath));

  return {
    width,
    height,
    src
  };
}

export function getFileUrl(filePath: string) {
  return join("/api/files/", filePath);
}
