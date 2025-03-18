import { input, select, Separator } from '@inquirer/prompts'

export const askProjectName = async () => {
  return await input({ message: 'Enter the project name:' })
}

export const askFramework = async () => {
  return await select({
    message: 'Select a framework:',
    choices: [
      {
        name: 'NextJS',
        value: 'nextjs',
      },
      new Separator(),
      { name: 'Vite', value: 'vite', disabled: true },
    ],
  })
}

export const askOrm = async () => {
  return await select({
    message: 'Select an ORM:',
    choices: [
      {
        name: 'Prisma',
        value: 'prisma',
      },
      new Separator(),
      { name: 'Drizzle', value: 'drizzle', disabled: true },
    ],
  })
}

export const askDb = async () => {
  return await select({
    message: 'Select a database:',
    choices: [
      {
        name: 'SQLite',
        value: 'sqlite',
      },
      {
        name: 'PostgreSQL',
        value: 'postgresql',
      },
      new Separator(),
      { name: 'MySQL', value: 'mysql', disabled: true },
    ],
  })
}

export const askAuth = async () => {
  return await select({
    message: 'Select a database:',
    choices: [
      {
        name: 'BetterAuth',
        value: 'betterauth',
      },
      new Separator(),
      {
        name: 'AuthJS',
        value: 'authjS',
        disabled: true,
      },
    ],
  })
}
