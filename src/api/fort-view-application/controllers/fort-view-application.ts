/**
 * fort-view-application controller
 *
 * Public visitors can only ever create an application — there is no public
 * find/findOne permission granted, so these are only ever visible to
 * admins in the Strapi admin panel. `reviewed` is forced to false
 * server-side on create regardless of what the request body claims.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::fort-view-application.fort-view-application', () => ({
  async create(ctx) {
    ctx.request.body.data = {
      ...ctx.request.body.data,
      reviewed: false,
    };
    return super.create(ctx);
  },
}));
