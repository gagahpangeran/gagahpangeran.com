// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Image from "next/image";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostLabel from "@/components/PostLabel";
import ShareButton from "@/components/ShareButton";
import PageNav from "@/components/PageNav";
import PostMarkdown from "@/components/PostMarkdown";
import { getOlderNewerPost, type PostData } from "@/utils/post";
import Page from "./Page";

interface Props {
  post: PostData;
}

export default function Post({ post }: Props) {
  const { title, date, datetime, tags, lang, image, content, slug } = post;
  const otherPost = getOlderNewerPost(slug);

  return (
    <Page mainTitle={title}>
      <article className="post">
        <time className="post__date" dateTime={datetime}>
          <FontAwesomeIcon icon={faClock} />
          {date}
        </time>
        <PostLabel tags={tags} lang={lang} />
        <ShareButton title={title} />
        <a href={image.src} target="_blank" rel="noopener noreferrer">
          <Image
            {...image}
            className="post__featured-image"
            alt={title}
            title={title}
          />
        </a>
        <PostMarkdown slug={slug}>{content}</PostMarkdown>
      </article>

      {otherPost && (
        <PageNav
          newerData={otherPost.newerPost}
          olderData={otherPost.olderPost}
        />
      )}
    </Page>
  );
}
