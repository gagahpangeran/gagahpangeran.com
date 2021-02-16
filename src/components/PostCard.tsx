import { Link } from "gatsby";
import React from "react";

interface Props {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

const PostCard = ({ title, date, excerpt, slug }: Props) => {
  return (
    <section className="post-card">
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
