const bcrypt = require('bcrypt');
const prisma = require('./prisma');

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const role = process.env.ROLE;

    const password = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
      where: {email: adminEmail},
      update:{}, // on ne change rien s'il existe déjà
      create:{
            email: adminEmail,
            password,
            role: role,
        },
    });

    console.log('Admin Created');
}

main()
  .catch(e => {
    console.error('Erreur :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });