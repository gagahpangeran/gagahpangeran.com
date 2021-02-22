import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";

interface Props {
  categories: string[];
  tags: string[];
}

const CategoriesTags = ({ categories, tags }: Props) => {
  const list = categories
    .map(item => ({
      type: "category",
      item
    }))
    .concat(
      tags.map(tag => ({
        type: "tag",
        item: tag
      }))
    );

  return (
    <div className="categories-tags">
      {list.map(({ type, item }) => (
        <Link
          key={`${type}-${kebabCase(item)}`}
          to={`/${type}/${kebabCase(item)}`}
          className={`categories-tags__link ${type}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesTags;
