// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type Metadata } from "next";
import Blog from "@/templates/Blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "All Posts in Blog"
};

export default function BlogPage({ page }: { page?: number }) {
  return <Blog page={page ?? 1} />;
}
