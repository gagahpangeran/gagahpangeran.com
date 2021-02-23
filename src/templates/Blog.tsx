// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { graphql, PageProps } from "gatsby";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";
import { getBlogData, getPostData } from "../utils/data";

export interface BlogPageContext {
  type: "Index" | "Category" | "Tag" | "Language";
  filterValue: string;
  templatePath: string;
  page: number;
  numPages: number;
}

const Blog: React.FC<PageProps<BlogTemplate, BlogPageContext>> = ({
  data,
  pageContext
}) => {
  const { posts, title, desc, pageTitle, pageDesc } = getBlogData(
    pageContext,
    data
  );

  return (
    <Layout>
      <SEO title={title} description={desc} />
      <h1>{pageTitle}</h1>
      <h2>{pageDesc}</h2>

      <main>
        {posts.map(post => (
          <PostCard key={post.id} {...getPostData(post)} />
        ))}
      </main>

      <Pagination
        path={pageContext.templatePath}
        numPages={pageContext.numPages}
        page={pageContext.page}
      />
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogTemplate($skip: Int, $limit: Int, $filterValue: String) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }

    categories: allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }

    tags: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }

    langs: allMarkdownRemark(
      filter: { frontmatter: { lang: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`;
