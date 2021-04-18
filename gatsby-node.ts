// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { createBlogPageData } from "./src/utils/gatsby";

// Current plugin `gatsby-plugin-typegen` can't generate types from graphql
// query inside `gatsby-node.ts` yet. There's plan in the future to support it.
// For now just manually create the interface for it.
// TODO: Automate to generate these interface bellow
interface GatsbyNodeQuery {
  allPosts: {
    nodes: {
      id: string;
      fields: {
        slug: string;
      };
    }[];
  };
  allCategories: {
    group: GroupInfo[];
  };
  allTags: {
    group: GroupInfo[];
  };
  allLang: {
    group: GroupInfo[];
  };
}

interface GroupInfo {
  fieldValue: string;
  totalCount: number;
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions;

  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);

  // See `GatsbyNodeQuery` interface above
  const result = await graphql<GatsbyNodeQuery>(`
    query GatsbyNodeQuery {
      allPosts: allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }

      allCategories: allMarkdownRemark {
        group(field: frontmatter___categories) {
          ...GroupInfo
        }
      }

      allTags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          ...GroupInfo
        }
      }

      allLang: allMarkdownRemark {
        group(field: frontmatter___lang) {
          ...GroupInfo
        }
      }
    }

    fragment GroupInfo on MarkdownRemarkGroupConnection {
      fieldValue
      totalCount
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error when loading blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data?.allPosts.nodes ?? [];
  const categories = result.data?.allCategories.group ?? [];
  const tags = result.data?.allTags.group ?? [];
  const langs = result.data?.allLang.group ?? [];

  if (posts.length <= 0) {
    reporter.warn(`There is no posts!`);
    return;
  }

  posts.forEach((post, index) => {
    const newerId = index === 0 ? null : posts[index - 1].id;
    const olderId = index === posts.length - 1 ? null : posts[index + 1].id;

    const path = post.fields.slug;
    reporter.info(`Creating page ${path}, type Post`);

    createPage({
      path,
      component: PostTemplate,
      context: {
        id: post.id,
        newerId,
        olderId
      }
    });
  });

  const indexPageData = createBlogPageData({
    postCount: posts.length,
    type: "Blog"
  });

  const categoriesPageData = categories.flatMap(category =>
    createBlogPageData({
      postCount: category.totalCount,
      filterValue: category.fieldValue,
      type: "Category"
    })
  );

  const tagsPageData = tags.flatMap(tag =>
    createBlogPageData({
      postCount: tag.totalCount,
      filterValue: tag.fieldValue,
      type: "Tag"
    })
  );

  const langsPageData = langs.flatMap(lang =>
    createBlogPageData({
      postCount: lang.totalCount,
      filterValue: lang.fieldValue,
      slug: "lang",
      type: "Language"
    })
  );

  const allPageData = [
    ...indexPageData,
    ...categoriesPageData,
    ...tagsPageData,
    ...langsPageData
  ];

  allPageData.forEach(data => {
    reporter.info(`Creating page ${data.path}, type ${data.context.type}`);

    createPage({
      ...data,
      component: BlogTemplate
    });
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CreateSchemaCustomizationArgs): any => {
  const { createTypes } = actions;

  createTypes(`
    type Site implements Node {
      siteMetadata: SiteSiteMetadata!
    }

    type SiteSiteMetadata {
      description: String!
      image: String!
      siteUrl: String!
      title: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
      html: String!
    }

    type Frontmatter {
      categories: [String!]!
      date: Date! @dateformat
      description: String!
      lang: String!
      tags: [String!]!
      title: String!
    }

    type Fields {
      slug: String!
    }
  `);
};
