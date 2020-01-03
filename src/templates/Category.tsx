import React from "react";
import { graphql } from "gatsby";
import styled from "../utils/styled";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import PostThumbnail from "../components/PostThumbnail";

const PageDesc = styled.h3`
  color: ${props => props.theme.gray.light};
`;

export default function Category({ data }: { data: any }) {
  const categoryTitle = data.wordpressCategory.name;
  const desc = `All Posts Under Category "${categoryTitle}"`;

  return (
    <Layout>
      <SEO title={`Category "${categoryTitle}"`} description={desc} />
      <h1>{categoryTitle}</h1>
      <PageDesc>Show {desc}</PageDesc>

      <main>
        {data.allWordpressPost.edges.map(({ node }: { node: any }) => (
          <PostThumbnail key={node.id} {...node} />
        ))}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    wordpressCategory(id: { eq: $id }) {
      name
    }
    allWordpressPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
      sort: { order: DESC, fields: [date] }
    ) {
      edges {
        node {
          id
          title
          excerpt
          slug
          date
          categories {
            name
            slug
          }
          tags {
            name
            slug
          }
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
