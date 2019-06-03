import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

export default ({ data }) => {
  const post = data.wordpressPost;
  return (
    <Layout>
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <h3>date: {post.date}</h3>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      date(formatString: "DD MMMM YYYY")
      content
    }
  }
`;
