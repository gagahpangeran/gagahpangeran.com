import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import getDate from "../utils/time";

export default ({ data }) => {
  const post = data.wordpressPost;
  const desc = post.excerpt.substring(3, post.excerpt.length - 4);

  return (
    <Layout>
      <SEO title={post.title} description={desc} />
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <h3>{getDate(post.date)}</h3>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
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
    }
  }
`;
