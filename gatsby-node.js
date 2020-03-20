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

    const blogPosts = result.data.allWordpressPost.edges;
    const categories = result.data.allWordpressCategory.edges;
    const tags = result.data.allWordpressTag.edges;

    const postsPerPage = 5;
    const numBlogPages = Math.ceil(blogPosts.length / postsPerPage);

    Array.from({ length: numBlogPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: BlogTemplate,
        context: {
          id: "",
          type: "Blog",
          limit: postsPerPage,
          skip: i * postsPerPage,
          page: i + 1,
          numPages: numBlogPages
        }
      });
    });

    categories.forEach(category => {
      createPage({
        path: `category/${category.node.slug}`,
        component: BlogTemplate,
        context: {
          id: category.node.id,
          type: "Category"
        }
      });
    });

    tags.forEach(tag => {
      createPage({
        path: `tag/${tag.node.slug}`,
        component: BlogTemplate,
        context: {
          id: tag.node.id,
          type: "Tag"
        }
      });
    });

    blogPosts.forEach(post => {
      createPage({
        path: `/${post.node.slug}`,
        component: PostTemplate,
        context: {
          id: post.node.id
        }
      });
    });
  });
};
