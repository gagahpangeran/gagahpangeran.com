import prompts from "prompts";
import fs from "fs";

type Response = {
  title: string;
  slug: string;
  date: Date;
  tags: string[];
  lang: "id" | "en";
  confirm: boolean;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^0-9a-z ]/gi, "")
    .replace(/ +/gi, "-");
}

const questions: Parameters<typeof prompts>[0] = [
  {
    type: "text",
    name: "title",
    message: "Title",
    initial: "New Blog"
  },
  {
    type: "text",
    name: "slug",
    message: "Slug",
    initial: slugify
  },
  {
    type: "date",
    name: "date",
    message: "Date",
    initial: new Date()
  },
  {
    type: "list",
    name: "tags",
    message: "Tags",
    initial: "Story",
    separator: ","
  },
  {
    type: "select",
    name: "lang",
    message: "Language",
    choices: [
      {
        title: "Bahasa Indonesia",
        value: "id"
      },
      {
        title: "English",
        value: "en"
      }
    ]
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Create new blog?",
    initial: true
  }
];

function onCancel() {
  console.log("Canceling process...");
  process.exit(0);
}

function createDir(targetDir: string) {
  if (fs.existsSync(targetDir)) {
    console.error(`Directory ${targetDir} already exist!`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir);
}

function createPost(targetDir: string, data: Response) {
  const filename = "index.md";
  const targetFile = `${targetDir}/${filename}`;

  try {
    const { title, date, tags, lang } = data;
    const dateStr = date.toISOString();
    const tagsStr = tags.map(t => `"${t}"`).join(", ");

    const content = `---
# Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
# Licensed under CC-BY-NC 4.0.
# Read the LICENSE file inside the 'content' directory for full license text.

title: "${title}"
date: "${dateStr}"
featuredImage: "./img/thumbnail.png"
tags: [${tagsStr}]
lang: "${lang}"
---

Post excerpt here.

<!-- excerpt -->

Post body here.
`;

    fs.writeFileSync(targetFile, content);
  } catch (err) {
    console.error(err);
    console.error(`Failed to create ${targetFile}`);
    process.exit(1);
  }
}

function createThumbnail(currentDir: string, targetDir: string) {
  const srcFile = `${currentDir}/static/logo.png`;
  const thumbDir = `${targetDir}/img`;
  const thumbFile = `${thumbDir}/thumbnail.png`;

  try {
    createDir(thumbDir);
    fs.copyFileSync(srcFile, thumbFile);
  } catch (err) {
    console.error(err);
    console.error(`Failed to create ${thumbFile}`);
    process.exit(1);
  }
}

async function main() {
  const response = await prompts(questions, { onCancel });
  const { slug, confirm } = response as Response;

  if (!confirm) {
    onCancel();
  }

  const currentDir = process.cwd();
  const targetDir = `${currentDir}/content/blog/${slug}`;

  createDir(targetDir);
  createPost(targetDir, response as Response);
  createThumbnail(currentDir, targetDir);

  console.log(`Success create new blog post in ${targetDir}`);
}

main();
