/**
 * comment controller
 *
 * Public visitors can only ever see approved comments, and every comment
 * they submit is forced into the unapproved state server-side (regardless
 * of what the request body claims) until an admin approves it in the
 * Strapi admin panel.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      filters: {
        ...((ctx.query.filters as object) || {}),
        approved: true,
      },
    };
    return super.find(ctx);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const entry = await strapi.documents('api::comment.comment').findOne({ documentId: id });
    if (!entry || !entry.approved) {
      return ctx.notFound();
    }
    return super.findOne(ctx);
  },

  async create(ctx) {
    ctx.request.body.data = {
      ...ctx.request.body.data,
      approved: false,
    };
    return super.create(ctx);
  },
}));
