// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { type PostData } from "@/utils/post";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import Page from "./Page";

interface Props {
  title: string;
  description: string;
  posts: PostData[];
  pageNumber: number;
  totalPage: number;
}

export default function Blog({
  title,
  description,
  posts,
  pageNumber,
  totalPage
}: Props) {
  return (
    <Page mainTitle={title} subTitle={description}>
      {posts.map(post => (
        <PostCard key={post.slug} {...post} />
      ))}

      <Pagination path="/blog/" numPages={totalPage} page={pageNumber} />
    </Page>
  );
}
