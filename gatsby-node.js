const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }
  const posts = result.data.allContentfulBlogPost.nodes;
  const template = path.resolve("./src/templates/blog-post.js");
  posts.forEach(post => {
    createPage({
      path: `/blog/${post.slug}`,
      component: template,
      context: { slug: post.slug },
    });
  });
};
