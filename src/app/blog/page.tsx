// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Blog from "@/templates/Blog";
import { getBlogMetaData } from "@/utils/data";

export async function generateMetadata(): Promise<Metadata> {
  const { title, desc } = getBlogMetaData({ type: "Blog", filterValue: "" });
  return {
    title,
    description: desc
  };
}

export default function BlogPage({ page }: { page?: number }) {
  const { pageTitle, pageDesc } = getBlogMetaData({
    type: "Blog",
    filterValue: ""
  });

  return (
    <Blog title={pageTitle} description={pageDesc} pageNumber={page ?? 1} />
  );
}
