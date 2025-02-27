/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { PrismaClient, Role, Permission, PermissionMethod } = require("@prisma/client");
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

async function seedPermissions() {
  const data = [
    { path: "/", method: PermissionMethod.GET },
    { path: "/admin", method: PermissionMethod.GET },
    { path: "/api/users", method: PermissionMethod.GET },
    { path: "/api/users", method: PermissionMethod.POST },
    { path: "/api/users/:id", method: PermissionMethod.GET },
    { path: "/api/users/:id", method: PermissionMethod.PUT },
    { path: "/api/users/:id", method: PermissionMethod.DELETE },
  ];
  return await prisma.permission.createMany({ data, skipDuplicates: true });
}

async function seedRolesPermissions() {
  const permissions = await prisma.permission.findMany();
  const data = permissions?.map((permission: typeof Permission) => {
    return {
      role_id: 1,
      permission_id: permission?.id,
    };
  });

  data.push({
    role_id: 2,
    permission_id: 1,
  });

  return await prisma.rolePermission.createMany({ data, skipDuplicates: true });
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

async function seedProducts() {
  const data = [
    {
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 120.999,
      stock: 50,
      disabled: false,
      deleted: false,
    },
    {
      name: "Smartphone Pro",
      description:
        "Latest generation smartphone with advanced camera features.",
      price: 899.999,
      stock: 100,
      disabled: false,
      deleted: false,
    },
    {
      name: "Laptop 14-inch",
      description:
        "Lightweight and powerful laptop with 8GB RAM and 256GB SSD.",
      price: 699.999,
      stock: 30,
      disabled: false,
      deleted: false,
    },
    {
      name: "Gaming Keyboard",
      description:
        "Mechanical keyboard with RGB backlighting and programmable keys.",
      price: 59.999,
      stock: 75,
      disabled: false,
      deleted: false,
    },
    {
      name: "4K Monitor",
      description: "27-inch 4K monitor with HDR support and ultra-thin bezels.",
      price: 249.999,
      stock: 20,
      disabled: false,
      deleted: false,
    },
    {
      name: "Portable Speaker",
      description:
        "Bluetooth speaker with powerful sound and long battery life.",
      price: 45.5,
      stock: 150,
      disabled: false,
      deleted: false,
    },
    {
      name: "Smartwatch",
      description:
        "Stylish smartwatch with fitness tracking and notifications.",
      price: 149.99,
      stock: 60,
      disabled: false,
      deleted: false,
    },
    {
      name: "Tablet 10-inch",
      description: "Affordable 10-inch tablet with high-resolution display.",
      price: 299.999,
      stock: 40,
      disabled: false,
      deleted: false,
    },
    {
      name: "Wireless Charger",
      description:
        "Fast wireless charger compatible with all Qi-enabled devices.",
      price: 25.75,
      stock: 200,
      disabled: false,
      deleted: false,
    },
    {
      name: "Noise-Cancelling Earbuds",
      description:
        "Compact earbuds with noise-cancelling technology and long battery life.",
      price: 79.99,
      stock: 90,
      disabled: false,
      deleted: false,
    },
  ];

  return await prisma.product.createMany({ data, skipDuplicates: true });
}

const SEED_LIST_COMMAND = "list";
const SEED_COMMANDS: Record<string, () => Promise<void>> = {
  roles: seedRoles,
  permission: seedPermissions,
  ["roles_permissions"]: seedRolesPermissions,
  users: seedUsers,
  products: seedProducts,
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
    for (const [name, fn] of Object.entries(SEED_COMMANDS)) {
      await seedData(name, fn);
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
