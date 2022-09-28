// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

import path from "path";
import kebabCase from "lodash.kebabcase";
import { createFilePath } from "gatsby-source-filesystem";
import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { createPaginatedPageData, getIdPageContext } from "./src/utils/gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions;

  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);
  const VersionTemplate = path.resolve(`./src/templates/Version.tsx`);

  const result = await graphql<Queries.GatsbyNodeQuery>(`
    query GatsbyNode {
      allPosts: allMarkdownRemark(
        limit: 1000
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fields: { type: { eq: "blog" } } }
      ) {
        ...MDNode
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
  const tags = result.data?.allTags.group ?? [];
  const langs = result.data?.allLang.group ?? [];

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

  const tagsPageData = tags.flatMap(tag =>
    createPaginatedPageData({
      postCount: tag.totalCount,
      filterValue: tag.fieldValue,
      type: "Tag",
      basePath: `/blog/tag/${kebabCase(tag.fieldValue ?? "")}/`
    })
  );

  const langsPageData = langs.flatMap(lang =>
    createPaginatedPageData({
      postCount: lang.totalCount,
      filterValue: lang.fieldValue,
      type: "Language",
      basePath: `/blog/lang/${kebabCase(lang.fieldValue ?? "")}/`
    })
  );

  const allPageData = [...indexPageData, ...tagsPageData, ...langsPageData];

  allPageData.forEach(data => {
    reporter.info(`Creating page ${data.path}, type ${data.context.type}`);

    createPage({
      ...data,
      component: BlogTemplate
    });
  });

  createPage({
    path: `/changelog/:version`,
    matchPath: `/changelog/:version`,
    component: VersionTemplate
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

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }: CreateSchemaCustomizationArgs) => {
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
      excerpt: String!
    }

    type Frontmatter {
      date: Date! @dateformat
      lang: String!
      tags: [String!]!
      title: String!
    }

    type Fields {
      slug: String!
    }
  `);
  };
