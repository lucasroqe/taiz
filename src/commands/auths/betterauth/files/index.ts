import path from 'path'
import fs from 'fs'

// Create .env file for auth secret
export const createEnvAuth = async (projectName: string) => {
  const envFilePath = path.join(projectName, '.env')

  fs.appendFileSync(envFilePath, contentEnvAuth())
}

// Create /src/lib/auth.ts
export const createAuthFile = async (projectName: string, db: string) => {
  const libDir = path.join(projectName, 'src', 'lib')

  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true })
  }

  const authFilePath = path.join(libDir, 'auth.ts')

  let authFileContent = ''

  if (db === 'sqlite') {
    authFileContent = contentAuthSqlite()
  } else if (db === 'postgresql') {
    authFileContent = contentAuthPg()
  }

  fs.writeFileSync(authFilePath, authFileContent)
}
// Create /app/api/auth/[...all]
export const createMountHandlerFile = async (projectName: string) => {
  const apiAuthDir = path.join(
    projectName,
    'src',
    'app',
    'api',
    'auth',
    '[...all]',
  )

  if (!fs.existsSync(apiAuthDir)) {
    fs.mkdirSync(apiAuthDir, { recursive: true })
  }

  const routeFilePath = path.join(apiAuthDir, 'route.ts')
  fs.writeFileSync(routeFilePath, contentAuthMountHandler())
}
// Create /src/lib/auth-client.ts
export const createClientInstanceFile = async (projectName: string) => {
  const authClientFilePath = path.join(
    projectName,
    'src',
    'lib',
    'auth-client.ts',
  )
  fs.writeFileSync(authClientFilePath, contentClientInstance())
}

// Files content//
const contentEnvAuth = () => {
  return `
  
BETTER_AUTH_SECRET= #your-secret-key`
}

export const contentAuthSqlite = () => {
  return `import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
})
`
}

export const contentAuthPg = () => {
  return `import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
})
`
}

export const contentAuthMountHandler = () => {
  return `import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);`
}

export const contentClientInstance = () => {
  return `import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // the base url of your auth server
})`
}
