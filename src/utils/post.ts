// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type ImageData, getContentDir, getImageData } from "./file";
import { stripInlineMarkdown } from "./markdown";

const ALL_LANG = ["en", "id"] as const;

interface FrontmatterData {
  date: string;
  featuredImage: string;
  tags: ReadonlyArray<string>;
  lang: (typeof ALL_LANG)[number];
  title: string;
}

export interface PostData extends FrontmatterData {
  slug: string;
  content: string;
  excerpt: string;
  description: string;
  datetime: string;
  image: ImageData;
}

interface GetAllPostsParams {
  page?: number;
  type?: "tag" | "lang";
  value?: string;
}

const POST_PER_PAGE = 5;

export function getAllPosts({ page, type, value }: GetAllPostsParams = {}) {
  const dateComparator = (post1: PostData, post2: PostData) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1;

  const filterFn = (post: PostData | null): post is PostData => {
    if (post == null) {
      return false;
    }

    if (type != null) {
      if (
        type === "tag" &&
        post.tags
          .map(tag => tag.toLowerCase())
          .includes(value?.replaceAll("-", " ").toLowerCase() ?? "")
      ) {
        return true;
      }

      if (type === "lang" && post.lang === value) {
        return true;
      }

      return false;
    }

    return true;
  };

  const blogDir = path.join(getContentDir(), "blog");
  const allPostDirs = fs.readdirSync(blogDir);
  const allPosts = allPostDirs
    .map(getPostBySlug)
    .filter(filterFn)
    .sort(dateComparator);

  if (page == null) {
    return { posts: allPosts, totalPage: 1 };
  }

  if (page <= 0) {
    throw new Error("Page number must be positive.");
  }

  const totalPage = Math.ceil(allPosts.length / POST_PER_PAGE);

  const startIdx = (page - 1) * POST_PER_PAGE;
  const posts = allPosts.slice(startIdx, startIdx + POST_PER_PAGE);

  return { posts, totalPage };
}

export function getPostBySlug(slug: string): PostData | null {
  slug = `/blog/${slug}/`;
  const markdownPath = path.join(getContentDir(), slug, "index.md");

  if (!fs.existsSync(markdownPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(markdownPath, "utf8");
  const grayMatter = matter(fileContent, {
    excerpt_separator: "<!-- excerpt -->"
  });

  const content = grayMatter.content.trim();
  const frontmatter = grayMatter.data as FrontmatterData;
  const excerpt = grayMatter.excerpt?.trim() ?? "";

  if (content.length === 0) {
    console.error("Post does not have any content.");
    return null;
  }

  if (excerpt.length === 0) {
    console.error("Post does not have any excerpt.");
    return null;
  }

  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  const description = stripInlineMarkdown(excerpt.replaceAll("\n", " "));

  const imgPath = path.join(slug, frontmatter.featuredImage);
  const image = getImageData(imgPath);

  const postData: PostData = {
    ...frontmatter,
    slug,
    content,
    excerpt,
    image,
    description,
    date,
    datetime: frontmatter.date
  };

  return postData;
}

export function getNewerOlderPost(slug: string) {
  const { posts } = getAllPosts();

  const index = posts.findIndex(post => post.slug === slug);

  if (index === -1) {
    return { newerPost: null, olderPost: null };
  }

  const newerPost = index === 0 ? null : posts[index - 1];
  const olderPost = index === posts.length - 1 ? null : posts[index + 1];

  return { newerPost, olderPost };
}

export function getAllPostTags() {
  const { posts } = getAllPosts();
  const tags = Array.from(new Set(posts.map(post => post.tags).flat()));
  return tags;
}
