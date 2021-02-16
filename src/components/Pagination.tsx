import React from "react";
import { Link } from "gatsby";

interface Props {
  numPages: number;
  page: number;
  path: string;
}

export default function Pagination({ numPages, page, path }: Props) {
  return (
    <div className="pagination">
      <ul className="pagination__paging">
        {Array.from({ length: numPages }).map((_, idx: number) => (
          <li
            className={`pagination__paging__number ${
              page === idx + 1 ? "active" : ""
            }`}
            key={`page${idx}`}
          >
            <Link to={`${path}/${idx === 0 ? "" : `page/${idx + 1}`}`}>
              {idx + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
