import path from 'path';
import fs from 'fs';

export const addBetterAuthInstance = async (projectName: string, db: string) => {
  try {
    // Path for src/lib
    const srcDir = path.join(projectName, 'src');
    const libDir = path.join(srcDir, 'lib');

    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    // Creating auth.ts
    const authFilePath = path.join(libDir, 'auth.ts');
    let authFileContent = '';

    if (db === 'sqlite') {
      authFileContent = generateAuthSqlite();
    } else if (db === 'postgresql') {
      authFileContent = generateAuthPg();
    }
    // src/lib/auth.ts
    fs.writeFileSync(authFilePath, authFileContent);

    // Create /app/api/auth/[...all]
    const apiAuthDir = path.join(srcDir, 'app', 'api', 'auth', '[...all]');

    if (!fs.existsSync(apiAuthDir)) {
      fs.mkdirSync(apiAuthDir, { recursive: true });
    }

    const routeFilePath = path.join(apiAuthDir, 'route.ts');
    fs.writeFileSync(routeFilePath, generateAuthMountHandler());

    // Create auth components
    const componentsAuthDir = path.join(srcDir, 'components', 'auth');

    if (!fs.existsSync(componentsAuthDir)) {
      fs.mkdirSync(componentsAuthDir, { recursive: true });
    }

    return true;
  } catch (error) {
    throw error
  }
};

export const generateAuthSqlite = () => {
  return `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", 
    }),
    emailAndPassword: {
      enabled: true,
    },
});
`;
};

export const generateAuthPg = () => {
  return `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {
      enabled: true,
    },
});
`;
};

export const generateAuthMountHandler = () => {
  return `import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth);`;
};
