import React from "react";
import { DiscussionEmbed } from "disqus-react";
import styled from "../utils/styled";

const CommentLayout = styled.section`
  margin: 40px 0 20px;

  h3 {
    border-top: 1px solid #000;
    padding: 16px 0;
  }
`;

export default function Comment({
  slug,
  title
}: {
  slug: string;
  title: string;
}) {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME as string,
    config: {
      identifier: slug,
      title,
      url: `https://blog.gagahpangeran.com/${slug}`
    }
  };

  return (
    <CommentLayout>
      <h3>Comments</h3>
      <DiscussionEmbed {...disqusConfig} />
    </CommentLayout>
  );
}
