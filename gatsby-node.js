const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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
        group(field: frontmatter___category) {
          fieldValue
        }
      }

      allTags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error when loading blog posts`,
      results.errors
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
    createPage({
      path: post.fields.slug,
      component: PostTemplate,
      context: {
        id: post.id
      }
    });
  });

  const postPerPage = 5;
  const numPages = Math.ceil(posts.length / postPerPage);

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? "/" : `/${index + 1}`,
      component: BlogTemplate,
      context: {
        limit: postPerPage,
        skip: index * postPerPage,
        type: "Index"
      }
    });
  });

  categories.forEach(category => {
    createPage({
      path: `category/${category.fieldValue.toLowerCase().replace(/ /g, "-")}`,
      component: BlogTemplate,
      context: {
        filterValue: category.fieldValue,
        type: "Category"
      }
    });
  });

  tags.forEach(tag => {
    createPage({
      path: `tag/${tag.fieldValue.toLowerCase().replace(/ /g, "-")}`,
      component: BlogTemplate,
      context: {
        filterValue: tag.fieldValue,
        type: "Tag"
      }
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
