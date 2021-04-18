// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import { langMap } from "../utils/data";

interface Props {
  categories: readonly string[];
  tags: readonly string[];
  lang: string;
}

const PostLabel = ({ categories, tags, lang }: Props) => {
  const list = categories
    .map(item => ({
      type: "category",
      item
    }))
    .concat(
      tags.map(tag => ({
        type: "tag",
        item: tag
      }))
    );

  return (
    <div className="post-label">
      {list.map(({ type, item }) => (
        <Link
          key={`${type}-${kebabCase(item)}`}
          to={`/blog/${type}/${kebabCase(item)}/`}
          className={`post-label__link ${type}`}
        >
          {item}
        </Link>
      ))}
      <Link to={`/lang/${lang}/`} className={`post-label__link lang`}>
        {langMap.get(lang) ?? "English"}
      </Link>
    </div>
  );
};

export default PostLabel;
