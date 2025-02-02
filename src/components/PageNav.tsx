// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import Link from "next/link";
import Image from "next/image";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ImageData } from "@/utils/post";
import classModifiers from "@/utils/css";

type SizeType = "big" | "small";

interface Props {
  newerData: NavData | null;
  olderData: NavData | null;
  suffix?: string;
  size?: SizeType;
}

interface NavData {
  slug: string;
  title: string;
  image: ImageData;
}
interface NavLinkProps {
  type: "Newer" | "Older";
  data: NavData | null;
  suffix: string;
  size: SizeType;
}

const PageNavLink = ({ type, data, suffix, size }: NavLinkProps) => {
  if (data === null) {
    return null;
  }

  const { slug, image, title } = data;

  return (
    <Link
      href={slug}
      className={classModifiers("page-nav__link", type.toLowerCase())}
    >
      {image !== undefined && (
        <Image
          {...image}
          className="page-nav__image"
          alt={title}
          title={title}
        />
      )}
      <div className="page-nav__title">
        {size === "big" && (
          <h5 className="page-nav__title-item page-nav__title-item--small">
            {type === "Newer" && (
              <FontAwesomeIcon
                icon={faCaretLeft}
                className="page-nav__title-icon--newer"
              />
            )}
            {`${type} ${suffix}`}
            {type === "Older" && (
              <FontAwesomeIcon
                icon={faCaretRight}
                className="page-nav__title-icon--older"
              />
            )}
          </h5>
        )}

        <h4 className="page-nav__title-item page-nav__title-item--main">
          {size === "small" && type === "Newer" && (
            <FontAwesomeIcon
              icon={faCaretLeft}
              className="page-nav__title-icon--newer"
            />
          )}
          {title}
          {size === "small" && type === "Older" && (
            <FontAwesomeIcon
              icon={faCaretRight}
              className="page-nav__title-icon--older"
            />
          )}
        </h4>
      </div>
    </Link>
  );
};

const PageNav = ({
  newerData,
  olderData,
  suffix = "Post",
  size = "big"
}: Props) => {
  return (
    <nav className={classModifiers("page-nav", size)}>
      <div className="page-nav__item">
        <PageNavLink
          type="Newer"
          data={newerData}
          suffix={suffix}
          size={size}
        />
      </div>

      <div className="page-nav__item">
        <PageNavLink
          type="Older"
          data={olderData}
          suffix={suffix}
          size={size}
        />
      </div>
    </nav>
  );
};

export default PageNav;
