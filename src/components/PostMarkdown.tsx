// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import path from "path";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getFileUrl, getImageData } from "@/utils/post";

interface Props {
  children: string | null | undefined;
  slug: string;
}

export default function PostMarkdown({ children, slug }: Props) {
  const markdownComponents: Components = {
    a(props) {
      const url = props.href ?? "";

      if (url.startsWith("/")) {
        return (
          <Link {...props} href={url}>
            {props.children}
          </Link>
        );
      }

      if (url.startsWith("./")) {
        const href = getFileUrl(path.join("blog", slug, url));
        return (
          <a {...props} href={href}>
            {props.children}
          </a>
        );
      }

      if (url.startsWith("http")) {
        <a
          {...props}
          href={url}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {props.children}
        </a>;
      }

      return (
        <a {...props} href={url}>
          {props.children}
        </a>
      );
    },
    img(props) {
      const image = getImageData(path.join(slug, props.src ?? ""));
      return (
        <figure>
          <a href={image.src} target="_blank" rel="noopener noreferrer">
            <Image
              {...props}
              {...image}
              alt={props.alt ?? ""}
              title={props.title}
            />
          </a>
          <figcaption>{props.title}</figcaption>
        </figure>
      );
    },
    source(props) {
      const src = getFileUrl(path.join("blog", slug, props.src ?? ""));
      return <source {...props} src={src} type={props.type} />;
    },
    h2(props) {
      return (
        <h2 {...props} id={props.id}>
          {String(props.children)}
          <a href={`#${props.id}`} className="markdown__header-link">
            <FontAwesomeIcon icon={faLink} />
          </a>
        </h2>
      );
    },
    h3(props) {
      return (
        <h3 {...props} id={props.id}>
          {String(props.children)}
          <a href={`#${props.id}`} className="markdown__header-link">
            <FontAwesomeIcon icon={faLink} />
          </a>
        </h3>
      );
    },
    code(props) {
      const { children, className, ...rest } = props;
      const match = /language-(\w+)/.exec(className ?? "");
      if (match) {
        const language = match[1];

        return (
          // @ts-expect-error TODO: fix this type error
          <SyntaxHighlighter
            {...rest}
            language={language}
            style={{}}
            className={`language-${language}`}
            useInlineStyles={false}
          >
            {String(children)}
          </SyntaxHighlighter>
        );
      }

      return (
        <code {...props} className={`language-text`}>
          {children}
        </code>
      );
    }
  };

  return (
    <ReactMarkdown
      className="markdown"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        rehypeUnwrapImages,
        rehypeSlug,
        [rehypeKatex, { strict: "ignore" }]
      ]}
      components={markdownComponents}
    >
      {children}
    </ReactMarkdown>
  );
}
