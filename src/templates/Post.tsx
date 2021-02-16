import { graphql, PageProps } from "gatsby";
import React from "react";
import { PostById } from "../../types/generated-types";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import styled from "../utils/styled";

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

  ul,
  ol {
    list-style: disc;
    font-size: 20px;
    margin-left: 20px;

    li {
      margin-bottom: 8px;
    }

    &.dialogue {
      background: ${props => props.theme.background.dark};
      color: ${props => props.theme.green};
      list-style: "> ";
      padding: 8px 16px 8px 24px;
      margin: 0 16px;
      border-radius: 8px;
    }
  }

  .center {
    margin: 20px 0;

    > * {
      margin-left: auto !important;
      margin-right: auto !important;
      min-width: auto !important;
      max-width: 100% !important;
    }
  }
`;

const PostTitle = styled.h1`
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
  color: ${props => props.theme.gray.light};

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }

  svg {
    height: 24px;
    fill: ${props => props.theme.gray.light};

    @media screen and (max-width: 500px) {
      height: 20px;
    }
  }
`;

const PostBody = styled.div`
  h2 {
    color: ${props => props.theme.gray.light};
  }

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
    color: ${props => props.theme.green};
  }

  .wp-block-code {
    max-width: 100%;
    background: ${props => props.theme.background.dark};
    color: ${props => props.theme.gray.light};
    overflow-x: auto;
    padding: 8px;
  }
`;

const Post: React.FC<PageProps<PostById>> = ({ data }) => {
  const { post } = data;
  const title = post?.frontmatter?.title ?? "";
  const description = post?.frontmatter?.description ?? post?.excerpt ?? "";
  const date = post?.frontmatter?.date;
  const html = post?.html ?? "";

  return (
    <Layout>
      <SEO title={title} description={description} />
      <main>
        <PostArticle>
          <PostTitle>{title}</PostTitle>
          <PostDate>
            <ClockIcon />
            {date}
          </PostDate>
          <PostBody dangerouslySetInnerHTML={{ __html: html }} />
        </PostArticle>
      </main>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostById($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
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
