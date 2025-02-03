// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import imageSize from "image-size";

type Language = "en" | "id";

export interface ImageData {
  src: string;
  width: number;
  height: number;
}

interface FrontmatterData {
  date: string;
  featuredImage: string;
  tags: ReadonlyArray<string>;
  lang: Language;
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

const postsDirectory = join(process.cwd(), "content/blog");

export function getAllPosts({ page, type, value }: GetAllPostsParams) {
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

  const slugs = fs.readdirSync(postsDirectory);
  const allPosts = slugs
    .map(getPostBySlug)
    .filter(filterFn)
    .sort(dateComparator);

  if (page == null) {
    return { posts: allPosts, totalPage: 0 };
  }

  if (page <= 0) {
    throw new Error("Page number must be positive.");
  }

  const postPerPage = 5;
  const totalPage = Math.ceil(allPosts.length / postPerPage);

  const startIdx = (page - 1) * postPerPage;
  const posts = allPosts.slice(startIdx, startIdx + postPerPage);

  return { posts, totalPage };
}

export function getPostBySlug(slug: string): PostData | null {
  const markdownPath = join(postsDirectory, slug, "index.md");

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
  const description = excerpt.replaceAll("\n", " ");

  const imgPath = join(slug, frontmatter.featuredImage);
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

export function getOlderNewerPost(slug: string) {
  const { posts } = getAllPosts({});
  const len = posts.length;

  for (let i = 0; i < len; i++) {
    if (posts[i].slug === slug) {
      const newerPost = i - 1 >= 0 ? posts[i - 1] : null;
      const olderPost = i + 1 < len ? posts[i + 1] : null;

      return { newerPost, olderPost };
    }
  }

  return null;
}

export function getAllPostTags() {
  const { posts } = getAllPosts({});
  const tags = Array.from(new Set(posts.map(post => post.tags).flat()));
  return tags;
}

export function getFileUrl(filePath: string) {
  return join("/api/files/", filePath);
}

export function getImageData(imagePath: string): ImageData {
  const fullPath = join(postsDirectory, imagePath);
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
