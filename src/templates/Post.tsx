import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";
import Comment from "../components/Comment";
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
    line-height: 150%;

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

const PostCatTag = styled.div`
  font-size: 20px;
  margin-top: 12px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const PostBody = styled.div`
  .aligncenter {
    text-align: center;
  }

  .vglnk {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: inherit;
  }

  .red-text {
    color: red;
  }

  .wp-block-code {
    max-width: 100%;
    background: #ccc;
    overflow-x: auto;
    padding: 8px;
  }
`;

const CatTag = styled(Link)`
  color: #fff;
  padding: 4px 12px;
  margin-right: 12px;
  border-radius: 4px;
  transition: background 0.2s ease-in-out;
  display: inline-block;
  margin-bottom: 12px;

  &:hover {
    color: #fff;
    text-decoration: none;
  }

  &.cat {
    background: #b10004;

    &:hover,
    &:active {
      background: #e60d12;
    }
  }

  &.tag {
    background: #f95600;

    &:hover,
    &:active {
      background: #f98d00;
    }
  }

  @media screen and (max-width: 500px) {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

interface CategoryTag {
  name: string;
  slug: string;
}

const getCatTag = (categories: CategoryTag[], tags: CategoryTag[]) => {
  return categories
    .map(category => (
      <CatTag
        key={category.name}
        className="cat"
        to={`/category/${category.slug}/`}
      >
        {category.name}
      </CatTag>
    ))
    .concat(
      tags.map(tag => (
        <CatTag key={tag.name} className="tag" to={`/tag/${tag.slug}/`}>
          {tag.name}
        </CatTag>
      ))
    );
};

export default function Post(props: any) {
  const post = props.data.wordpressPost;
  const desc = post.excerpt.substring(3, post.excerpt.length - 5);
  const image = post.featured_media.localFile.childImageSharp;

  return (
    <Layout>
      <SEO title={post.title} description={desc} thumbnail={image.fluid.src} />
      <main>
        <PostArticle>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>
            <ClockIcon />
            {getDate(post.date)}
          </PostDate>
          <PostCatTag>{getCatTag(post.categories, post.tags)}</PostCatTag>
          <ShareButton
            url={props.location.href}
            title={post.title}
            via="gagahpangeran_"
            quote={desc}
            hashtags={[...post.categories, ...post.tags].map(data => data.name)}
            size={48}
          />
          <PostHeader {...image} />
          <PostBody dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostArticle>
        <Comment title={post.title} slug={post.slug} />
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      date
      excerpt
      content
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
