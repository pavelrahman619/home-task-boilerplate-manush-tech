import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Delete users and roles first to avoid foreign key constraint errors
  await prisma.users.deleteMany();
  await prisma.roles.deleteMany();

  // Create roles and capture the created roles' IDs
  const superAdminRole = await prisma.roles.create({
    data: { role: 'SUPER_ADMIN', context: 'MT' },
  });
  const adminRole = await prisma.roles.create({
    data: { role: 'ADMIN', context: 'MT' },
  });
  const managerRole = await prisma.roles.create({
    data: { role: 'MANAGER', context: 'MT' },
  });
  const developerRole = await prisma.roles.create({
    data: { role: 'DEVELOPER', context: 'MT' },
  });
  const clientAdminRole = await prisma.roles.create({
    data: { role: 'ADMIN', context: 'CLIENT' },
  });
  const userRole = await prisma.roles.create({
    data: { role: 'USER', context: 'CLIENT' },
  });

  // Now the role IDs are available and we can use them for users
  const passwordHashed = await argon2.hash('123456');

  // Upsert the user, now using the correct roleId
  const abir = await prisma.users.upsert({
    where: { email: 'abir@manush.tech' },
    update: {},
    create: {
      uid: 'MANUSH-123987',
      email: 'abir@manush.tech',
      phone: '01711355057',
      name: 'Abir Rahman',
      password: passwordHashed,
      userWeight: 10,
      roleId: superAdminRole.id, // Use the correct role ID
      isMfaEnabled: false,
      isPasswordValid: true,
      isPasswordResetRequired: false,
      lastPasswordResetDate: new Date(),
    },
  });

  console.log({ abir });

  // Create promotions
  const promotions = await prisma.promotion.createMany({
    data: [
      {
        title: 'Summer Sale - 10% Off',
        type: 'PERCENTAGE',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-06-01'),
        enabled: true,
      },
      {
        title: 'Flat 50 Taka Off',
        type: 'FIXED',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-06-01'),
        enabled: true,
      },
      {
        title: 'Weight-Based Discount',
        type: 'WEIGHTED',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-06-01'),
        enabled: true,
      },
    ],
  });

  // Get the ID of the WEIGHTED promotion to create slabs
  const weightedPromo = await prisma.promotion.findFirst({
    where: { type: 'WEIGHTED', title: 'Weight-Based Discount' },
  });

  if (weightedPromo) {
    await prisma.promotionSlab.createMany({
      data: [
        {
          promotionId: weightedPromo.id,
          minWeight: 0,
          maxWeight: 2000, // 0–2kg
          discount: 1,
        },
        {
          promotionId: weightedPromo.id,
          minWeight: 2001,
          maxWeight: 5000, // 2–5kg
          discount: 2,
        },
        {
          promotionId: weightedPromo.id,
          minWeight: 5001,
          maxWeight: 10000, // 5–10kg
          discount: 3,
        },
        {
          promotionId: weightedPromo.id,
          minWeight: 10001,
          maxWeight: 20000, // 10–20kg
          discount: 5,
        },
      ],
    });
  }

  console.log({ abir, promotions });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
