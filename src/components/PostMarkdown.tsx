// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import path from "path";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getImageData } from "@/utils/post";
import rehypeUnwrapImages from "rehype-unwrap-images";

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
    }
  };

  return (
    <ReactMarkdown
      className="markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeUnwrapImages]}
      components={markdownComponent}
    >
      {children}
    </ReactMarkdown>
  );
}
