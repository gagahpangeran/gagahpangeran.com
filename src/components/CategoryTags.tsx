import { Link } from "gatsby";
import kebabCase from "lodash.kebabcase";
import React from "react";

interface Props {
  category: string | null;
  tags: (string | null)[];
}

const CategoryTags = ({ category, tags }: Props) => {
  const list = (category === null
    ? []
    : [
        {
          type: "category",
          item: category
        }
      ]
  ).concat(
    (tags.filter(tag => tag !== null) as string[]).map(tag => ({
      type: "tag",
      item: tag
    }))
  );

  return (
    <div className="category-tags">
      {list.map(({ type, item }) => (
        <Link
          key={`${type}-${kebabCase(item)}`}
          to={`/${type}/${kebabCase(item)}`}
          className={`category-tags__link ${type}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTags;
