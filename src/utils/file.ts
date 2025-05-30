// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import path from "path";
import imageSize from "image-size";

export function getContentDir() {
  return path.join(process.cwd(), process.env.CONTENT_DIR ?? "content");
}

export interface ImageData {
  src: string;
  width: number;
  height: number;
}

export function getImageData(imagePath: string): ImageData {
  const fullPath = path.join(getContentDir(), imagePath);
  const { width, height } = imageSize(fullPath);

  if (width === undefined) {
    throw new Error(`Image ${imagePath} has no width.`);
  }

  if (height === undefined) {
    throw new Error(`Image ${imagePath} has no height.`);
  }

  return {
    width,
    height,
    src: imagePath
  };
}
