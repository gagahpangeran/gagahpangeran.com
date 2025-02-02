// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Link from "next/link";
import Image from "next/image";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type PostData } from "@/utils/post";
import PostLabel from "./PostLabel";

const PostCard = ({
  title,
  date,
  datetime,
  description,
  slug,
  image,
  tags,
  lang
}: PostData) => {
  return (
    <article className="post-card">
      <Link href={slug} title={title} className="post-card__header">
        <div className="post-card__thumbnail">
          <Image
            {...image}
            className="post-card__image"
            alt={title}
            title={title}
          />
          <time className="post-card__date" dateTime={datetime}>
            <FontAwesomeIcon icon={faClock} />
            {date}
          </time>
        </div>
        <div className="post-card__meta">
          <h3 className="post-card__title">{title}</h3>
        </div>
      </Link>
      <div className="post-card__info">
        <PostLabel tags={tags} lang={lang} />
        <div className="post-card__summary">{description}</div>
      </div>
    </article>
  );
};

export default PostCard;
