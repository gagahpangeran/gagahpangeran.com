const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const CategoryTemplate = path.resolve(`./src/templates/Category.tsx`);

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
      allWordpressCategory {
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
    const Categories = result.data.allWordpressCategory.edges;

    BlogPosts.forEach(post => {
      createPage({
        path: `/${post.node.slug}`,
        component: BlogPostTemplate,
        context: {
          id: post.node.id,
        },
      });
    });

    Categories.forEach(category => {
      createPage({
        path: `/category/${category.node.slug}`,
        component: CategoryTemplate,
        context: {
          id: category.node.id,
        },
      });
    });
  });
};
