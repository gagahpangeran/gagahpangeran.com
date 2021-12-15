// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";
import { langMap } from "../utils/data";

interface Props {
  tags: readonly string[];
  lang: string;
}

const PostLabel = ({ tags, lang }: Props) => {
  return (
    <div className="post-label">
      {tags.map(tag => (
        <Link
          key={tag}
          to={`/blog/tag/${kebabCase(tag)}/`}
          className="post-label__link post-label__link--tag"
        >
          {tag}
        </Link>
      ))}
      <Link
        to={`/blog/lang/${lang}/`}
        className="post-label__link post-label__link--lang"
      >
        {langMap.get(lang) ?? "English"}
      </Link>
    </div>
  );
};

export default PostLabel;
