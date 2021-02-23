// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

import React from "react";
import { Link } from "gatsby";

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
    <div className="pagination">
      <ul className="pagination__paging">
        {Array.from({ length: numPages }).map((_, index) => (
          <li
            className={`pagination__paging__number ${
              page === index + 1 ? "active" : ""
            }`}
            key={`page${index}`}
          >
            <Link to={`${path}${index === 0 ? "" : `${index + 1}/`}`}>
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
