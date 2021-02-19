import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, PageProps } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { PostDetail, PostTemplate } from "../../types/generated-types";
import CategoryTags from "../components/CategoryTags";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ShareButton from "../components/ShareButton";
import { getPostData } from "../utils/helper";

const Post: React.FC<PageProps<PostTemplate>> = ({ data }) => {
  const { post, site } = data;
  const siteUrl = site?.siteMetadata?.siteUrl ?? "";
  const {
    title,
    excerpt,
    date,
    category,
    tags,
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
          <CategoryTags category={category} tags={tags} />
          <ShareButton link={`${siteUrl}${slug}`} />
          <a href={imageUrl} target="_blank" rel="noopener">
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
      category
      tags
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
