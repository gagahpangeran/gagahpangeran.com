import React from "react";
import styled from "../utils/styled";
import { Link } from "gatsby";
import Img from "gatsby-image";

import getDate from "../utils/time";

const PostSection = styled.section`
  background: ${props => props.theme.background.dark};
  padding: 32px;
  border-radius: 20px;
  margin: 20px 0;

  @media screen and (max-width: 500px) {
    padding: 12px;
    margin: 20px -8px;
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
  margin-bottom: 12px;

  a {
    color: ${props => props.theme.purple};
  }

  @media screen and (max-width: 500px) {
    margin-top: 0;
  }
`;

const PostDate = styled.time`
  font-weight: bold;
  margin: 8px 0;
  display: block;
  color: ${props => props.theme.gray.light};

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
  margin: 8px 0;
  font-size: 18px;

  @media screen and (max-width: 500px) {
    display: none;
  }

  a {
    margin-right: 8px;
    display: inline-block;
    color: ${props => props.theme.green};
  }
`;

const PostCatTagMobile = styled.div`
  margin-top: 4px;
  font-size: 16px;

  @media screen and (min-width: 501px) {
    display: none;
  }

  a {
    margin-right: 8px;
    display: inline-block;
  }
`;

interface CategoryTag {
  name: string;
  slug: string;
}

interface Props {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  categories: CategoryTag[];
  tags: CategoryTag[];
  featured_media: any;
}

const getCatTag = (categories: CategoryTag[], tags: CategoryTag[]) => {
  return categories
    .map(category => (
      <Link key={category.name} to={`/category/${category.slug}/`}>
        #{category.name}
      </Link>
    ))
    .concat(
      tags.map(tag => (
        <Link key={tag.name} to={`/tag/${tag.slug}/`}>
          #{tag.name}
        </Link>
      ))
    );
};

export default function PostThumbnail({
  title,
  slug,
  date,
  excerpt,
  categories,
  tags,
  featured_media,
}: Props) {
  return (
    <PostSection>
      <PostHeader>
        <Link to={`${slug}/`}>
          <PostImg {...featured_media.localFile.childImageSharp} />
        </Link>
        <PostContent>
          <PostTitle>
            <Link to={`${slug}/`}>{title}</Link>
          </PostTitle>
          <PostDate>{getDate(date)}</PostDate>
          <PostSummary dangerouslySetInnerHTML={{ __html: excerpt }} />
          <PostCatTag>{getCatTag(categories, tags)}</PostCatTag>
        </PostContent>
      </PostHeader>
      <PostCatTagMobile>{getCatTag(categories, tags)}</PostCatTagMobile>
      <PostSummaryMobile dangerouslySetInnerHTML={{ __html: excerpt }} />
    </PostSection>
  );
}
