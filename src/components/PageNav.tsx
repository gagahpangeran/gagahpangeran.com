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

// Workaround because `src` props in `StaticImage` can't receive dynamic value
// See : https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#restrictions-on-using-staticimage
const getStaticImage = (isNewer: boolean) => {
  const props = {
    alt: "Page Nav Background",
    className: "page-nav__link__image",
    width: 720
  };

  if (isNewer) {
    return <StaticImage src="../assets/flower.jpg" {...props} />;
  }

  return <StaticImage src="../assets/smoke.jpg" {...props} />;
};

const PageNavLink = ({ type, data, suffix }: NavLinkProps) => {
  if (data === null) {
    return null;
  }

  const { slug, image, title } = data;

  return (
    <Link to={slug} className={`page-nav__link ${type.toLowerCase()}`}>
      {image === undefined ? (
        getStaticImage(type === "Newer")
      ) : (
        <GatsbyImage
          image={image}
          className="page-nav__link__image"
          alt={title}
          title={title}
        />
      )}
      <div className="page-nav__link__title">
        <h5>
          {type === "Newer" && <FontAwesomeIcon icon={faCaretLeft} />}
          <span>{`${type} ${suffix}`}</span>
          {type === "Older" && <FontAwesomeIcon icon={faCaretRight} />}
        </h5>
        <h4>{title}</h4>
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
