import { graphql, PageProps } from "gatsby";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";
import { getPostData } from "../utils/helper";

interface PageContext {
  type: "Index" | "Category" | "Tags";
  filterValue: string | null;
}

const Blog: React.FC<PageProps<BlogTemplate, PageContext>> = ({
  data,
  pageContext
}) => {
  const posts = data.posts.nodes;

  return (
    <Layout>
      <SEO title="Blog" description="Part Time Student, Full Time Learner" />
      <h1>GPR's Blog</h1>
      <h2>Part Time Student, Full Time Learner.</h2>

      <main>
        {posts.map(post => (
          <PostCard {...getPostData(post)} />
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
    ) {
      nodes {
        ...PostDetail
      }
    }

    tags: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`;
