const bcrypt = require('bcrypt');
const prisma = require('../../prisma/prisma');

async function main() {
  const adminPass = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminRole = process.env.ROLE;
  
    const password = await bcrypt.hash(adminPass, 10);

    const user = await prisma.User.create({
        data: {
            email: adminEmail,
            password,
            role: adminRole,
        },
    })

    console.log('Admin Created', user);

    const allUsers = await prisma.user.findMany();
    console.log('Tous les users :', allUsers);
}

main()
  .catch(e => {
    console.error('Erreur :', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });