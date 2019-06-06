import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import Img from "gatsby-image";

import getDate from "../utils/time";

const PostSection = styled.section`
  background: #f4f4f4;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 500px) {
    padding: 12px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: 500px) {
    align-items: center;
  }
`;

const PostImg = styled(Img)`
  object-fit: cover;
  border-radius: 16px;
  width: 150px;
  height: 150px;

  @media screen and (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
`;

const PostContent = styled.div`
  margin-left: 20px;

  @media screen and (max-width: 500px) {
    margin-left: 12px;
  }
`;

const PostTitle = styled.h4`
  line-height: 100%;
  margin: -4px 0 8px;

  @media screen and (max-width: 500px) {
    margin-top: 0;
  }
`;

const PostDate = styled.time`
  font-weight: bold;
  margin: 4px 0;
  display: block;

  @media screen and (max-width: 500px) {
    font-size: 14px;
    margin: 0;
  }
`;

const PostSummary = styled.div`
  font-size: 18px;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const PostSummaryMobile = styled.div`
  margin-top: 4px;

  @media screen and (min-width: 501px) {
    display: none;
  }
`;

const PostCatTag = styled.div`
  margin: 4px 0;
  font-size: 18px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }

  a {
    margin-right: 4px;
  }
`;

const getCatTag = (categories, tags) => {
  return categories
    .map(category => (
      <Link to={`/category/${category.slug}/`}>#{category.name}</Link>
    ))
    .concat(tags.map(tag => <Link to={`/tag/${tag.slug}/`}>#{tag.name}</Link>));
};

export default function PostThumbnail({
  title,
  slug,
  date,
  excerpt,
  categories,
  tags,
  featured_media,
}) {
  return (
    <PostSection>
      <PostHeader>
        <Link to={`${slug}/`}>
          <PostImg {...featured_media.localFile.childImageSharp} />
        </Link>
        <PostContent>
          <Link to={`${slug}/`}>
            <PostTitle>{title}</PostTitle>
          </Link>
          <PostDate>{getDate(date)}</PostDate>
          <PostSummary dangerouslySetInnerHTML={{ __html: excerpt }} />
          <PostCatTag>{getCatTag(categories, tags)}</PostCatTag>
        </PostContent>
      </PostHeader>
      <PostSummaryMobile dangerouslySetInnerHTML={{ __html: excerpt }} />
    </PostSection>
  );
}
