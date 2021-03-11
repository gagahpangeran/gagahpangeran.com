// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import kebabCase from "lodash.kebabcase";
import { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions;

  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);

  // * See `GatsbyNodeQuery` interface at the end of this file
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

  const postPerPage = 5;

  const createUpdatePage = ({
    slug,
    type,
    postCount,
    filterValue
  }: {
    slug?: string;
    type: string;
    postCount: number;
    filterValue?: string;
  }) => {
    const numPages = Math.ceil(postCount / postPerPage);

    const paths = [];
    if (slug !== undefined) {
      paths.push(slug);
    }

    if (filterValue !== undefined) {
      paths.push(kebabCase(filterValue));
    }

    let path = "/";
    if (paths.length > 0) {
      path += `${paths.join("/")}/`;
    }

    Array.from({ length: numPages }).forEach((_, index) => {
      const templatePath = path;
      if (index > 0) {
        path += `${index + 1}`;
      }

      reporter.info(`Creating page ${path}, type ${type}`);

      createPage({
        path,
        component: BlogTemplate,
        context: {
          limit: postPerPage,
          skip: index * postPerPage,
          page: index + 1,
          templatePath,
          numPages,
          type,
          filterValue
        }
      });
    });
  };

  createUpdatePage({
    type: "Index",
    postCount: posts.length
  });

  categories.forEach(category => {
    createUpdatePage({
      slug: "category",
      type: "Category",
      postCount: category.totalCount,
      filterValue: category.fieldValue
    });
  });

  tags.forEach(tag => {
    createUpdatePage({
      slug: "tag",
      type: "Tag",
      postCount: tag.totalCount,
      filterValue: tag.fieldValue
    });
  });

  langs.forEach(lang => {
    createUpdatePage({
      slug: "lang",
      type: "Language",
      postCount: lang.totalCount,
      filterValue: lang.fieldValue
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
