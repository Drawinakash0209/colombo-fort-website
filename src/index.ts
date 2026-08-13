import axios from 'axios';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    console.log('--- Granting Public Permissions ---');
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
    if (publicRole) {
      const apisToGrant = ['avenue', 'project', 'exco', 'director', 'member', 'advisor', 'home-page', 'about-page', 'team-page', 'our-journey', 'contact-page', 'global', 'fort-view', 'fort-view-post', 'blog-page', 'blog-post', 'run-club', 'run-club-post', 'donation-page', 'volunteer-page', 'annual-report'];
      for (const api of apisToGrant) {
        const uid = `api::${api}.${api}`;
        
        const grant = async (action) => {
          const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: publicRole.id } });
          if (!exists) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id },
            });
          }
        };

        await grant(`${uid}.find`);
        await grant(`${uid}.findOne`);
      }

      // Public, anonymous like counter on Fort View posts.
      const grantOne = async (action) => {
        const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: publicRole.id } });
        if (!exists) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
        }
      };
      await grantOne('api::fort-view-post.fort-view-post.like');
      await grantOne('api::blog-post.blog-post.like');

      // Comments: public can list approved comments and submit new ones
      // (which the controller always forces into the unapproved state).
      // Deliberately no update/delete permission for the public role.
      await grantOne('api::comment.comment.find');
      await grantOne('api::comment.comment.findOne');
      await grantOne('api::comment.comment.create');

      // Donation submissions (bank transfer confirmations): public can only
      // ever create one. Deliberately no find/findOne/update/delete — these
      // are never shown publicly, only visible to admins in the Strapi
      // admin panel.
      await grantOne('api::donation-submission.donation-submission.create');

      // Fort View "Work With Us" applications: public can only ever
      // create one. No find/findOne/update/delete — admin-only visibility.
      await grantOne('api::fort-view-application.fort-view-application.create');

      // Public can upload a receipt file (for the donation confirmation
      // form) but cannot list, view, or delete any uploaded media.
      await grantOne('plugin::upload.content-api.upload');
    }

    console.log('--- Bootstrap complete ---');
  },
};
