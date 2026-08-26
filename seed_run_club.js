const { createStrapi } = require('@strapi/strapi');

function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({
    type: 'paragraph',
    children: [{ type: 'text', text }],
  }));
}

const runClubData = {
  name: 'Fort Run Club',
  tagline: 'Run Together. Grow Together.',
  description: toBlocks([
    'Fort Run Club was created to promote physical wellness, mental well-being, and meaningful fellowship among Rotaractors and the wider community.',
    "Every run represents more than distance covered—it is an opportunity to connect with others, develop discipline, improve health, and create a supportive environment where everyone is welcome, regardless of experience.",
    "Whether you're taking your first steps or training for your next marathon, Fort Run Club provides a community that motivates you to keep moving.",
  ]),
  missionText: 'To inspire healthier lifestyles while strengthening friendships and building an active community through inclusive fitness experiences.',
  whatWeDo: [
    { title: 'Weekly Community Runs', description: 'Regular group runs designed for all fitness levels.' },
    { title: 'Beginner Friendly Sessions', description: 'Creating an inclusive environment for new runners.' },
    { title: 'Fitness Challenges', description: 'Monthly challenges that encourage consistency and personal growth.' },
    { title: 'Social Runs', description: 'Relaxed runs focused on fellowship and networking.' },
    { title: 'Wellness Activities', description: 'Sessions promoting physical and mental well-being.' },
    { title: 'Event Participation', description: 'Representing the club at marathons, charity runs, and community fitness events.' },
  ],
  values: [
    { title: 'Inclusivity', description: 'Everyone is welcome.' },
    { title: 'Consistency', description: 'Small steps create lasting change.' },
    { title: 'Community', description: 'Running together builds stronger connections.' },
    { title: 'Wellness', description: 'Healthy body. Healthy mind.' },
    { title: 'Accountability', description: 'Supporting one another to stay committed.' },
  ],
  whyJoinIntro: 'Members enjoy:',
  memberBenefits: [
    { text: 'Regular group runs' },
    { text: 'Accountability partners' },
    { text: 'Motivation from fellow runners' },
    { text: 'Improved fitness and mental well-being' },
    { text: 'Networking opportunities' },
    { text: 'A supportive and encouraging community' },
  ],
  whoCanJoinIntro: 'Fort Run Club is open to:',
  whoCanJoin: [
    { text: 'Rotaractors' },
    { text: 'Rotarians' },
    { text: 'Interactors' },
    { text: 'Alumni' },
    { text: 'Friends of Rotaract' },
    { text: 'Anyone passionate about living an active lifestyle' },
  ],
  whoCanJoinNote: 'No prior running experience is required.',
  joinTitle: 'Join the Movement',
  joinText: "Whether you're chasing a personal best or simply looking for great company on a morning run, Fort Run Club is ready to welcome you. Together, we run farther, stronger, and healthier.",
};

async function main() {
  console.log('Loading Strapi...');
  const strapi = createStrapi({ distDir: './dist' });
  try {
    await strapi.load();
    console.log('Strapi loaded.');
    await strapi.start();
    console.log('Strapi started.');

    const uid = 'api::run-club.run-club';
    const existing = await strapi.documents(uid).findMany({});
    let documentId;
    if (existing.length > 0) {
      console.log('Run Club entry already exists. Updating...');
      documentId = existing[0].documentId;
      await strapi.documents(uid).update({
        documentId,
        data: runClubData,
      });
    } else {
      console.log('Creating Run Club entry...');
      const created = await strapi.documents(uid).create({
        data: runClubData,
      });
      documentId = created.documentId;
    }
    await strapi.documents(uid).publish({ documentId });
    console.log('Published.');
    console.log('Done.');
  } catch (e) {
    console.error('Error seeding Run Club:', e);
  } finally {
    process.exit(0);
  }
}

main();
