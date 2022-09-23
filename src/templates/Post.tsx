// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, HeadProps, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import PostLabel from "../components/PostLabel";
import Layout from "../components/Layout";
import PageNav from "../components/PageNav";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";
import { getPostData } from "../utils/data";

const Post: React.FC<PageProps<Queries.PostTemplateQuery>> = ({ data }) => {
  const siteUrl = data.site?.siteMetadata.siteUrl;
  const { title, date, tags, lang, slug, imageUrl, image, html } = getPostData(
    data.post
  );

  if (siteUrl == null) {
    throw Error("siteUrl not found");
  }

  if (image == null) {
    throw Error(`Image of post '${title}' not found`);
  }

  const newerPost = data.newerPost ? getPostData(data.newerPost) : null;
  const olderPost = data.olderPost ? getPostData(data.olderPost) : null;

  return (
    <Layout mainTitle={title}>
      <article className="post">
        <time className="post__date">
          <FontAwesomeIcon icon={faClock} />
          {date}
        </time>
        <PostLabel tags={tags} lang={lang} />
        <ShareButton link={`${siteUrl}${slug}`} />
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <GatsbyImage
            class="post__featured-image"
            image={image}
            alt={title}
            title={title}
          />
        </a>
        <main className="html" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <PageNav newerData={newerPost} olderData={olderPost} suffix="Post" />
    </Layout>
  );
};

export const Head: React.FC<HeadProps<Queries.PostTemplateQuery>> = ({
  data
}) => {
  const { title, description, imageUrl } = getPostData(data.post);
  return <SEO title={title} description={description} thumbnail={imageUrl} />;
};

export default Post;

export const pageQuery = graphql`
  query PostTemplate($id: String!, $newerId: String, $olderId: String) {
    post: markdownRemark(id: { eq: $id }) {
      ...PostDetail
    }
    newerPost: markdownRemark(id: { eq: $newerId }) {
      ...PostDetail
    }
    olderPost: markdownRemark(id: { eq: $olderId }) {
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
    html
    fields {
      slug
    }
    excerpt
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      tags
      lang
      featuredImage {
        publicURL
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  }
`;
