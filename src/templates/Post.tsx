import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";
import { PostTemplate } from "../../types/generated-types";
import CategoryTags from "../components/CategoryTags";
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
  const image = post?.frontmatter?.featuredImage?.childImageSharp
    ?.fluid as FluidObject;
  const imageUrl = post?.frontmatter?.featuredImage?.publicURL ?? "";

  return (
    <Layout>
      <SEO title={title} description={description} />
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

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
