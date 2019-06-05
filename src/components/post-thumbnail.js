import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const PostSection = styled.section`
  background: #f4f4f4;
  display: flex;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
  align-items: flex-start;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }
`;

const PostImg = styled.img`
  border-radius: 16px;
`;

const PostContent = styled.div`
  margin-left: 20px;
`;

const PostTitle = styled.h4`
  line-height: 100%;
  margin: -4px 0 8px;
`;

const PostDate = styled.time`
  font-weight: bold;
  margin: 4px 0;
  display: block;
`;

export default function PostThumbnail({
  title,
  slug,
  date,
  excerpt,
  thumbnail,
}) {
  return (
    <PostSection>
      <Link to={`${slug}/`}>
        <PostImg src={thumbnail} alt={title} />
      </Link>
      <PostContent>
        <Link to={`${slug}/`}>
          <PostTitle>{title}</PostTitle>
        </Link>
        <PostDate>{date}</PostDate>
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      </PostContent>
    </PostSection>
  );
}
