// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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
      <Link to={slug} title={title} className="post-card__header">
        <div className="post-card__header__thumbnail">
          <GatsbyImage
            image={image}
            className="post-card__header__thumbnail__image"
            alt={title}
            title={title}
          />
        </div>
        <div className="post-card__header__meta">
          <time className="post-card__header__meta__date">
            <FontAwesomeIcon icon={faClock} />
            <span>{date}</span>
          </time>
          <h3 className="post-card__header__meta__title">{title}</h3>
        </div>
      </Link>
      <div className="post-card__info">
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
