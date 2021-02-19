import { Link } from "gatsby";
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
          key={`${type}-${item}`}
          to={`/${type}/${item.toLowerCase()}`}
          className={`category-tags__link ${type}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default CategoryTags;
