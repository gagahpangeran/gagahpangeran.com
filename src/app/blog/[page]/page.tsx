// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { notFound } from "next/navigation";
import Blog from "../page";

export default async function BlogPagination({
  params
}: {
  params: Promise<{ page: string }>;
}) {
  const page = Number((await params).page);

  if (isNaN(page) || page < 0) {
    notFound();
  }

  return <Blog page={page} />;
}
