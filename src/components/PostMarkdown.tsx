// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import path from "path";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getImageData } from "@/utils/post";

interface Props {
  children: string | null | undefined;
  slug: string;
}

export default function PostMarkdown({ children, slug }: Props) {
  const markdownComponent: Partial<Components> = {
    img(props) {
      const image = getImageData(path.join(slug, props.src ?? ""));
      return (
        <figure>
          <a href={image.src} target="_blank" rel="noopener noreferrer">
            <Image {...image} alt={props.alt ?? ""} title={props.title} />
          </a>
          <figcaption>{props.title}</figcaption>
        </figure>
      );
    },
    h2(props) {
      return (
        <h2 id={props.id}>
          {String(props.children)}
          <a href={`#${props.id}`} className="markdown__header-link">
            <FontAwesomeIcon icon={faLink} />
          </a>
        </h2>
      );
    },
    h3(props) {
      return (
        <h3 id={props.id}>
          {String(props.children)}
          <a href={`#${props.id}`} className="markdown__header-link">
            <FontAwesomeIcon icon={faLink} />
          </a>
        </h3>
      );
    }
  };

  return (
    <ReactMarkdown
      className="markdown"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeUnwrapImages,
        rehypeSlug,
        [rehypeKatex, { strict: "ignore" }]
      ]}
      components={markdownComponent}
    >
      {children}
    </ReactMarkdown>
  );
}
