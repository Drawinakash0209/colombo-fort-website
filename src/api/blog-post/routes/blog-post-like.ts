/**
 * Custom route for the public, anonymous like counter.
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/blog-posts/:id/like',
      handler: 'blog-post.like',
      config: {
        auth: false,
      },
    },
  ],
};
