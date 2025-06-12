// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  // Clear database before seeding
  await prisma.resourceLike.deleteMany();
  await prisma.resourceReview.deleteMany();
  await prisma.resourceEditSuggestion.deleteMany();
  await prisma.location.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.resourceCategory.deleteMany();


  // Reset auto-increment counters
  // await prisma.$executeRaw`ALTER SEQUENCE "Resource_id_seq" RESTART WITH 1;`;
  // await prisma.$executeRaw`ALTER SEQUENCE "Location_id_seq" RESTART WITH 1;`;
  // await prisma.$executeRaw`ALTER SEQUENCE "ResourceCategory_id_seq" RESTART WITH 1;`;
  // 'ERROR: must be owner of sequence Resource_id_seq

  const communityCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Community',
    },
  });

  const legalCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Legal',
    },
  });

  const educationCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Education',
    },
  });

  const realEstateCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Real Estate',
    },
  });

  const healthCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Health',
    },
  });

  const financeCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Finance',
    },
  });

  const otherCategory = await prisma.resourceCategory.create({
    data: {
      name: 'Other',
    },
  });

  await prisma.user.update({
    where: { email: "topgyal.gurung@gmail.com" },
    data: { role: "ADMIN" },
  });

  await prisma.resource.create({
    data: {
      name: 'Adhikaar',
      address: '71-07 Woodside Ave, Woodside, NY 11377',
      city: 'Queens',
      description: 'A women-led nonprofit working with the Nepali-speaking community to promote human rights and social justice.',
      status: 'APPROVED',
      categoryId: legalCategory.id,
      Location: {
        create: {
          latitude: 40.7428404,
          longitude: -73.8960413,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Tibetan Community of NY & NJ',
      address: '76-16 37th Ave, Queens, NY 11377',
      city: 'Queens',
      description: 'Cultural and social hub supporting the Tibetan community in the greater NYC area.',
      status: 'APPROVED',
      categoryId: communityCategory.id,
      Location: {
        create: {
          latitude: 40.7556923,
          longitude: -73.9062742,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Sherpa Kyidug NY & NJ',
      address: '41-17 75th St, Queens, NY 11373',
      city: 'Queens',
      description: 'Sherpa community organization promoting cultural events and advocacy.',
      status: 'APPROVED',
      categoryId: communityCategory.id,
      Location: {
        create: {
          latitude: 40.7452087,
          longitude: -73.8924522,
        },
      },
    },
  });

 

  await prisma.resource.create({
    data: {
      name: 'Consulate General of Nepal',
      address: '228 E 45th St 4th Floor, New York, NY 10017',
      city: 'Manhattan',
      description: 'Consulate General of Nepal in New York City.',
      status: 'APPROVED',
      categoryId: legalCategory.id,
      Location: {
        create: {
          latitude: 40.7519151,
          longitude: -73.9744031,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

