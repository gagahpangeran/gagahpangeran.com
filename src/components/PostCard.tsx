// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { getPostData } from "../utils/data";
import PostLabel from "./PostLabel";

const PostCard = ({
  title,
  date,
  excerpt,
  slug,
  image,
  categories,
  tags,
  lang
}: ReturnType<typeof getPostData>) => {
  return (
    <article className="post-card">
      <div className="post-card__header">
        <Link to={slug} className="post-card__header__link">
          <Img
            className="post-card__header__link__image"
            fluid={image}
            alt={title}
            title={title}
          />
        </Link>
        <time className="post-card__header__date">
          <FontAwesomeIcon icon={faClock} />
          <span>{date}</span>
        </time>
      </div>
      <div className="post-card__info">
        <h3 className="post-card__info__title">
          <Link to={slug}>{title}</Link>
        </h3>
        <PostLabel categories={categories} tags={tags} lang={lang} />
        <div
          className="post-card__info__summary"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </article>
  );
};

export default PostCard;
