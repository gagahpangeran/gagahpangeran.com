// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Link from "next/link";
import kebabCase from "lodash.kebabcase";
import { langMap } from "@/utils/metadata";

interface Props {
  tags: readonly string[];
  lang: string;
}

const PostLabel = ({ tags, lang }: Props) => {
  const language = langMap.get(lang);

  if (language == null) {
    throw new Error("Language is not valid");
  }

  return (
    <div className="post-label">
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/blog/tag/${kebabCase(tag)}/`}
          className="post-label__link post-label__link--tag"
        >
          {tag}
        </Link>
      ))}
      <Link
        href={`/blog/lang/${lang}/`}
        className="post-label__link post-label__link--lang"
      >
        {language}
      </Link>
    </div>
  );
};

export default PostLabel;
