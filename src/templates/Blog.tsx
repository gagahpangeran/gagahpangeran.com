import { graphql, PageProps } from "gatsby";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostThumbnail from "../components/PostThumbnail.old";
import SEO from "../components/SEO";

const Blog: React.FC<PageProps<BlogTemplate>> = ({ data }) => {
  const posts = data.posts.nodes;

  return (
    <Layout>
      <SEO title="Blog" description="Part Time Student, Full Time Learner" />
      <h1>GPR's Blog</h1>
      <h2>Part Time Student, Full Time Learner.</h2>

      <main>
        {posts.map(post => {
          const title = post.frontmatter?.title ?? "";
          const date = post.frontmatter?.date ?? "";
          const excerpt = post.frontmatter?.description ?? post.excerpt ?? "";
          const slug = post.fields?.slug ?? "";

          return (
            <PostCard title={title} date={date} excerpt={excerpt} slug={slug} />
          );
        })}
      </main>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogTemplate($skip: Int, $limit: Int) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          title
          description
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
