/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const log = {
  success: (value: string) => console.log(`\n\x1b[32m${value}\x1b[0m`),
  error: (value: string | Error) => console.error(`\n\x1b[31m${value}\x1b[0m`),
  info: (value: string) => console.log(`\n\x1b[34m${value}\x1b[0m`),
};

async function seedData(seedName: string, seedFn: () => Promise<void>) {
  try {
    await seedFn();
    log.success("- Seeded " + seedName);
  } catch (error) {
    log.error("- Error seeding " + seedName);
    throw error;
  }
}

async function seedRoles() {
  const data = [{ name: "ADMIN" }, { name: "USER" }];
  return await prisma.role.createMany({ data, skipDuplicates: true });
}

async function seedUsers() {
  const roles = await prisma.role.findMany();
  const data = roles?.map((role: typeof Role) => {
    const name = role?.name?.toLocaleLowerCase();
    const email = `${name}@sm.co`;

    return {
      email,
      password: bcrypt.hashSync("12345", 10),
      first_name: name,
      last_name: "user",
      role_id: role?.id,
    };
  });

  return await prisma.user.createMany({ data, skipDuplicates: true });
}

const SEED_LIST_COMMAND = "list";
const SEED_COMMANDS: Record<string, () => Promise<void>> = {
  roles: seedRoles,
  users: seedUsers,
};

async function executeSeedCommand(command: string) {
  if (command === SEED_LIST_COMMAND) {
    log.info("- Available seed commands:\n");
    Object.keys(SEED_COMMANDS).forEach((command) => {
      log.info(`* ${command}`);
    });
    return;
  }

  const isValidSeed = Object.keys(SEED_COMMANDS).includes(command);
  if (!isValidSeed) throw new Error(`Seed "${command}" does not exist`);

  log.success("Seeding started...");
  await seedData(command, SEED_COMMANDS[command]);
  log.success("Seeding completed successfully!");
}

async function main() {
  try {
    const seedCommand = process.argv[2];
    if (seedCommand) return await executeSeedCommand(seedCommand);

    log.success("Seeding started...");
    for (const [name, fn ] of Object.entries(SEED_COMMANDS)) {
      await seedData(name, fn)
    }
    log.success("Seeding completed successfully!");
  } catch (error) {
    log.error(error as Error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
