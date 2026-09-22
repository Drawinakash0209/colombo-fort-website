const { createStrapi } = require('@strapi/strapi');

const THEME_COLOR = process.argv[2] || '#800020';

async function main() {
  console.log('Loading Strapi...');
  const strapi = createStrapi({ distDir: './dist' });
  try {
    await strapi.load();
    const uid = 'api::global.global';
    const existing = await strapi.documents(uid).findMany({});
    if (!existing.length) throw new Error('Global single type has no entry');
    const documentId = existing[0].documentId;
    console.log('Current themeColor:', existing[0].themeColor);
    await strapi.documents(uid).update({ documentId, data: { themeColor: THEME_COLOR } });
    await strapi.documents(uid).publish({ documentId });
    const after = await strapi.documents(uid).findMany({});
    console.log('New themeColor    :', after[0].themeColor);
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    process.exit(0);
  }
}
main();
