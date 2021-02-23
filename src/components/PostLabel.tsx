// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";

interface Props {
  categories: string[];
  tags: string[];
  lang: string;
}

const langMap = new Map([
  ["id", "Bahasa Indonesia"],
  ["en", "English"]
]);

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
          to={`/${type}/${kebabCase(item)}`}
          className={`post-label__link ${type}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default PostLabel;
