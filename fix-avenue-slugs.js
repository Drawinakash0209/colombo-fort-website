
const strapi = require('@strapi/strapi');

async function fixSlugs() {
  const app = await strapi().load();
  
  const avenues = await app.documents('api::avenue.avenue').findMany();
  
  console.log(`Found ${avenues.length} avenues.`);
  
  for (const avenue of avenues) {
    if (!avenue.slug) {
      const newSlug = avenue.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      console.log(`Updating ${avenue.name} with slug: ${newSlug}`);
      
      await app.documents('api::avenue.avenue').update({
        documentId: avenue.documentId,
        data: {
          slug: newSlug,
        },
      });
    }
  }
  
  console.log('Done fixing slugs.');
  process.exit(0);
}

fixSlugs().catch((err) => {
  console.error(err);
  process.exit(1);
});
