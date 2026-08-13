/**
 * Custom route for the public, anonymous like counter.
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/fort-view-posts/:id/like',
      handler: 'fort-view-post.like',
      config: {
        auth: false,
      },
    },
  ],
};
