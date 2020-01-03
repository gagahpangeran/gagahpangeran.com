const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const PostTemplate = path.resolve(`./src/templates/Post.tsx`);
  const BlogTemplate = path.resolve(`./src/templates/Blog.tsx`);

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
      allWordpressTag {
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
    const Tags = result.data.allWordpressTag.edges;

    createPage({
      path: `/`,
      component: BlogTemplate,
      context: {
        id: "",
        type: "Blog",
      },
    });

    BlogPosts.forEach(post => {
      createPage({
        path: `/${post.node.slug}`,
        component: PostTemplate,
        context: {
          id: post.node.id,
        },
      });
    });

    Categories.forEach(category => {
      createPage({
        path: `/category/${category.node.slug}`,
        component: BlogTemplate,
        context: {
          id: category.node.id,
          type: "Category",
        },
      });
    });

    Tags.forEach(tag => {
      createPage({
        path: `/tag/${tag.node.slug}`,
        component: BlogTemplate,
        context: {
          id: tag.node.id,
          type: "Tag",
        },
      });
    });
  });
};
