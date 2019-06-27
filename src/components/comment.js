import React from "react";
import { DiscussionEmbed } from "disqus-react";
import styled from "@emotion/styled";

const CommentLayout = styled.section`
  margin: 40px 0 20px;

  h3 {
    border-top: 1px solid #000;
    padding: 16px 0;
  }
`;

const disqusConfig = (slug, title) => {
  return {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  };
};

export default function Comment({ slug, title }) {
  return (
    <CommentLayout>
      <h3>Comments</h3>
      <DiscussionEmbed {...disqusConfig(slug, title)} />
    </CommentLayout>
  );
}
