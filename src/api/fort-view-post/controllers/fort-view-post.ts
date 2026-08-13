/**
 * fort-view-post controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::fort-view-post.fort-view-post', ({ strapi }) => ({
  // Public, anonymous like counter. Only ever increments by exactly 1 per
  // request — visitors can never set the count directly, since there's no
  // user tracking to know who already liked a post.
  //
  // Uses the low-level query engine (not the Document Service) so this
  // writes straight to the published row visitors actually see, rather
  // than drifting onto a separate draft copy under draftAndPublish.
  async like(ctx) {
    const { id } = ctx.params;
    const existing = await strapi.db.query('api::fort-view-post.fort-view-post').findOne({
      where: { documentId: id, publishedAt: { $notNull: true } },
    });
    if (!existing) {
      return ctx.notFound();
    }
    const updated = await strapi.db.query('api::fort-view-post.fort-view-post').update({
      where: { id: existing.id },
      data: { likes: (existing.likes || 0) + 1 },
    });
    ctx.body = { data: { likes: updated.likes } };
  },
}));
