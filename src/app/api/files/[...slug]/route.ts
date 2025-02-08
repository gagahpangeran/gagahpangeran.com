// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type NextRequest, NextResponse } from "next/server";
import { getFileBuffer } from "@/utils/file";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  try {
    const fileBuffer = getFileBuffer(slug.join("/"));
    const response = new NextResponse(fileBuffer);
    return response;
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }
}
