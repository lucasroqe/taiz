import path from 'path'
import fs from 'fs'

export const addBetterAuthInstance = async (
  projectName: string,
  db: string,
) => {
  try {
    // Path for the src/lib
    const srcDir = path.join(projectName, 'src')
    const libDir = path.join(srcDir, 'lib')

    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true })
    }

    // Path for the auth.ts file
    const authFilePath = path.join(libDir, 'auth.ts')

    // Generate auth file content
    let authFileContent = ''
    if (db === 'sqlite') {
      authFileContent = generateAuthSqlite()
    }
    if (db === 'postgresql') {
      authFileContent = generateAuthPg()
    }

    // Write the file
    fs.writeFileSync(authFilePath, authFileContent)

    return true
  } catch (error) {
    console.error('Error creating auth file:', error)
    return false
  }
}

export const generateAuthSqlite = () => {
  return `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", 
    }),
});
`
}
export const generateAuthPg = () => {
  return `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
});
`
}
