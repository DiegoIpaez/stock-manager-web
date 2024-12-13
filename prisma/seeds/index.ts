/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
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

async function seedUsers() {
  const data = {
    email: "admin@sm.co",
    password: bcrypt.hashSync("12345", 10),
    first_name: "Admin",
    last_name: "User",
  };
  return prisma.user.upsert({
    where: { email: data.email },
    update: data,
    create: data,
  });
}

const SEED_LIST_COMMAND = "list";
const SEED_COMMANDS: Record<string, () => Promise<void>> = {
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
    await Promise.all(
      Object.entries(SEED_COMMANDS).map(([name, fn]) => seedData(name, fn))
    );
    log.success("Seeding completed successfully!");
  } catch (error) {
    log.error(error as Error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
