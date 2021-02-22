import { graphql, PageProps } from "gatsby";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";
import { getBlogData, getPostData } from "../utils/data";

export interface BlogPageContext {
  type: "Index" | "Category" | "Tag";
  filterValue: string;
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
      filter: { frontmatter: { category: { eq: $filterValue } } }
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
  }
`;
