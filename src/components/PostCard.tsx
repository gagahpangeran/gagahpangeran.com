// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
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
  description,
  slug,
  image,
  categories,
  tags,
  lang
}: ReturnType<typeof getPostData>) => {
  return (
    <article className="post-card">
      <Link to={slug} title={title} className="post-card__header">
        <div className="post-card__thumbnail">
          <GatsbyImage
            image={image}
            className="post-card__image"
            alt={title}
            title={title}
          />
        </div>
        <div className="post-card__meta">
          <time className="post-card__date">
            <FontAwesomeIcon icon={faClock} />
            {date}
          </time>
          <h3 className="post-card__title">{title}</h3>
        </div>
      </Link>
      <div className="post-card__info">
        <PostLabel categories={categories} tags={tags} lang={lang} />
        <div
          className="post-card__summary"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </article>
  );
};

export default PostCard;
