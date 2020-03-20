import React from "react";
import { graphql } from "gatsby";
import styled from "../utils/styled";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import PostThumbnail from "../components/PostThumbnail";

const PageDesc = styled.h3`
  color: ${props => props.theme.gray.light};
`;

const resolveData = (data: any, type: string) => {
  switch (type) {
    case "Blog":
      return {
        pageTitle: "Gagah Pangeran Rosfatiputra",
        pageDesc: "Part Time Student, Full Time Learner",
        title: "Blog",
        desc: "Part Time Student, Full Time Learner",
        post: data.allPost.edges
      };
    case "Category":
      return {
        pageTitle: data.wordpressCategory.name,
        pageDesc: `Show All Posts Under Category "${data.wordpressCategory.name}"`,
        title: `Category "${data.wordpressCategory.name}"`,
        desc: `All Posts Under Category "${data.wordpressCategory.name}"`,
        post: data.allCategoryPost.edges
      };
    case "Tag":
      return {
        pageTitle: data.wordpressTag.name,
        pageDesc: `Show All Posts Under Tag "${data.wordpressTag.name}"`,
        title: `Tag "${data.wordpressTag.name}"`,
        desc: `All Posts Under Tag "${data.wordpressTag.name}"`,
        post: data.allTagPost.edges
      };
    default:
      return data;
  }
};

export default function Blog({
  data,
  pageContext
}: {
  data: any;
  pageContext: any;
}) {
  const { title, desc, post, pageTitle, pageDesc } = resolveData(
    data,
    pageContext.type
  );

  console.log(pageContext);

  return (
    <Layout>
      <SEO title={title} description={desc} />
      <h1>{pageTitle}</h1>
      <PageDesc>{pageDesc}</PageDesc>

      <main>
        {post.map(({ node }: { node: any }) => (
          <PostThumbnail key={node.id} {...node} />
        ))}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!, $skip: Int!, $limit: Int!) {
    wordpressCategory(id: { eq: $id }) {
      name
    }

    wordpressTag(id: { eq: $id }) {
      name
    }

    allPost: allWordpressPost(
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      ...postDetail
    }

    allCategoryPost: allWordpressPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
      sort: { order: DESC, fields: [date] }
      limit: $limit
      skip: $skip
    ) {
      ...postDetail
    }

    allTagPost: allWordpressPost(
      filter: { tags: { elemMatch: { id: { eq: $id } } } }
      sort: { order: DESC, fields: [date] }
      limit: $limit
      skip: $skip
    ) {
      ...postDetail
    }
  }

  fragment postDetail on wordpress__POSTConnection {
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
`;
