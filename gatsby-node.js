// Copyright (c) GPR <gpr@gagahpangeran.com>. Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text.

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const kebabCase = require("lodash.kebabcase");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);

  const result = await graphql(`
    query GatsbyNode {
      allPosts: allMarkdownRemark(limit: 1000) {
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

  const posts = result.data.allPosts.nodes;
  const categories = result.data.allCategories.group;
  const tags = result.data.allTags.group;

  if (posts.length <= 0) {
    reporter.warn(`There is no posts!`);
    return;
  }

  posts.forEach(post => {
    const path = post.fields.slug;
    reporter.info(`Creating page ${path}, type Post`);

    createPage({
      path,
      component: PostTemplate,
      context: {
        id: post.id
      }
    });
  });

  const postPerPage = 5;

  const createUpdatePage = ({ slug, type, postCount, filterValue }) => {
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
};

exports.onCreateNode = ({ node, actions, getNode }) => {
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
