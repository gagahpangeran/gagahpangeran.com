// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  try {
    const imagePath = path.join(process.cwd(), "content", ...slug);
    const imageBuffer = fs.readFileSync(imagePath);
    const response = new NextResponse(imageBuffer);
    return response;
  } catch (error) {
    return new NextResponse("Image not found", { status: 404 });
  }
}
