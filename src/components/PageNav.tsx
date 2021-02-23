// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { getPostData } from "../utils/data";

type PostData = ReturnType<typeof getPostData> | null;

interface NavLinkProps {
  type: "newer" | "older";
  data: PostData;
}

const PageNavLink = ({ type, data }: NavLinkProps) => {
  if (data === null) {
    return (
      <a className="page-nav__link inactive">
        <h5>{`No ${type} post`}</h5>
      </a>
    );
  }

  const { slug, image, title } = data;

  return (
    <Link to={slug} className="page-nav__link">
      <Img
        className="page-nav__link__image"
        fluid={image}
        alt={title}
        title={title}
      />
      <div className="page-nav__link__title">
        <span>{`${type} post`}</span>
        <h5>{title}</h5>
      </div>
    </Link>
  );
};

interface Props {
  newerPost: PostData;
  olderPost: PostData;
}

const PageNav = ({ newerPost, olderPost }: Props) => {
  return (
    <div className="page-nav">
      <PageNavLink type="newer" data={newerPost} />
      <PageNavLink type="older" data={olderPost} />
    </div>
  );
};

export default PageNav;
