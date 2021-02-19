import { graphql, PageProps } from "gatsby";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";
import { getPostData } from "../utils/helper";

const Blog: React.FC<PageProps<BlogTemplate>> = ({ data }) => {
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
  query BlogTemplate($skip: Int, $limit: Int) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }
  }

  fragment PostDetail on MarkdownRemark {
    id
    excerpt(pruneLength: 160)
    html
    fields {
      slug
    }
    frontmatter {
      title
      description
      date(formatString: "MMMM DD, YYYY")
      category
      tags
      featuredImage {
        publicURL
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
