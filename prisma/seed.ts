import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password },
    create: {
      email: 'admin@example.com',
      password
    }
  });


  console.log('Seed listo: admin@example.com / admin123');
}

async function getUsers() {
  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

main()
  .then(getUsers)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
