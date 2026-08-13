export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Vercel gives every deploy (production + previews) a *.vercel.app
      // subdomain, so this covers all of them plus local dev. Add the
      // real custom domain here once one is pointed at Vercel.
      origin: ['http://localhost:3000', 'https://*.vercel.app'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
