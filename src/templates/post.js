import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SEO from "../components/seo";
import getDate from "../utils/time";

const PostArticle = styled.article`
  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
  }

  p {
    font-size: 20px;
    margin: 16px 0;

    @media screen and (max-width: 500px) {
      font-size: 18px;
      margin: 12px 0;
    }
  }

  figure {
    margin: 20px 0;

    @media screen and (max-width: 500px) {
      margin: 16px 0;
    }
  }

  figcaption {
    font-weight: bold;
    color: #555;
  }
`;

const PostTitle = styled.h1`
  color: #0177b0;
  margin-bottom: 12px;

  @media screen and (max-width: 500px) {
    margin-bottom: 4px;
  }
`;

const PostDate = styled.time`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }

  svg {
    height: 24px;

    @media screen and (max-width: 500px) {
      height: 20px;
    }
  }
`;

const PostHeader = styled(Img)`
  margin: 20px 0;

  @media screen and (max-width: 500px) {
    margin: 12px 0;
  }
`;

export default ({ data }) => {
  const post = data.wordpressPost;
  const desc = post.excerpt.substring(3, post.excerpt.length - 4);

  return (
    <Layout>
      <SEO title={post.title} description={desc} thumbnail={post.image} />
      <main>
        <PostArticle>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>
            <ClockIcon />
            {getDate(post.date)}
          </PostDate>
          <PostHeader {...post.featured_media.localFile.childImageSharp} />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostArticle>
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      date
      excerpt
      content
      image
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
`;

const ClockIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24pt"
      height="24pt"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <g id="surface1">
        <path d="M 12 0.375 C 5.578125 0.375 0.375 5.578125 0.375 12 C 0.375 18.421875 5.578125 23.625 12 23.625 C 18.421875 23.625 23.625 18.421875 23.625 12 C 23.625 5.578125 18.421875 0.375 12 0.375 Z M 14.675781 16.785156 L 10.542969 13.78125 C 10.398438 13.671875 10.3125 13.503906 10.3125 13.328125 L 10.3125 5.4375 C 10.3125 5.128906 10.566406 4.875 10.875 4.875 L 13.125 4.875 C 13.433594 4.875 13.6875 5.128906 13.6875 5.4375 L 13.6875 11.890625 L 16.664062 14.058594 C 16.917969 14.242188 16.96875 14.59375 16.785156 14.84375 L 15.464844 16.664062 C 15.28125 16.914062 14.929688 16.96875 14.675781 16.785156 Z M 14.675781 16.785156 " />
      </g>
    </svg>
  );
};
