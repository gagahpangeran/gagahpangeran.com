// script to move all assets in blog to public directory

import fs from "fs";
import path from "path";

const cwd = process.cwd();
const contentBlogPath = path.join(cwd, "content/blog");
const publicBlogPath = path.join(cwd, "public/blog");

if (fs.existsSync(publicBlogPath)) {
  fs.rmSync(publicBlogPath, { recursive: true, force: true });
}

fs.cpSync(contentBlogPath, publicBlogPath, {
  recursive: true,
  filter: curPath => !curPath.endsWith(".md")
});
