// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { getAllPosts } from "@/utils/post";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Page from "./Page";

export default function Blog({ page }: { page: number }) {
  const { posts, totalPage } = getAllPosts(page);

  return (
    <Page mainTitle="Blog" subTitle="Show All Posts in Blog">
      {posts.map(post => (
        <PostCard key={post.slug} {...post} />
      ))}

      <Pagination path="/blog/" numPages={totalPage} page={page} />
    </Page>
  );
}
