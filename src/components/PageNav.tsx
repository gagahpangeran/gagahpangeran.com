// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage
} from "gatsby-plugin-image";
import React from "react";
import classModifiers from "../utils/css";

interface NavData {
  slug: string;
  title: string;
  image?: IGatsbyImageData;
}
interface NavLinkProps {
  type: "Newer" | "Older";
  data: NavData | null;
  suffix: string;
}

const PageNavLink = ({ type, data, suffix }: NavLinkProps) => {
  if (data === null) {
    return null;
  }

  const { slug, image, title } = data;

  return (
    <Link
      to={slug}
      className={classModifiers("page-nav__link", type.toLowerCase())}
    >
      {image !== undefined && (
        <GatsbyImage
          image={image}
          className="page-nav__image"
          alt={title}
          title={title}
        />
      )}
      <div className="page-nav__title">
        <h5 className="page-nav__title-item page-nav__title-item--small">
          {type === "Newer" && <FontAwesomeIcon icon={faCaretLeft} />}
          {`${type} ${suffix}`}
          {type === "Older" && <FontAwesomeIcon icon={faCaretRight} />}
        </h5>
        <h4 className="page-nav__title-item page-nav__title-item--main">
          {title}
        </h4>
      </div>
    </Link>
  );
};

interface Props {
  newerData: NavData | null;
  olderData: NavData | null;
  suffix: string;
}

const PageNav = ({ newerData, olderData, suffix }: Props) => {
  return (
    <nav className="page-nav">
      <PageNavLink type="Newer" data={newerData} suffix={suffix} />
      <PageNavLink type="Older" data={olderData} suffix={suffix} />
    </nav>
  );
};

export default PageNav;
