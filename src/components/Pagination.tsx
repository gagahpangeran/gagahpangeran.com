import React from "react";
import styled from "../utils/styled";
import { Link } from "gatsby";

const PaginationLayout = styled.div`
  text-align: center;
  display: flex;
`;

const PaginationPaging = styled.ul`
  background: ${props => props.theme.background.dark};
  display: flex;
  margin: 0 auto;
  padding: 16px;
  border-radius: 8px;
`;

const PaginationNumber = styled.li`
  border: 2px solid ${props => props.theme.green};
  margin: 0 8px;

  a {
    color: ${props => props.theme.green};
    display: block;
    padding: 8px 16px;

    &:hover {
      text-decoration: none;
      background: ${props => props.theme.green};
      color: ${props => props.theme.background.dark};
    }
  }

  &.active {
    background: ${props => props.theme.green};
    pointer-events: none;
    cursor: default;

    a {
      color: ${props => props.theme.background.dark};
    }
  }
`;

export default function Pagination({
  numPages,
  page,
  path
}: {
  numPages: number;
  page: number;
  path: string;
}) {
  return (
    <PaginationLayout>
      <PaginationPaging>
        {Array.from({ length: numPages }).map((_, idx: number) => (
          <PaginationNumber
            className={page === idx + 1 ? "active" : ""}
            key={`page${idx}`}
          >
            <Link to={`${path}/${idx === 0 ? "" : `page/${idx + 1}`}`}>
              {idx + 1}
            </Link>
          </PaginationNumber>
        ))}
      </PaginationPaging>
    </PaginationLayout>
  );
}
