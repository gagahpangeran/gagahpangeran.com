---
# Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
# Licensed under CC-BY-NC 4.0.
# Read the LICENSE file inside the 'content' directory for full license text.

title: "Migrating My Website from GatsbyJS to NextJS"
date: "2025-02-21T15:00:00+07:00"
featuredImage: "./img/gatsby-next.png"
tags: ["Tech", "Blog", "Website", "NextJS"]
lang: "en"
---

As I wrote in [Hello 2025 post][hello2025] before, I have a plan to migrate this
website to NextJS. And here it is, what you look is the new NextJS version of
this website.

<!-- excerpt -->

I will not write about any technical or implementation detail in this post.
Maybe I will do it later by writing multi-part blog posts.

The migration itself is quite straightforward. I have to implement my own
program to read and parse the the posts from markdown in the `content`
directory. The old Gatsby codebase has its own filesystem library to parse and
transform the markdown file to graphql query. I also have to implement the
routing based on NextJS app router convention.

I think the hard part is the deployment. I still deploy this website to netlify.
I did some kind of trial and error to deploy to netlify because the server
component of NextJS is reading directly from the markdown files instead of
generating the static page on build. I also do some hackery to see the internal
filesystem structure of netlify deployment for debugging purpose. I will explain
about this later in separated post.

Why not move to vercel? If it works on netlify, why bother move it. Maybe in the
future I will deploy this website to my own VPS, but not for now.

There are a few things that I still have to sort out. First, the image is still
blank when it is loaded. In the old Gatsby website the loading is the blurred
version of the image. Second, the dev server is not hot reloading when I change
anything inside the `content` directory. I believe this is because NextJS only
tracks the changes inside the `src` directory.

Overall the website mostly looks and feels the same like before. Next step is
doing the website redesign.

See you later!

[hello2025]: /blog/hello-2025/
