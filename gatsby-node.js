const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve(`./src/templates/post.js`);

  return graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const BlogPosts = result.data.allWordpressPost.edges;

    BlogPosts.forEach(post => {
      createPage({
        path: `/${post.node.slug}`,
        component: BlogPostTemplate,
        context: {
          id: post.node.id,
        },
      });
    });
  });
};
