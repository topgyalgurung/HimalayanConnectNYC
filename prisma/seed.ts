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

  const legalCategory = await prisma.resourceCategory.create({
    data: { name: 'Legal' },
  });

  const healthCategory = await prisma.resourceCategory.create({
    data: { name: 'Health' },
  });

  const educationCategory = await prisma.resourceCategory.create({
    data: { name: 'Education' },
  });

  const financeCategory = await prisma.resourceCategory.create({
    data: { name: 'Finance' },
  });

  const nonProfitCategory = await prisma.resourceCategory.create({
    data: { name: 'Non-Profit' },
  });

  // other categories
  const otherCategory = await prisma.resourceCategory.create({
    data: { name: 'Other' },
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
      categoryId: nonProfitCategory.id,
      Location: {
        create: {
          latitude: 40.745312,
          longitude: -73.892888,
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
          latitude: 40.749792,
          longitude: -73.888391,
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
      categoryId: nonProfitCategory.id,
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
      name: 'Consulate General of Nepal',
      address: '228 E 45th St 4th Floor, New York, NY 10017',
      city: 'Manhattan',
      description: 'Consulate General of Nepal in New York City.',
      status: 'APPROVED',
      categoryId: legalCategory.id,
      Location: {
        create: {
          latitude: 40.740,
          longitude: -73.879,
        },
      },
    },
  });
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
}
