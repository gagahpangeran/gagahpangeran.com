import React from "react";
import { graphql } from "gatsby";
import styled from "../utils/styled";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import PostThumbnail from "../components/PostThumbnail";

const PageDesc = styled.h3`
  color: ${props => props.theme.gray.light};
`;

const IndexPage = ({ data }: { data: any }) => (
  <Layout>
    <SEO title="Blog" />
    <h1>Gagah Pangeran Rosfatiputra</h1>
    <PageDesc>Part Time Student, Full Time Learner</PageDesc>

    <main>
      {data.allWordpressPost.edges.map(({ node }: { node: any }) => (
        <PostThumbnail key={node.id} {...node} />
      ))}
    </main>
  </Layout>
);

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      totalCount
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

export default IndexPage;
