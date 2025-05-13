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

  const communityCategory = await prisma.resourceCategory.create({
    data: { name: 'Community' },
  });

  const spiritualCategory = await prisma.resourceCategory.create({
    data: { name: 'Legal' },
  });

  const advocacyCategory = await prisma.resourceCategory.create({
    data: { name: 'Health' },
  });

  const youthCategory = await prisma.resourceCategory.create({
    data: { name: 'Education' },
  });

  const socialServicesCategory = await prisma.resourceCategory.create({
    data: { name: 'Finance' },
  });

  await prisma.user.update({
    where: { email: "topgyal.gurung@gmail.com" },
    data: { role: "ADMIN" },
  });

  await prisma.resource.create({
    data: {
      name: 'Himalayan Community Center',
      address: '37-21 72nd St',
      city: 'Queens',
      description: 'A hub for community events and support for the Himalayan diaspora.',
      status: 'APPROVED',
      categoryId: communityCategory.id,
      Location: {
        create: {
          latitude: 40.747,
          longitude: -73.891,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Tibetan Buddhist Center of NY',
      address: '97-30 64th Ave',
      city: 'Rego Park',
      description: 'Spiritual and cultural support for Himalayan Buddhists.',
      status: 'APPROVED',
      categoryId: spiritualCategory.id,
      Location: {
        create: {
          latitude: 40.731,
          longitude: -73.862,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Sherpa Association of NY',
      address: '41-17 75th St',
      city: 'Jackson Heights',
      description: 'Advocating for Sherpa families with education and legal support.',
      status: 'APPROVED',
      categoryId: advocacyCategory.id,
      Location: {
        create: {
          latitude: 40.749,
          longitude: -73.891,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Nepalese American Youth Center',
      address: '43-12 47th Ave',
      city: 'Woodside',
      description: 'Youth leadership, mentorship, and cultural events.',
      status: 'APPROVED',
      categoryId: youthCategory.id,
      Location: {
        create: {
          latitude: 40.743,
          longitude: -73.907,
        },
      },
    },
  });

  await prisma.resource.create({
    data: {
      name: 'Bhutanese Community Support Group',
      address: '56-10 Roosevelt Ave',
      city: 'Elmhurst',
      description: 'Social services and integration programs for Bhutanese immigrants.',
      status: 'APPROVED',
      categoryId: socialServicesCategory.id,
      Location: {
        create: {
          latitude: 40.740,
          longitude: -73.879,
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