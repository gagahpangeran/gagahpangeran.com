// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import path from "path";
import kebabCase from "lodash.kebabcase";
import { createFilePath } from "gatsby-source-filesystem";
import { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { createPaginatedPageData, getIdPageContext } from "./src/utils/gatsby";

// Current plugin `gatsby-plugin-typegen` can't generate types from graphql
// query inside `gatsby-node.ts` yet. There's plan in the future to support it.
// For now just manually create the interface for it.
// TODO: Automate to generate these interface bellow
interface GatsbyNodeQuery {
  allPosts: MDNode;
  allCategories: {
    group: GroupInfo[];
  };
  allTags: {
    group: GroupInfo[];
  };
  allLang: {
    group: GroupInfo[];
  };
  allChangelog: MDNode;
}

interface MDNode {
  nodes: {
    id: string;
    fields: {
      slug: string;
    };
  }[];
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
  const ChangelogTemplate = path.resolve(`./src/templates/Changelog.tsx`);

  // See `GatsbyNodeQuery` interface above
  const result = await graphql<GatsbyNodeQuery>(`
    query GatsbyNodeQuery {
      allPosts: allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fields: { type: { eq: "blog" } } }
      ) {
        ...MDNode
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

      allChangelog: allMarkdownRemark(
        filter: {
          fields: {
            type: { eq: "changelog" }
            slug: { nin: ["/changelog/Home/", "/changelog/Next/"] }
          }
        }
        sort: { fields: fields___slug, order: DESC }
      ) {
        ...MDNode
      }
    }

    fragment MDNode on MarkdownRemarkConnection {
      nodes {
        id
        fields {
          slug
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
  const changelogs = result.data.allChangelog.nodes ?? [];

  if (posts.length <= 0) {
    reporter.warn(`There is no posts!`);
    return;
  }

  posts.forEach((post, index) => {
    const path = post.fields.slug;
    reporter.info(`Creating page ${path}, type Post`);

    createPage({
      path,
      component: PostTemplate,
      context: {
        id: post.id,
        ...getIdPageContext(posts, index)
      }
    });
  });

  const indexPageData = createPaginatedPageData({
    postCount: posts.length,
    type: "Blog",
    basePath: "/blog/"
  });

  const categoriesPageData = categories.flatMap(category =>
    createPaginatedPageData({
      postCount: category.totalCount,
      filterValue: category.fieldValue,
      type: "Category",
      basePath: `/blog/category/${kebabCase(category.fieldValue)}/`
    })
  );

  const tagsPageData = tags.flatMap(tag =>
    createPaginatedPageData({
      postCount: tag.totalCount,
      filterValue: tag.fieldValue,
      type: "Tag",
      basePath: `/blog/tag/${kebabCase(tag.fieldValue)}/`
    })
  );

  const langsPageData = langs.flatMap(lang =>
    createPaginatedPageData({
      postCount: lang.totalCount,
      filterValue: lang.fieldValue,
      type: "Language",
      basePath: `/blog/lang/${kebabCase(lang.fieldValue)}/`
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

  if (changelogs.length <= 0) {
    reporter.warn(`There is no changelogs`);
  }

  changelogs.forEach((changelog, index) => {
    const path = changelog.fields.slug;
    reporter.info(`Creating page ${path}, type Changelog`);

    createPage({
      path,
      component: ChangelogTemplate,
      context: {
        id: changelog.id,
        ...getIdPageContext(changelogs, index)
      }
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
    const filePath = createFilePath({ node, getNode });
    const [, type] = filePath.split("/");

    createNodeField({
      name: `slug`,
      node,
      value: filePath
    });

    createNodeField({
      name: `type`,
      node,
      value: type
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
