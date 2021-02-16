import { graphql, PageProps } from "gatsby";
import React from "react";
import { PostTemplate } from "../../types/generated-types";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";

const Post: React.FC<PageProps<PostTemplate>> = ({ data }) => {
  const { post, site } = data;
  const title = post?.frontmatter?.title ?? "";
  const description = post?.frontmatter?.description ?? post?.excerpt ?? "";
  const date = post?.frontmatter?.date;
  const html = post?.html ?? "";
  const slug = post?.fields?.slug ?? "";
  const siteUrl = site?.siteMetadata?.siteUrl ?? "";
  const category = post?.frontmatter?.category ?? null;
  const tags = post?.frontmatter?.tags ?? [];

  return (
    <Layout>
      <SEO title={title} description={description} />
      <main>
        <article className="post">
          <h1 className="post__title">{title}</h1>
          <time className="post__date">
            <ClockIcon />
            {date}
          </time>
          <ShareButton link={`${siteUrl}/${slug}`} />
          <div
            className="post__body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </main>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostTemplate($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        category
        tags
      }
    }

    site {
      siteMetadata {
        siteUrl
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
