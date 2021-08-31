// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";
import classModifiers from "../utils/css";

interface Props {
  numPages: number;
  page: number;
  path: string;
}

export default function Pagination({ numPages, page, path }: Props) {
  if (numPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination">
      <ul className="pagination__paging">
        {Array.from({ length: numPages }).map((_, index) => (
          <li
            className={classModifiers("pagination__item", {
              active: page === index + 1
            })}
            key={`page${index}`}
          >
            <Link
              className="pagination__link"
              to={`${path}${index === 0 ? "" : `${index + 1}/`}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
