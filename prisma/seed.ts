import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resources:Prisma.ResourceCreateInput[] = [
  {
    name: "Resource 1",
    description: "Resource 1 description",
    address: "123 Main St, Anytown, USA",
  },
];

async function main() {
    console.log("Seeding resources");
    for (const resource of resources) {
        await prisma.resource.create({
            data: resource
        });
        console.log(`Created resource ${resource.name}`);
    }
    console.log("Seeded resources");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });