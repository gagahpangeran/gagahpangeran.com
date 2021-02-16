const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);

  const result = await graphql(`
    query GatsbyNode {
      allMarkdownRemark(limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
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

  const posts = result.data.allMarkdownRemark.nodes;

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
        skip: index * postPerPage
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
