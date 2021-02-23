// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { PostDetail, PostTemplate } from "../../types/generated-types";
import PostLabel from "../components/PostLabel";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";
import { getPostData } from "../utils/data";

const Post: React.FC<PageProps<PostTemplate>> = ({ data }) => {
  const { post, site } = data;
  const siteUrl = site?.siteMetadata?.siteUrl ?? "";
  const {
    title,
    excerpt,
    date,
    categories,
    tags,
    lang,
    slug,
    imageUrl,
    image,
    html
  } = getPostData(post as PostDetail);

  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <main>
        <article className="post">
          <h1 className="post__title">{title}</h1>
          <time className="post__date">
            <FontAwesomeIcon icon={faClock} />
            <span>{date}</span>
          </time>
          <PostLabel categories={categories} tags={tags} lang={lang} />
          <ShareButton link={`${siteUrl}${slug}`} />
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <Img fluid={image} alt={title} title={title} />
          </a>
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
      ...PostDetail
    }

    site {
      siteMetadata {
        siteUrl
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
      categories
      tags
      lang
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
