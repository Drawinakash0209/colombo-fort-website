export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Vercel gives every deploy (production + previews) a *.vercel.app
      // subdomain, so this covers all of them plus local dev, plus the
      // real domain once it's pointed at the Vercel deployment.
      origin: [
        'http://localhost:3000',
        'https://*.vercel.app',
        'https://rotaractcolombofort.org',
        'https://www.rotaractcolombofort.org',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
