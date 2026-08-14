export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Strapi's cors origin option only does exact string matching, no
      // wildcards — so a *.vercel.app subdomain (Vercel gives every deploy,
      // production and previews alike, one) has to be pattern-matched here
      // instead of listed literally.
      origin(ctx) {
        const requestOrigin = ctx.get('Origin');
        if (requestOrigin && /^https:\/\/([a-z0-9-]+\.)*vercel\.app$/.test(requestOrigin)) {
          return [requestOrigin];
        }
        return [
          'http://localhost:3000',
          'https://rotaractcolombofort.org',
          'https://www.rotaractcolombofort.org',
        ];
      },
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
