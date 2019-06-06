import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import PostThumbnail from "../components/post-thumbnail";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Blog" />
    <h1>Gagah Pangeran Rosfatiputra</h1>
    <h3>Part Time Student, Full Time Learner</h3>

    <main>
      {data.allWordpressPost.edges.map(({ node }) => (
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
