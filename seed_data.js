const { createStrapi } = require('@strapi/strapi');

const avenuesData = [
  {
    name: "Club Service",
    description: "The Club Service avenue cultivates a vibrant and supportive community and fosters a sense of belonging and camaraderie within the Rotaract Club of Colombo Fort by providing opportunities to network and for fellowship and build lasting friendships."
  },
  {
    name: "Community Service",
    description: "The Community Service avenue undertakes the goal to serve the community and make a tangible difference in the lives of the underprivileged by addressing their needs and improving their quality of life."
  },
  {
    name: "International Service",
    description: "The International Services avenue aims to foster global understanding and cooperation with Rotaract Clubs beyond the borders of RID 3220 and address pressing humanitarian issues in other countries whilst building lasting relationships with Rotaractors around the world."
  },
  {
    name: "Professional Development",
    description: "The Professional Development Avenue aims to enhance the professional skills of our Rotaractors and equip them with the knowledge and skills they need to grow and develop themselves personally and professionally."
  },
  {
    name: "Sports and Recreational Activities",
    description: "The avenue of Sports and Recreational Activities carries the goal of promoting physical and mental well-being by encouraging a healthy and active lifestyle through recreational outings and fitness activities."
  },
  {
    name: "Public Relations",
    description: "The Public Relations avenue plays a primary role in building and maintaining a positive public image of RAC APIIT by enhancing the club’s visibility and reputation through effective public relations efforts."
  },
  {
    name: "Environment, Wildlife and Animal Welfare",
    description: "The Environment, Wildlife and Animal Welfare avenue aims to protect the environment and promote animal welfare through projects that protect natural resources, conserve wildlife, and promote sustainable practices."
  },
  {
    name: "Interact Coordinator",
    description: "The role of a Rotary-Interact Coordinator is to facilitate collaborations with other Rotary and Interact Clubs and bridge the gap through mentoring programs and youth leadership development."
  },
  {
    name: "Regional Engagement",
    description: "The avenue of Regional Engagement focuses on strengthening relations with Clubs in the various other zones and regions in Sri Lanka and aims to foster networking and collaboration with other clubs through joint projects and opportunities for knowledge sharing."
  },
  {
    name: "Membership Development and Retention",
    description: "The Membership Development and Retention avenue grows and maintains a strong and engaged membership base by attracting new members who share Rotaract’s values and commitment to service and foster a welcoming and inclusive environment to retain members."
  }
];

function toBlocks(text) {
  return [
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: text }
      ]
    }
  ];
}

async function seedSingleType(strapi, uid, data, name) {
    console.log(`Processing Single Type: ${name} (${uid})`);
    try {
        const existing = await strapi.documents(uid).findMany({});
        if (existing.length > 0) {
            console.log(`${name} already exists. Updating...`);
            await strapi.documents(uid).update({
                documentId: existing[0].documentId,
                data: {
                    ...data,
                    publishedAt: new Date()
                }
            });
        } else {
            console.log(`Creating ${name}...`);
            await strapi.documents(uid).create({
                data: {
                    ...data,
                    publishedAt: new Date()
                }
            });
        }
    } catch (e) {
        console.error(`Error seeding ${name}:`, e.message);
    }
}

async function main() {
  console.log('Loading Strapi...');
  const strapi = createStrapi({ distDir: './dist' });
  try {
    await strapi.load();
    console.log('Strapi loaded.');
    await strapi.start(); 
    console.log('Strapi started.');

    // Seed Avenues (Collection Type)
    for (const avenueData of avenuesData) {
      console.log(`Processing Avenue: ${avenueData.name}`);
      const existingAvenues = await strapi.documents('api::avenue.avenue').findMany({ filters: { name: avenueData.name } });
      let avenue;
      if (existingAvenues.length > 0) {
        avenue = await strapi.documents('api::avenue.avenue').update({
          documentId: existingAvenues[0].documentId,
          data: { description: toBlocks(avenueData.description), publishedAt: new Date() }
        });
      } else {
        avenue = await strapi.documents('api::avenue.avenue').create({
          data: { name: avenueData.name, description: toBlocks(avenueData.description), publishedAt: new Date() }
        });
      }

      // Create Director
      const directorName = `Director of ${avenueData.name}`;
      const existingDirectors = await strapi.documents('api::director.director').findMany({ filters: { name: directorName } });
      if (existingDirectors.length === 0) {
        await strapi.documents('api::director.director').create({
          data: {
            name: directorName,
            bio: `This is the bio for the ${directorName}.`,
            email: `director.${avenueData.name.toLowerCase().replace(/\s+/g, '.').replace(/,/g, '')}@example.com`,
            position: `Director`,
            avenue: avenue.documentId,
            publishedAt: new Date(),
          }
        });
      }

      // Create dummy Project
      const projectName = `${avenueData.name} Initiation Project`;
      const existingProjects = await strapi.documents('api::project.project').findMany({ filters: { title: projectName } });
      if (existingProjects.length === 0) {
        await strapi.documents('api::project.project').create({
          data: {
            title: projectName,
            description: toBlocks(`This is a flagship project under the ${avenueData.name} avenue.`),
            projectStatus: 'Upcoming',
            featured: false,
            avenues: [avenue.documentId],
            publishedAt: new Date(),
          }
        });
      }

       // Create dummy Event
      const eventName = `${avenueData.name} Awareness Session`;
      const existingEvents = await strapi.documents('api::event.event').findMany({ filters: { title: eventName } });
      if (existingEvents.length === 0) {
        await strapi.documents('api::event.event').create({
          data: {
            title: eventName,
            description: toBlocks(`An event to raise awareness about ${avenueData.name}.`),
            date: new Date(),
            location: 'Colombo',
            eventstatus: 'Upcoming, ',
            avenues: [avenue.documentId],
            publishedAt: new Date(),
          }
        });
      }
    }

    // Seed Global Settings
    await seedSingleType(strapi, 'api::global.global', {
        siteName: "Rotaract Club of Colombo Fort",
        footerContent: toBlocks("© 2026 Rotaract Club of Colombo Fort. All rights reserved. Built with Strapi."),
        socialLinks: [
            { platform: "Facebook", url: "https://facebook.com/racapiit" },
            { platform: "Instagram", url: "https://instagram.com/racapiit" }
        ]
    }, "Global Settings");

    // Seed Home Page
    await seedSingleType(strapi, 'api::home-page.home-page', {
        aboutParagraph: toBlocks("Welcome to the Rotaract Club of Colombo Fort. We are a community dedicated to service, fellowship, and professional development. Discover our projects and join us in making a difference."),
    }, "Home Page");

    // Seed About Page
    await seedSingleType(strapi, 'api::about-page.about-page', {
        mainContent: toBlocks("The Rotaract Club of Colombo Fort was charted in... and has a rich history of service."),
        mission: toBlocks("To provide an opportunity for..."),
        vision: toBlocks("To be the leading youth movement...")
    }, "About Page");

    // Seed Contact Page
    await seedSingleType(strapi, 'api::contact-page.contact-page', {
        address: toBlocks("APIIT City Campus, No. 388, Union Pl, Colombo 00200"),
        email: "contact@racapiit.lk",
        phone: "+94 11 767 5100",
        googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=..."
    }, "Contact Page");
    
    console.log('Seeding completed successfully.');

  } catch (error) {
    console.error('Error during seeding:', error);
    if (error.details) {
        console.error('Error details:', JSON.stringify(error.details, null, 2));
    }
  } finally {
     process.exit(0);
  }
}

main();
