import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { getPostData } from "../utils/data";
import CategoryTags from "./CategoryTags";

const PostCard = ({
  title,
  date,
  excerpt,
  slug,
  image,
  category,
  tags
}: ReturnType<typeof getPostData>) => {
  return (
    <section className="post-card">
      <div className="post-card__thumbnail">
        <Link to={slug}>
          <Img
            className="post-card__thumbnail__image"
            fluid={image}
            alt={title}
            title={title}
          />
        </Link>
      </div>
      <div className="post-card__info">
        <h4 className="post-card__info__title">
          <Link to={slug}>{title}</Link>
        </h4>
        <time className="post-card__info__date">
          <FontAwesomeIcon icon={faClock} />
          <span>{date}</span>
        </time>
        <CategoryTags category={category} tags={tags} />
        <div
          className="post-card__info__summary"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </section>
  );
};

export default PostCard;
