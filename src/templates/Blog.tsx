import { graphql, PageProps } from "gatsby";
import { FluidObject } from "gatsby-image";
import React from "react";
import { BlogTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";

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
        {posts.map(post => {
          const id = post.id;
          const title = post.frontmatter?.title ?? "";
          const date = post.frontmatter?.date ?? "";
          const excerpt = post.frontmatter?.description ?? post.excerpt ?? "";
          const slug = post.fields?.slug ?? "";
          const category = post.frontmatter?.category ?? null;
          const tags = post.frontmatter?.tags ?? [];
          const image = post.frontmatter?.featuredImage?.childImageSharp
            ?.fluid as FluidObject;

          return (
            <PostCard
              key={id}
              title={title}
              date={date}
              excerpt={excerpt}
              slug={slug}
              image={image}
              category={category}
              tags={tags}
            />
          );
        })}
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
      ...postDetail
    }

    categories: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...postDetail
    }

    tags: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...postDetail
    }
  }

  fragment postDetail on MarkdownRemarkConnection {
    nodes {
      id
      excerpt(pruneLength: 160)
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
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
