import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React from "react";

interface Props {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  image: FluidObject;
}

const PostCard = ({ title, date, excerpt, slug, image }: Props) => {
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
        <time className="post-card__info__date">{date}</time>
        <div
          className="post-card__info__summary"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </section>
  );
};

export default PostCard;
