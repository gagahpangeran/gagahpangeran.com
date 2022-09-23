// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { graphql, HeadProps, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import SEO from "../components/SEO";
import {
  BlogPageContext,
  getBlogMetaData,
  getPostData,
  postKeyMap
} from "../utils/data";

const Blog: React.FC<PageProps<Queries.BlogTemplateQuery, BlogPageContext>> = ({
  data,
  pageContext
}) => {
  const { pageTitle, pageDesc } = getBlogMetaData(pageContext);
  const posts = data[postKeyMap[pageContext.type]].nodes;

  return (
    <Layout mainTitle={pageTitle} subTitle={pageDesc}>
      {posts.map(post => (
        <PostCard key={post.id} {...getPostData(post)} />
      ))}

      <Pagination
        path={pageContext.basePath}
        numPages={pageContext.numPages}
        page={pageContext.page}
      />
    </Layout>
  );
};

export const Head: React.FC<
  HeadProps<Queries.BlogTemplateQuery, BlogPageContext>
> = ({ pageContext }) => {
  const { title, desc } = getBlogMetaData(pageContext);
  return <SEO title={title} description={desc} />;
};

export default Blog;

export const pageQuery = graphql`
  query BlogTemplate($skip: Int, $limit: Int, $filterValue: String) {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
      filter: { fields: { type: { eq: "blog" } } }
    ) {
      nodes {
        ...PostDetail
      }
    }

    tags: allMarkdownRemark(
      filter: { frontmatter: { tags: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }

    langs: allMarkdownRemark(
      filter: { frontmatter: { lang: { eq: $filterValue } } }
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...PostDetail
      }
    }
  }
`;
