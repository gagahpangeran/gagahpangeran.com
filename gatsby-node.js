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
    const numPages = Math.ceil(blogPosts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      const suffixPage = i === 0 ? "" : `/page/${i + 1}`;

      createPage({
        path: `/${suffixPage}`,
        component: BlogTemplate,
        context: {
          id: "",
          type: "Blog",
          limit: postsPerPage,
          skip: i * postsPerPage,
          page: i + 1,
          numPages
        }
      });

      categories.forEach(category => {
        createPage({
          path: `/category/${category.node.slug}/${suffixPage}`,
          component: BlogTemplate,
          context: {
            id: category.node.id,
            type: "Category",
            limit: postsPerPage,
            skip: i * postsPerPage,
            page: i + 1,
            numPages
          }
        });
      });

      tags.forEach(tag => {
        createPage({
          path: `/tag/${tag.node.slug}/${suffixPage}`,
          component: BlogTemplate,
          context: {
            id: tag.node.id,
            type: "Tag",
            limit: postsPerPage,
            skip: i * postsPerPage,
            page: i + 1,
            numPages
          }
        });
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
