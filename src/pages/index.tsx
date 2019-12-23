import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import PostThumbnail from "../components/PostThumbnail";

const PageTitle = styled.h1`
  color: #b10004;
`;

const PageDesc = styled.h3`
  color: #f95600;
`;

const IndexPage = ({ data }: { data: any }) => (
  <Layout>
    <SEO title="Blog" />
    <PageTitle>Gagah Pangeran Rosfatiputra</PageTitle>
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
